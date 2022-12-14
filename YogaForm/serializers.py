from rest_framework import serializers

from .models import YogaForm, Payment


class YogaSerializer(serializers.ModelSerializer):
    class Meta:
        model = YogaForm
        fields = ('id', 'Name',
                  'Age',
                  'Batch',
                  'date_joined',
                  )


class ChangeBatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = YogaForm
        fields = ('Batch', 'is_allowed_to_change_batch',)


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('FormUser',
                  'Amount',
                  'date',)
