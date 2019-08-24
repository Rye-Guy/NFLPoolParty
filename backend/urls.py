"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from nfl.views import DjangoUserViewSet, UserPicksViewSet, NFLGameViewSet, current_user, UserList

router = routers.DefaultRouter()
router.register(r'django-users', DjangoUserViewSet)
router.register(r'games', NFLGameViewSet)
router.register(r'picks', UserPicksViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('token-auth/', obtain_jwt_token),
    path('current-user/', current_user),
    path('users/', UserList.as_view()),
    path(r'api/', include('rest_framework.urls'))
]