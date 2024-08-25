from django.urls import path, include
from .views import *


urlpatterns = [
    path("home/<str:category>/", filter_by_category, name="filter_category"),
    path("lifestyle/<str:lifestyle>/",filter_by_main_category,name="filter_main_category"),
]
