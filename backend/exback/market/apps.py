from django.apps import AppConfig


class MarketConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'market'
    
# exback/apps.py
from django.apps import AppConfig

class ExbackConfig(AppConfig):
    name = 'exback'

    def ready(self):
        from .admin import create_periodic_task
        create_periodic_task()

    
