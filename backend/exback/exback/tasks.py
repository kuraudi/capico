# tasks.py
from celery import shared_task


@shared_task
def my_periodic_task():
    print("This task runs periodically every 3 seconds.")
    return '1'

@shared_task
def add(x, y):
    print(f"Adding {x} and {y}")
    return x + y



    