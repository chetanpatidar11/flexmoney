import datetime

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import YogaForm, Payment
from .serializers import YogaSerializer, ChangeBatchSerializer, PaymentSerializer
from .utils import can_change_batch, fees_status, get_user

MINIMUM_DAYS_TO_CHANGE_BATCH = 30


@api_view(['GET'])
def api_details(request):
    """
    :param request:
    :return:
    """
    objs = YogaForm.objects.all()
    details = {
        'View Forms': 'http://127.0.0.1:8000/api/yoga-form',
        'Create Form': 'http://127.0.0.1:8000/api/create-form',
        'Create Payment': 'http://127.0.0.1:8000/api/payment-form',
        'Change Batch API': [
            f'http://127.0.0.1:8000/api/change-batch/{key.id}' for key in objs
        ]

    }
    return Response(details)


class YogaFormView(ListAPIView):
    queryset = YogaForm.objects.all()
    serializer_class = YogaSerializer


class CreateFormView(APIView):
    serializer_class = YogaSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            Name = serializer.data.get('Name')
            Age = serializer.data.get('Age')
            Batch = serializer.data.get('Batch')
            date_joined = serializer.data.get('date_joined')
            if Batch == 'Info':
                return Response({'error': "You haven't selected any batch. Lets try again :)"},
                                status=status.HTTP_400_BAD_REQUEST)
            if 18 <= Age <= 65:
                form, created = YogaForm.objects.update_or_create(Name=Name,
                                                                  Age=Age,
                                                                  Batch=Batch,
                                                                  date_joined=date_joined,
                                                                  )
                return Response(YogaSerializer(form).data, status=status.HTTP_201_CREATED)
            return Response({'error': 'Age should be above 18 and below 65'}, status=status.HTTP_400_BAD_REQUEST)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreatePaymentView(APIView):
    serializer_class = PaymentSerializer

    def post(self, request):
        """
        :param request:
        :return:
        """
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            Amount = serializer.data.get('Amount')
            date = serializer.data.get('date')

            if Amount == 'Info':
                return Response({'error': 'Please select one of the available package'},
                                status=status.HTTP_400_BAD_REQUEST)

            key = serializer.data.get('FormUser')
            try:
                FormUser = YogaForm.objects.get(id=key)
            except YogaForm.DoesNotExist:
                return Response({'error': 'No Such User Exist'}, status=status.HTTP_400_BAD_REQUEST)
            obj = Payment.objects.filter(FormUser=FormUser)

            if obj.exists() and obj[0].is_fees_paid is True:
                return Response({'error': 'You have already paid fees for this month'},
                                status=status.HTTP_400_BAD_REQUEST)
            elif obj.exists() and not fees_status(key):
                obj[0].is_fees_paid = False
                obj[0].save()
                return Response({'error': "You haven't paid fees for this month please pay ASAP"},
                                status=status.HTTP_400_BAD_REQUEST)

            pay, created = Payment.objects.update_or_create(FormUser=FormUser, Amount=Amount, date=date)
            if created:
                pay.is_fees_paid = True
                pay.save()
            return Response(PaymentSerializer(pay).data, status=status.HTTP_201_CREATED)
        return Response({'error': f'Invalid ID - User does not exist.'}, status=status.HTTP_400_BAD_REQUEST)


class ChangeBatchView(APIView):
    serializer_class = ChangeBatchSerializer

    def get(self, request, key):
        """
        :param request:
        :param key:
        :return:
        """
        obj = YogaForm.objects.get(id=key)
        data = YogaSerializer(obj).data
        return Response(data, status=status.HTTP_200_OK)

    def patch(self, request, key):
        """
        :param request:
        :param key:
        :return:
        """
        try:
            obj = YogaForm.objects.get(id=key)
        except YogaForm.DoesNotExist:
            return Response({'error': 'No Such User Exist'}, status=status.HTTP_400_BAD_REQUEST)
        if can_change_batch(obj.id):
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                obj.cannot_change_batch = True
                obj.Batch = serializer.data.get('Batch')
                obj.save(update_fields=['Batch', 'cannot_change_batch'])
                return Response(YogaSerializer(obj).data, status=status.HTTP_200_OK)

            return Response({'error': 'Invalid Data'}, status=status.HTTP_400_BAD_REQUEST)
        days_left = MINIMUM_DAYS_TO_CHANGE_BATCH
        if datetime.date.today() != obj.date_joined:
            days_left = str(
                MINIMUM_DAYS_TO_CHANGE_BATCH - (int(str(datetime.date.today() - obj.date_joined).split(' ')[0])))
        return Response({'error': f'Batch cant be changed before 30 days. You still have {days_left} days left'},
                        status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def is_user_paid(request, key):
    """
    :param request:
    :param key:
    :return:
    """
    try:
        status_ = fees_status(key)
    except:
        return Response({'error': 'No Such User Exist'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'is_fees_paid': status_, 'error': ''})


@api_view(['GET'])
def get_user_name(request, key):
    """
    :param request:
    :param key:
    :return:
    """
    return Response({'Name': get_user(key)})
