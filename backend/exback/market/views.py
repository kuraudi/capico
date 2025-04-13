from rest_framework.response import Response
from .models import Coin,SpotBalance,TradeCurrency,TradePaymentMethods,Currency,Order
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from pybit.unified_trading import HTTP
from .bybitapi import get_prices_user_coins
from . import bybitapi
from django.db.models import Count, Sum
from userauth.models import BaseUser
from django.http import JsonResponse
from django.db import transaction

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
    symbols = ['BTC','SOL','TON','MAJOR']
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
    user_id = BaseUser.objects.get(email=request.user.email).id
        
    coins = SpotBalance.objects.values('user','coin','total_balance')
    
    coin_counts = [{'symbol':Coin.objects.get(id=i['coin']).symbol,'count':int(i['total_balance'])} for i in coins if i['user'] == user_id]
    if coin_counts:
        total_balance,total_balance_btc = get_prices_user_coins(coin_counts) 
        if total_balance is None and total_balance_btc is None:
            return Response({'error': 'Ошибка при получении данных с Bybit'}, status=500)
        return Response({'total_balance':total_balance,'total_balance_btc':total_balance_btc},status=200)
    return Response({'total_balance':0,'total_balance_btc':0},status=200)

@api_view(['GET'])
def getTradesBook(request):
    trades = TradeCurrency.objects.all()
    trades_arr = [{'email': trade.user.email,
    'trades30d': trade.trades30d,
    'rate': trade.rate,
    'fromCurrency': trade.fromCurrency.symbol,
    'toCurrency': trade.toCurrency.symbol,
    'price': trade.price,
    'type':trade.trade_type,
    'amount': trade.amount,
    'limit': [trade.limit_min, trade.limit_max],
    'paymentMethod': trade.payment_method.payment_method}  for trade in trades]
    return JsonResponse(trades_arr,status=200,safe=False)


@api_view(['GET'])
def getTradePaymentMethods(request):
    # payment_methods = TradePaymentMethods.objects.all()
    payment_methods = [method.payment_method for method in TradePaymentMethods.objects.all()]
    return JsonResponse(payment_methods,status=200,safe=False)

@api_view(['POST'])
def addP2PTrade(request):
    trade_info = request.data 
    trade_info['user'] = request.user
    trade_info['payment_method'] = TradePaymentMethods.objects.get(payment_method=trade_info['payment_method'])
    trade_info['fromCurrency'] = Currency.objects.get(symbol=trade_info['fromCurrency'])
    trade_info['toCurrency'] = Currency.objects.get(symbol=trade_info['toCurrency'])
    TradeCurrency.objects.create(**trade_info)
    return JsonResponse({'m':'ok'},status=200)

@api_view(["POST"])
@permission_classes([AllowAny])
def get_orderbook_of_coin(request):
    coin_name = request.data['params']['symbol']
    orders = Order.objects.filter(coin__symbol=coin_name,status='OPEN') \
    .values('coin_price','order_type') \
    .annotate(total_amount=Sum('coin_amount'))
    
    
    
    orderbook_buy = []
    orderbook_sell = []

    for order in orders:
        if order['order_type']=='BUY':
            orderbook_buy.append([str(order['coin_price']), str(order['total_amount'])])
        else: orderbook_sell.append([str(order['coin_price']), str(order['total_amount'])])
    
    
    orderbook_buy.sort(key=lambda x:float(x[0]),reverse=True)
    orderbook_sell.sort(key=lambda x:float(x[0]),reverse=True)

    return JsonResponse({'orderbook_buy':orderbook_buy,'orderbook_sell':orderbook_sell},status=200)

@api_view(['POST'])
def get_orderbook_history_coin(request):
    coin_name = request.data['params']['symbol']
    orders = Order.objects.filter(coin__symbol=coin_name,status='CLOSED') \
    .values('coin_price','coin_amount','order_type') 
    
    orderbook_history = []
    
    for order in orders:
        orderbook_history.append([str(order['coin_price']), str(order['coin_amount']), str(order['order_type'])])
        
    return JsonResponse({'orderbook_history':orderbook_history})
      
        
    
    
    
    
    

@api_view(['POST'])
def addSpotOrder(request):
    coin_data = request.data
    coin_object_from_db = Coin.objects.get(symbol=coin_data['symbol'])
    try:
        Order.objects.create(user=request.user,coin=coin_object_from_db,coin_amount=coin_data['coin_amount'],coin_price=coin_data['coin_price'],order_type=coin_data['type_order'],market_type='spot')
    except:
        return JsonResponse({'message':'unsuccessful'},status=500)
    return JsonResponse({'message':'successful'},status=200)


def match_orders_for_coin(coin_name):
    orders_buy = list(Order.objects.filter(order_type='BUY',status='OPEN',coin__symbol=coin_name).order_by('-coin_price'))
    orders_sell = list(Order.objects.filter(order_type='SELL',status='OPEN',coin__symbol=coin_name).order_by('coin_price'))
    
    while orders_buy and orders_sell:
        buy = orders_buy[0]
        sell = orders_sell[0]
        
        if buy.coin_price < sell.coin_price:
            break        
        
        total_avaliable = min(buy.coin_amount,sell.coin_amount)
        
        buy.coin_amount -= total_avaliable
        sell.coin_amount -= total_avaliable
        
        buy.save()
        sell.save()
        
        if buy.coin_amount == 0:
            orders_buy.pop(0)
            buy.status = 'CLOSED'
            buy.save()
        if sell.coin_amount == 0:
            orders_sell.pop(0)
            sell.status = 'CLOSED'
            sell.save()


        