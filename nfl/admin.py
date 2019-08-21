from django.contrib import admin
from .models import NFLGame, UserPicks, User

class NFLGameAdmin(admin.ModelAdmin):
    list_display = ['id', 'team_1', 'team_2', 'date']

admin.site.register(NFLGame, NFLGameAdmin)
# Register your models here.
