import datetime

from django.db import models
from model_utils import Choices


# Create your models here.


class YogaForm(models.Model):
    BATCHES = Choices(
        ('Info', 'Choose a batch'),
        ('Morning-1', '6AM-7AM'),
        ('Morning-2', '7AM-8AM'),
        ('Morning-3', '8AM-9AM'),
        ('Evening-4', '5PM-6PM'),
    )

    Name = models.CharField(max_length=255)
    Age = models.IntegerField()
    Batch = models.CharField(max_length=100, choices=BATCHES, default=BATCHES.Info)
    date_joined = models.DateField(auto_now_add=True)
    cannot_change_batch = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.Name}'


class Payment(models.Model):

    FormUser = models.ForeignKey(YogaForm, on_delete=models.CASCADE)
    Amount = models.IntegerField()
    date = models.DateField(auto_now_add=True)
    is_fees_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.FormUser.Name} paid {self.Amount}"
