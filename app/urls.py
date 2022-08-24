from django.urls import path, re_path
from . import views

app_name = 'app'
urlpatterns = [
    path('', views.home, name='home'),
    path('logout', views.logout_view, name='logout'),
    path('register', views.register, name='register'),
    # the catchall regular expression path is needed to handle react routes
    re_path(r'^(?:.*)/?$', views.home, name='catchall'),
]
