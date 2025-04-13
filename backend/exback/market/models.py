from django.db import models
from userauth.models import BaseUser

class Coin(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    url_logo = models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.name
    
    
class Currency(models.Model):
    CURRENCY_TYPE_CHOISES = [
        ('FIAT','fiat'),
        ('CRYPTO','crypto')
    ]
    symbol = models.CharField(max_length=10)
    currency_type = models.CharField(choices=CURRENCY_TYPE_CHOISES,max_length=8)
    def __str__(self):
        return self.symbol + ' ' + self.currency_type
    
    
class TradePaymentMethods(models.Model):
    payment_method = models.CharField(max_length=20)
    def __str__(self):
        return self.payment_method
    
class TradeCurrency(models.Model):
    BUY = 'BUY'
    SELL = 'SELL'
    TRADE_TYPE_CHOICES = [
        (BUY,'BUY'),
        (SELL,'SELL')
    ]
    
    user = models.ForeignKey(BaseUser,on_delete=models.CASCADE)
    payment_method = models.ForeignKey(TradePaymentMethods,on_delete=models.CASCADE)
    fromCurrency = models.ForeignKey(Currency, on_delete=models.CASCADE,related_name='from_currency')
    toCurrency = models.ForeignKey(Currency,on_delete=models.CASCADE,related_name='to_currency')
    trades30d = models.IntegerField(default=0)
    rate = models.FloatField(default=0)
    trade_type = models.CharField(max_length=5, choices=TRADE_TYPE_CHOICES,default='BUY')
    price = models.IntegerField(default=0)
    amount = models.IntegerField(default=0)
    limit_min = models.IntegerField(default=0)
    limit_max = models.IntegerField(default=0)
    welcome_message = models.CharField(max_length=500,null=True)
    
    
    def __str__(self):
        return str(self.user.email) + ' ' + self.trade_type
    
    
    
    
class SpotBalance(models.Model):
    user = models.ForeignKey(BaseUser, on_delete=models.CASCADE)
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE)
    total_balance = models.DecimalField(max_digits=20, decimal_places=8, default=1)
    available_balance = models.DecimalField(max_digits=20, decimal_places=8, default=1)
    reserved_balance = models.DecimalField(max_digits=20, decimal_places=8, default=1)
    breakeven_price = models.DecimalField(max_digits=20, decimal_places=8, null=True, blank=True)
    total_pnl = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    
    class Meta:
        unique_together = ('user', 'coin')

    def __str__(self):
        return f"{self.user} - {self.coin.symbol}: {self.total_balance}"

class TotalBalance(models.Model):
    user = models.ForeignKey(BaseUser,on_delete=models.CASCADE)
    totalSpotBalance = models.DecimalField(max_digits=20,decimal_places=8, default=0)

        
        

    
        
class Order(models.Model):
    MARKET_TYPE_CHOISES = [
        ('SPOT','spot'),
        ('FUTURES','futures'),
    ]
    ORDER_TYPE_CHOISES = [
        ('BUY','buy'),
        ('SELL','sell'),
    ]
    ORDER_STATUS_CHOISES = [
        ('OPEN','open'),
        ('CLOSED','closed'),
    ]
    
    user = models.ForeignKey(BaseUser,on_delete=models.CASCADE)
    coin = models.ForeignKey(Coin,on_delete=models.CASCADE)
    coin_amount = models.DecimalField(max_digits=50,decimal_places=8,default=0)
    coin_price = models.DecimalField(max_digits=50,decimal_places=8,default=0)
    order_type = models.CharField(choices=ORDER_TYPE_CHOISES, max_length=10)
    market_type = models.CharField(choices=MARKET_TYPE_CHOISES, max_length=10)
    status = models.CharField(choices=ORDER_STATUS_CHOISES,max_length=10,default='OPEN')
    date = models.DateField(auto_now=True)
    
    def __str__(self):
        return self.user.email + ' ' + self.order_type + ' ' + self.status
    
    
    
    
    
# class FutureBalance(models.Model):
#     user = models.ForeignKey(BaseUser, on_delete=models.CASCADE)
#     coin = models.ForeignKey(Coin, on_delete=models.CASCADE)
#     total_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
#     available_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
#     frozen_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    

#     class Meta:
#         unique_together = ('user', 'coin')

#     def __str__(self):
#         return f"{self.user} - {self.coin.symbol}: {self.total_balance}"
