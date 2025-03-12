from django.db import models
from userauth.models import BaseUser

class Coin(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    url_logo = models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.name
    
class SpotBalance(models.Model):
    user = models.ForeignKey(BaseUser, on_delete=models.CASCADE)
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE)
    total_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    available_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    reserved_balance = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    breakeven_price = models.DecimalField(max_digits=20, decimal_places=8, null=True, blank=True)
    total_pnl = models.DecimalField(max_digits=20, decimal_places=8, default=0)
    
    class Meta:
        unique_together = ('user', 'coin')

    def __str__(self):
        return f"{self.user} - {self.coin.symbol}: {self.total_balance}"
    
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
