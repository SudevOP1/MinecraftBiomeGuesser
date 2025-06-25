from django.urls import path
from . import views

urlpatterns = [
    path('create_username/', views.create_username, name="create-username"),
    path('get_test/', views.get_test, name="get-test"),
    path('submit_score/', views.submit_score, name="submit-score"),
    path('get_leaderboard/', views.get_leaderboard, name="get-leaderboard"),
]
