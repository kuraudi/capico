from rest_framework import serializers
from .models import Coin

class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = ['symbol', 'name', 'icon_url']
