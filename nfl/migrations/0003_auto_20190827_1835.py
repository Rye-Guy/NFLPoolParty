# Generated by Django 2.2.4 on 2019-08-27 18:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('nfl', '0002_auto_20190827_1542'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='nflgame',
            name='team_1_logo',
        ),
        migrations.RemoveField(
            model_name='nflgame',
            name='team_2_logo',
        ),
        migrations.AlterField(
            model_name='userpicks',
            name='games',
            field=models.ManyToManyField(blank=True, null=True, to='nfl.NFLGame'),
        ),
        migrations.AlterField(
            model_name='userpicks',
            name='team',
            field=models.ManyToManyField(blank=True, null=True, to='nfl.NFLTeam'),
        ),
        migrations.AlterField(
            model_name='userpicks',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, unique=True),
        ),
    ]