from django.contrib import admin
from django.urls import include, path
from . import views
from . import bybitapi
from . import redis


urlpatterns = [
    path('', views.get_coins_data),
    path('coins', bybitapi.get_prices_from_bybit),
    path('prices',redis.get_prices_from_redis),
    path('update',redis.update_prices_coins),
    path('metainfo',redis.get_metainfo_coins),
    path('add',views.add_coins),
    path('user-balances',views.get_user_balances),
    path('orderbook',views.get_orderbook_of_coin),
    path('orderbook/history',views.get_orderbook_history_coin),
    path('test',views.getTotalBalance),
    path('trades-book',views.getTradesBook),
    path('payment-methods',views.getTradePaymentMethods),
    path('p2p-trade/add',views.addP2PTrade),
    path('spot/sell',views.addP2PTrade),
    path('spot/order/add',views.addSpotOrder),
]
