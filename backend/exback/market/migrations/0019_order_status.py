# Generated by Django 5.1.6 on 2025-04-12 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0018_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('OPEN', 'open'), ('CLOSED', 'closed')], default='OPEN', max_length=10),
        ),
    ]
