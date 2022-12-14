from django.urls import path
from .views import YogaFormView, CreateFormView, ChangeBatchView, CreatePaymentView, is_user_paid, api_details, \
    get_user_name

urlpatterns = [
    path('', api_details),
    path('yoga-form', YogaFormView.as_view()),
    path('create-form', CreateFormView.as_view()),
    path('payment-form', CreatePaymentView.as_view()),
    path('change-batch/<int:key>', ChangeBatchView.as_view()),
    path('get_user_name/<int:key>', get_user_name),
    path('check/<int:key>', is_user_paid),
]