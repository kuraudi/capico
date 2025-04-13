from django.http import JsonResponse
import redis
import json
from pybit.unified_trading import HTTP
from django.http import HttpResponse


session = HTTP(testnet=True)


# Подключаемся к Redis
redis_client = redis.StrictRedis(host='127.0.0.1', port=6379, db=1, decode_responses=True)

# Функция получения цены с Bybit API
def fetch_crypto_price():
    response = session.get_tickers(
        category="inverse",
        symbol="BTCUSD",
    )
    if "result" in response:
        price = response['result']['list'][0]['indexPrice']
        name = response['result']['list'][0]['symbol']
        redis_client.set(f"{name}", json.dumps({"symbol": name, "price": price}))
       

        return HttpResponse(name)


def get_crypto_price(request):
    fetch_crypto_price()
    saved_data = redis_client.get("BTCUSD")
    # print(saved_data)
    if saved_data:
        return JsonResponse(json.loads(saved_data))  # Возвращаем JSON-ответ
    return JsonResponse({"error": "Price not found"}, status=404) 

# # Django API для получения цены из Redis
# def crypto_price_view(request, symbol="BTCUSDT"):
#     data = get_crypto_price(symbol)
#     if data:
#         return JsonResponse(data)
#     return JsonResponse({"error": "Price not found"}, status=404)
