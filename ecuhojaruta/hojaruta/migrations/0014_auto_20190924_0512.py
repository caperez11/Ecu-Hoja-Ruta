# Generated by Django 2.2.4 on 2019-09-24 05:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hojaruta', '0013_hojaruta_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hojaruta',
            name='usuario',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
