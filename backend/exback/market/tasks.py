from celery import shared_task
from .models import Order
from django.http import JsonResponse

def match_orders_for_coin(coin_name):
    orders_buy = list(Order.objects.filter(order_type='BUY',coin__symbol=coin_name).order_by('-coin_price'))
    orders_sell = list(Order.objects.filter(order_type='SELL',coin__symbol=coin_name).order_by('coin_price'))
    
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


@shared_task
def match_spot_orders():
    coin_names = list(Order.objects.values_list('coin__symbol',flat=True).distinct())
    for coin_name in coin_names:
        match_orders_for_coin(coin_name)
    
    
# @shared_task
# def get_orderbook_history_coin():
    
        
