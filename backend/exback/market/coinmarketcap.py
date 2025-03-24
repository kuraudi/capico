import requests
from .bybitapi import get_bybit_symbols

API_KEY = "6de2833e-d048-4b60-982b-4d7e17860376"
CMC_MAP_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"
CMC_INFO_URL = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info"

HEADERS = {
    "Accepts": "application/json",
    "X-CMC_PRO_API_KEY": API_KEY,
}

def get_valid_symbols():
    """Получает все доступные тикеры с CoinMarketCap для фильтрации."""
    try:
        response = requests.get(CMC_MAP_URL, headers=HEADERS)
        data = response.json()
        if "data" in data:
            return {coin["symbol"] for coin in data["data"]}
        print("Ошибка API CMC:", data["status"]["error_message"])
    except requests.RequestException as e:
        print("Ошибка запроса к CMC:", e)
    return set()

def get_coins_info(bybit_symbols, valid_symbols):
    """Запрашивает информацию по монетам на CoinMarketCap, предварительно их фильтруя."""
    if not bybit_symbols:
        print("⚠️ Нет символов для запроса в CoinMarketCap")
        return []
    
    # Фильтруем тикеры, оставляем только те, что есть на CMC
    filtered_symbols = [symbol for symbol in bybit_symbols if symbol in valid_symbols and len(symbol) <= 10]

    if not filtered_symbols:
        print("⚠️ После фильтрации не осталось валидных символов для запроса в CMC!")
        return []

    symbol_str = ",".join(filtered_symbols)
    print(f"📌 Запрашиваемые символы у CMC: {symbol_str}")

    params = {"symbol": symbol_str}
    response = requests.get(CMC_INFO_URL, headers=HEADERS, params=params)
    data = response.json()

    if "data" not in data:
        print("⚠️ CMC не вернул данных! Ответ API:", data)
        return []

    coins = [
        {
            "symbol": value[0]["symbol"],
            "name": value[0]["name"],
            "logo": value[0]["logo"]
        }
        for key, value in data["data"].items()
    ]

    print(f"✅ Найдено {len(coins)} монет на CMC из {len(filtered_symbols)} запросов")
    return coins

def get_filtered_coins():
    """Основная функция для получения отфильтрованных монет."""
    bybit_symbols = get_bybit_symbols()  # Получаем символы Bybit
    valid_symbols = get_valid_symbols()  # Загружаем все тикеры CMC
    return get_coins_info(bybit_symbols, valid_symbols)  # Запрашиваем данные у CMC


