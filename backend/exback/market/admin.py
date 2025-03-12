from django.contrib import admin
from .models import Coin  # Импорт вашей модели
from .models import SpotBalance

admin.site.register(Coin)  # Регистрация модели
admin.site.register(SpotBalance)  # Регистрация модели