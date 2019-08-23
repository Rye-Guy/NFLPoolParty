from django.contrib import admin
from .models import NFLGame, UserPicks, User
from import_export import resources, admin as import_exprot_admin

class NFLGameResource(resources.ModelResource):

    class Meta:
        model = NFLGame

class NFLGameAdmin(import_exprot_admin.ImportExportModelAdmin):
    resource_class = NFLGameResource
    list_display = ['id', 'team_1', 'team_2', 'date']
    
admin.site.register(NFLGame, NFLGameAdmin)
# Register your models here.
