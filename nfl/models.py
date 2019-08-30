from django.db import models
from django.contrib.auth.models import User

class NFLGame(models.Model):
    
    team_1 = models.ForeignKey('NFLTeam', related_name="HomeTeam", on_delete=models.SET_NULL, null=True)
    team_2 = models.ForeignKey('NFLTeam', related_name="AwayTeam",  on_delete=models.SET_NULL, null=True)
    winner = models.ForeignKey('NFLTeam', related_name="WinningTeam", on_delete=models.SET_NULL, null=True)
    date = models.DateField(auto_now=False, auto_now_add=False)
    week = models.IntegerField(default=0)

    def __str__(self):
        return '{} vs {} on {}'.format(self.team_1.team_name, self.team_2.team_name, self.date)
    

class UserPicks(models.Model):

    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    games = models.ManyToManyField('NFLGame', blank=True)
    teams = models.ManyToManyField('NFLTeam', blank=True)
    points_awarded = models.IntegerField(default=0)

class UserMadePick(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    team = models.ForeignKey('NFLTeam', on_delete=models.SET_NULL, null=True)
    week = models.IntegerField()
    been_checked = models.BooleanField()
    
class NFLTeam(models.Model):
    
    class Meta:
        verbose_name = "NFL Team"
    
    team_name = models.CharField(verbose_name="Team Name", max_length=200)
    team_logo = models.URLField(verbose_name="Team Logo")

    def __str__(self):

        return self.team_name
 