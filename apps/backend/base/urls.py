from django.urls import path
from . import views

urlpatterns = [
    path('get_test/', views.get_test, name="get-test"),
]
