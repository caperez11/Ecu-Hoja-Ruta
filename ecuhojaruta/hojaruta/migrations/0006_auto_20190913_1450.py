# Generated by Django 2.2.4 on 2019-09-13 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hojaruta', '0005_auto_20190826_0403'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hojaruta',
            name='observaciones',
            field=models.TextField(default='Ninguna', max_length=100, null=True),
        ),
    ]
