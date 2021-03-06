# Generated by Django 2.2.4 on 2019-08-27 14:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='NFLGame',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('week', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='NFLTeam',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team_name', models.CharField(max_length=200, verbose_name='Team Name')),
                ('team_logo', models.URLField(verbose_name='Team Logo')),
            ],
            options={
                'verbose_name': 'NFL Team',
            },
        ),
        migrations.CreateModel(
            name='UserPicks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('points_awarded', models.IntegerField(blank=True, null=True)),
                ('games', models.ManyToManyField(to='nfl.NFLGame')),
                ('team', models.ManyToManyField(to='nfl.NFLTeam')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='nflgame',
            name='team_1',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='HomeTeam', to='nfl.NFLTeam'),
        ),
        migrations.AddField(
            model_name='nflgame',
            name='team_2',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='AwayTeam', to='nfl.NFLTeam'),
        ),
        migrations.AddField(
            model_name='nflgame',
            name='winner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='WinningTeam', to='nfl.NFLTeam'),
        ),
    ]
