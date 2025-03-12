from pybit.unified_trading import HTTP
import redis
import redis.client
import requests
import json,time
from django.http import JsonResponse  # Используем JsonResponse для возврата HTTP-ответов
from .models import Coin
from django.db.utils import IntegrityError
from dotenv import load_dotenv
from rest_framework.decorators import api_view
import os
import aiohttp

load_dotenv()
API_KEY = "6de2833e-d048-4b60-982b-4d7e17860376"
BYBIT_API_URL = "https://api.bybit.com/v5/market/tickers?category=spot"
CMC_MAP_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map"
CMC_INFO_URL = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/info"

CMC_API_KEY = os.getenv('CMC_API_KEY')

# Создаем сессию для реальной торговли
session = HTTP(testnet=False)


BYBIT_API_URL = "https://api.bybit.com/v5/market/tickers"

CMC_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info"
HEADERS = {
    "Accepts": "application/json",
    "X-CMC_PRO_API_KEY": CMC_API_KEY,
}



def get_bybit_symbols(limit=20):
    """Получает список тикеров с Bybit, оставляя только монеты с "USDT" и убирая "USDT" в конце."""
    try:
        response = requests.get(BYBIT_API_URL)
        data = response.json()
        
        if data["retCode"] == 0:
            symbols = [coin["symbol"][:-4] for coin in data["result"]["list"] if coin["symbol"].endswith("USDT")]
            return symbols[:limit]  # Ограничиваем список 30 монетами
        
        print("❌ Ошибка API Bybit:", data["retMsg"])
    except requests.RequestException as e:
        print("❌ Ошибка запроса к Bybit:", e)
    
    return []


def get_prices_from_bybit():
    """Получает цены монет с Bybit."""
    coins = Coin.objects.values_list("symbol", flat=True)
    symbols = list(coins)
    symbols = [i+'USDT' for i in symbols]
    response = session.get_tickers(category="spot", symbol=None)

    if "result" in response and "list" in response["result"]:
        tickers = response["result"]["list"]
        # Фильтруем только нужные тикеры
        filtered_tickers = {
             t["symbol"].replace("USDT", ""): {
                "price": t["lastPrice"],
                "price24hPcnt": t["price24hPcnt"],
                "turnover24h": t["turnover24h"],
                "volume24h": t["volume24h"],
                "lowPrice24h": t["lowPrice24h"],
                "highPrice24h": t["highPrice24h"],
            } for t in tickers if t["symbol"] in symbols
        }
        if filtered_tickers:
            return filtered_tickers
    return {}

def get_coins_from_db():
    """Получает список монет из базы данных."""
    coins = Coin.objects.all().values("symbol", "name", "url_logo")  # Выбираем только нужные поля
    return list(coins)  # Преобразуем QuerySet в список

def fetch_and_save_coins(symbols, delay=3):
    """
    Запрашивает данные о монетах с CoinMarketCap и добавляет их в базу данных.
    """
    for symbol in symbols:
        params = {"symbol": symbol}
        
        try:
            print(f"📡 Запрос данных для {symbol}...")
            response = requests.get(CMC_URL, headers=HEADERS, params=params)
            response.raise_for_status()
            
            data = response.json()
            coin_data = data.get("data", {}).get(symbol.upper(), {})

            if coin_data:
                try:
                    Coin.objects.update_or_create(
                        symbol=coin_data.get("symbol", ""),
                        defaults={
                            "name": coin_data.get("name", ""),
                            "url_logo": coin_data.get("logo", ""),
                        },
                    )
                    print(f"✅ Монета {symbol} обновлена/добавлена в базу")
                except IntegrityError:
                    print(f"⚠️ Монета {symbol} уже существует в базе")
                except Exception as e:
                    print(f"🚨 Ошибка при сохранении {symbol}: {e}")
            else:
                print(f"❌ Не удалось получить данные для {symbol}")

        except requests.exceptions.RequestException as e:
            print(f"🚨 Ошибка запроса для {symbol}: {e}")

        time.sleep(delay)  # Rate limit
        
def get_top_30_coins():
    """Запрашивает список всех монет с Bybit и возвращает первые 30 символов без 'USDT'."""
    response = session.get_tickers(category="spot")

    if "result" in response and "list" in response["result"]:
        tickers = response["result"]["list"]
        
        # Фильтруем только пары, заканчивающиеся на 'USDT'
        usdt_pairs = [t["symbol"] for t in tickers if t["symbol"].endswith("USDT")]

        # Отсекаем 'USDT' и берем только первые 30 монет
        top_30 = [symbol[:-4] for symbol in usdt_pairs[:30]]

        return top_30

    print("❌ Ошибка при запросе данных с Bybit:", response)
    return []

@api_view(["POST"])
def get_orderbook_of_coin(request):
    coin_name = request.data['params']['symbol']
    
    response = session.get_orderbook(category="linear", symbol=coin_name)
    orderbook_buy = response['result']['b']
    orderbook_sell = response['result']['a']
    
    return JsonResponse({'orderbook_buy':orderbook_buy,'orderbook_sell':orderbook_sell},status=200)

@api_view(['POST'])
def get_orderbook_history(request):
    coin_name = request.data['params']['symbol']
    
    response = session.get_public_trade_history(
    category="spot",
    symbol=coin_name,
    limit=30,
)['result']['list']
    if len(response)!=0: 
        arr = [{'price':i['price'],'size':i['size'], 'side':i['side'],'time':i['time']} for i in response]
    else: return JsonResponse({'error':'No orders founded'},status=500)
    return JsonResponse({'orderbook_history':arr},status=200)
            
        

    
    