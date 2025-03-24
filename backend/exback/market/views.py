from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Coin,SpotBalance
from rest_framework.decorators import api_view
from .serializers import CoinSerializer
from pybit.unified_trading import HTTP
from .bybitapi import get_prices_user_coins
from .coinmarketcap import get_coins_info,get_filtered_coins,get_bybit_symbols
from . import bybitapi
from userauth.models import BaseUser

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

@api_view(['POST'])
def spot_buy_coin(request):
    # symbol = 'BTC'
    coin_name = request.data['params']['symbol']
    coin_price = request.data['params']['price']
    
    response = session.get_orderbook(category="linear", symbol=coin_name)
    orderbook_sell = response['result']['a']
    for order in orderbook_sell:
        print(order)
        
@api_view(['GET'])
def getTotalBalance(request):
    user_id = BaseUser.objects.get(email=request.user).id
        
    coins = SpotBalance.objects.values('user','coin','total_balance')
    
    coin_counts = [{'symbol':Coin.objects.get(id=i['coin']).symbol,'count':int(i['total_balance'])} for i in coins if i['user'] == user_id]
    
    if coin_counts:
        total_balance = get_prices_user_coins(coin_counts)
        return Response({'message':total_balance},status=200)
    
    return Response({'message':0},status=200)
        
    
    
    
    






    
    
    
             

