from django.db import models
from django.contrib.auth.models import User

class NFLGame(models.Model):
    team_1 = models.CharField(max_length=200)
    team_2 = models.CharField(max_length=200)
    winner = models.CharField(max_length=200, blank=True, null=True)
    date = models.DateField(auto_now=False, auto_now_add=False)
    week = models.IntegerField(default=0)
    team_1_logo = models.URLField()
    team_2_logo = models.URLField()

class UserPicks(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    week = models.IntegerField()
    team = models.CharField(max_length=200)
    point_awarded = models.IntegerField(blank=True, null=True)
    

# Create your models here.
 