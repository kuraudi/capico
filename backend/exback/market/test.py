from pybit.unified_trading import HTTP
session = HTTP(testnet=True)

arr = session.get_public_trade_history(
    category="spot",
    symbol="BTCUSDT",
    limit=10,
)['result']['list']

arr_buy = []

for i in arr:
    if i['side'] == 'Buy':
        arr_buy.append(i)
        
print(arr_buy)