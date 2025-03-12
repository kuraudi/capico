from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Coin,SpotBalance
from rest_framework.decorators import api_view
from .serializers import CoinSerializer
from pybit.unified_trading import HTTP
from .coinmarketcap import get_coins_info,get_filtered_coins,get_bybit_symbols
from . import bybitapi

session = HTTP(testnet=False)

@api_view(['GET'])
def get_coins_data(request):
    coin_list = []

    for coin in Coin.objects.all():
        try:
            # Проверяем, нет ли в данных ошибок (например, пустые или странные символы)
            if not coin.symbol or not coin.name:
                continue  # Пропускаем битые монеты
            
            coin_list.append([
                coin.symbol,
                {
                "name": coin.name,
                "logo": coin.url_logo
            }])
        except Exception:
            continue  # Если какая-то монета вызывает ошибку, просто пропускаем её
        
    coin_list.sort(key=lambda x: x[0] != "BTC")
    
    return Response(coin_list)

@api_view(['GET'])
def add_coins(request):
    """Запрашивает данные о монетах и обновляет базу."""
    symbols = ['ETH']
    bybitapi.fetch_and_save_coins(symbols)
    return Response({"message": "Обновление завершено"})

@api_view(['GET'])
def get_user_balances(request):
    user = request.user 
    coins = Coin.objects.all()
    
    balances = []
    
    for coin in coins:
        balance = SpotBalance.objects.filter(user=user,coin=coin).first()
        balances.append({
            "symbol": coin.symbol,
            "name": coin.name,
            "url_logo": coin.url_logo,
            "total_balance": balance.total_balance if balance else 0,
            "avaliable_balance": balance.available_balance if balance else 0,
            "reserved_balance": balance.reserved_balance if balance else 0,
            "breakeven_price": balance.breakeven_price if balance else 0,
            "total_pnl": balance.total_pnl if balance else 0
        })
        
    return Response(balances)








    
    
    
             

