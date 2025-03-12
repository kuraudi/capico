from celery import Celery, shared_task
import requests

app = Celery('my_project', broker='redis://localhost:6379/0')

@app.task
def fetch_coin_prices():
    url = "http://localhost:8000/market/prices"  # Эндпоинт Django
    try:
        response = requests.get(url)
        response.raise_for_status()  # Проверяем на ошибки
        data = response.json()
        print("Полученные данные:", data)
    except requests.RequestException as e:
        print("Ошибка при запросе:", e)

# Настройка периодического выполнения
app.conf.beat_schedule = {
    'fetch_coins_every_3_seconds': {
        'task': 'celery_app.fetch_coin_prices',  # Здесь указываем полный путь к задаче
        'schedule': 3.0,  # Выполнять каждые 3 секунды
    },
}

if __name__ == '__main__':
    app.worker_main()
