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
from .bybitapi import get_prices_from_bybit

redis_client = redis.Redis(host="127.0.0.1", port=6379)

def update_prices_coins(request): 
    """Обновляет цены монет в Redis."""
    prices = get_prices_from_bybit()  

    if prices:  # Если данные не пустые
        redis_client.set("crypto_prices", json.dumps(prices))
        return JsonResponse({'message': 'ok'}, status=200)
    
    return JsonResponse({'message': 'No prices found'}, status=400)


def get_prices_from_redis(request):
    """Возвращает последние цены монет из Redis в виде массива."""
        
    
    
    update_prices_coins(request)
    data = redis_client.get("crypto_prices")
    
    if data:
        prices_dict = json.loads(data)  # Преобразуем в словарь
        
        # Преобразуем в массив кортежей [(symbol, {данные}), ...]
        prices_list = sorted(
            prices_dict.items(),
            key=lambda item: float(item[1]["price"]),  # Сортируем по цене (опционально)
            reverse=True
        )

        return JsonResponse(prices_list, safe=False, status=200)

    return JsonResponse({"error": "Нет данных"}, status=404)


def get_metainfo_coins(request):
    """Обновляет и возвращает информацию о монетах из Redis."""
    coins = Coin.objects.all()

    # Преобразуем данные в JSON
    coins_data = [{"name": i.name, "symbol": i.symbol, "url_logo": i.url_logo} for i in coins]
    
    # Сохраняем в Redis
    redis_client.set("metainfo_coins", json.dumps(coins_data))
    

    # Сразу возвращаем обновлённые данные
    return JsonResponse(coins_data, safe=False, status=200)

