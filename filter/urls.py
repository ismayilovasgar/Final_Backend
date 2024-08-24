from django.urls import path, include
from .views import filter_by_categry


urlpatterns = [
    path("<str:category>/", filter_by_categry, name="filter_category"),
]
