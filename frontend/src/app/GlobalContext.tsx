import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export type TypeCoinInfo = {
  name: string;
  url_logo: string;
  price?: number;
  price24hPcnt?: number;
  turnover24h?: number;
  volume24h?: number;
  lowPrice24h?: number;
  highPrice24h?: number;
};
type CoinBalance = {
  symbol: string;
  name: string;
  url_logo: string;
  total_balance: number;
  avaliable_balance: number;
  reserved_balance: number;
  breakeven_price: number;
  total_pnl: number;
};

type TypeCoinName = [string, { name: string; logo: string }];
type TypeTotalBalance = { totalBalanceUSD: number; totalBalanceBTC: number };

interface GlobalContextType {
  role: string;
  coinPrices: [string, TypeCoinInfo][];
  userCoinsBalances: CoinBalance[]; // Массив массивов
  setRole: (role: string) => void;
  totalBalance: TypeTotalBalance;
  userInfo: TypeUserInfo;
}
type TypeUserInfo = {
  email: string;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string>("guest");
  const [userInfo, setUserInfo] = useState<TypeUserInfo>({
    email: "",
  });
  const [coinPrices, setCoinPrices] = useState<[string, TypeCoinInfo][]>([]);
  const [totalBalance, setTotalBalance] = useState<{
    totalBalanceUSD: number;
    totalBalanceBTC: number;
  }>({ totalBalanceUSD: 0, totalBalanceBTC: 0 });

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole || "guest");
    if (!savedRole) localStorage.setItem("role", "guest");

    // 📌 Загрузка списка монет из БД
    const fetchCoins = async () => {
      try {
        const { data: coins } = await axios.get<TypeCoinName[]>(
          "http://127.0.0.1:8000/market"
        );

        // const { data: metaInfo } = await axios.get(
        //   "http://127.0.0.1:8000/market/metainfo"
        // );

        // 📌 Преобразуем данные в массив массивов
        const updatedPrices: [string, TypeCoinInfo][] = coins.map((coin) => [
          coin[0],
          {
            name: coin[1].name,
            url_logo: coin[1].logo,
            price: 0,
            price24hPcnt: 0,
            turnover24h: 0,
            lowPrice24h: 0,
            highPrice24h: 0,
            volume24h: 0,
          },
        ]);
        setCoinPrices(updatedPrices);
      } catch (error) {
        console.error("❌ Ошибка загрузки монет:", error);
      }
    };

    // 🔄 Функция для обновления цен из Redis
    const updatePriceFromRedis = async () => {
      try {
        const { data: response } = await axios.get<
          [string, Partial<TypeCoinInfo>][]
        >("http://127.0.0.1:8000/market/prices");

        // console.log("💰 Обновленные цены:", response);

        setCoinPrices((prev) => {
          const updated = prev.map(([symbol, coin]) => {
            const found = response.find((el) => el[0] === symbol);
            return [symbol, { ...coin, ...(found ? found[1] : {}) }] as [
              string,
              TypeCoinInfo
            ]; // 🔥 Тут явно указываем тип
          });

          // 📌 Сортируем по цене (по убыванию)
          return updated.sort((a, b) => (b[1].price ?? 0) - (a[1].price ?? 0));
        });
      } catch (error) {
        console.error("❌ Ошибка загрузки цен из Redis:", error);
      }
    };

    fetchCoins();
    updatePriceFromRedis();
    const interval = setInterval(updatePriceFromRedis, 3000);
    return () => clearInterval(interval);
  }, []);

  const [userCoinsBalances, setUserCoinBalances] = useState<CoinBalance[]>([]);
  useEffect(() => {
    const fetchUserBalances = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/market/user-balances",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        console.log(response.data, "ai");

        setUserCoinBalances(response.data);
      } catch (error) {
        console.error("Ошибка при получении баланса:", error);
      }
    };
    const fetchTotalBalance = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/market/test", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setTotalBalance(() => ({
          totalBalanceUSD: response.data.total_balance ?? 0,
          totalBalanceBTC: response.data.total_balance_btc ?? 0,
        }));
      } catch (error) {
        console.error("Ошибка при получении баланса:", error);
      }
    };
    // Вызов функции
    fetchUserBalances();
    fetchTotalBalance();
    setUserInfo((prev) => ({
      ...prev,
      email: localStorage.getItem("email") ?? "",
    }));
  }, []);

  const updateRole = (newRole: string) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  return (
    <GlobalContext.Provider
      value={{
        role,
        setRole: updateRole,
        coinPrices,
        userCoinsBalances,
        totalBalance,
        userInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
