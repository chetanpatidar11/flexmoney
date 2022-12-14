from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('form', index),
    path('pay-fees', index),
    path('change-batch', index),
]
