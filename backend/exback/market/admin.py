from django.contrib import admin
from .models import Coin  # Импорт вашей модели
from .models import SpotBalance
from .models import TradeCurrency,TradePaymentMethods,Currency,Order

admin.site.register(Coin)  # Регистрация модели
admin.site.register(SpotBalance)  # Регистрация модели
admin.site.register(TradeCurrency)  # Регистрация модели
admin.site.register(TradePaymentMethods)  # Регистрация модели
admin.site.register(Currency)  # Регистрация модели
admin.site.register(Order)  # Регистрация модели


from django_celery_beat.models import PeriodicTask, IntervalSchedule

def create_periodic_task():
    # Создаем или получаем интервал в 30 секунд
    schedule, created = IntervalSchedule.objects.get_or_create(
        every=3,  # каждое 30 секунд
        period=IntervalSchedule.SECONDS,  # период: секунды
    )

    # Создаем периодическую задачу, которая будет использовать это расписание
    PeriodicTask.objects.create(
        interval=schedule,  # указываем, какой интервал будет использоваться
        name="Task every 30 seconds",  # название задачи
        task="exback.tasks.my_periodic_task",  # путь к задаче
    )
