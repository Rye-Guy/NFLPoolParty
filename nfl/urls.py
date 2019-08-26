from django.urls import path
from .views import current_user, UserList, NFLGameViewSet

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
    path('games/', NFLGameViewSet.as_view({'get': 'list'}))
]
