from django.urls import path
from .views import current_user, UserList, NFLGameViewSet, CurrentUserPicksViewSet

urlpatterns = [
    path('current_user/', current_user),
    path('current-user-picks/', CurrentUserPicksViewSet.as_view()),
    path('users/', UserList.as_view()),
    path('games/<int:week>', NFLGameViewSet.as_view({'get':'list'})),
    # path('games/<int:week>', NFLGameViewSet.as_view({'get': 'list'})),
]
