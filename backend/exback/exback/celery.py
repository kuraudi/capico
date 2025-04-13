# exback/celery.py

import os
from celery import Celery
from .tasks import my_periodic_task 

# Указываем настройки Django для Celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'exback.settings')

app = Celery('exback')

# Настройка конфигурации Celery из настроек Django
app.config_from_object('django.conf:settings', namespace='CELERY')

# Автоматическая загрузка задач из всех зарегистрированных приложений Django
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')
