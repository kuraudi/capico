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
    path('orderbook',bybitapi.get_orderbook_of_coin),
    path('orderbook/history',bybitapi.get_orderbook_history),
]
