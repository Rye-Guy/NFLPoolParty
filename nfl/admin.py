from django.contrib import admin
from .models import NFLGame, UserPicks, User, NFLTeam
from import_export import resources, admin as import_export_admin

class NFLGameResource(resources.ModelResource):

    class Meta:
        model = NFLGame

class NFLGameAdmin(import_export_admin.ImportExportModelAdmin):
    
    resource_class = NFLGameResource
    list_display = ['id', 'team_1', 'team_2', 'date']

class NFLTeamResource(resources.ModelResource):

    class Meta:
        model = NFLTeam

class NFLTeamAdmin(import_export_admin.ImportExportModelAdmin):
    
    resource_class = NFLTeamResource
    list_display = ['team_name', 'team_logo']    

class UserPicksResource(resources.ModelResource):
    
    class Meta: 
        model = UserPicks

class UserPicksAdmin(import_export_admin.ImportExportModelAdmin):
    
    resource_class = UserPicksResource
    list_display = ['user', 'points_awarded']

    
admin.site.register(NFLGame, NFLGameAdmin)
admin.site.register(NFLTeam, NFLTeamAdmin)
admin.site.register(UserPicks, UserPicksAdmin)
# Register your models here.
