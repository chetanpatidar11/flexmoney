import datetime

from .models import YogaForm, Payment

MINIMUM_DAYS_TO_CHANGE_BATCH = 30


def can_change_batch(key):
    """
    :param key:
    :return: bool
    """
    obj = YogaForm.objects.get(id=key)
    if datetime.date.today() != obj.date_joined:
        if int(str(datetime.date.today() - obj.date_joined).split(' ')[0]) >= MINIMUM_DAYS_TO_CHANGE_BATCH:
            return True

    return False


def fees_status(key):
    """
    we'll create a button to check fees status
    :param key:
    :return:
    """
    obj = Payment.objects.get(FormUser=key)
    if datetime.date.today() != obj.date:
        if int(str(datetime.date.today() - obj.date).split(' ')[0]) >= 30:
            return False
    return True


def get_user(key):
    """
    we'll create a button to check fees status
    :param key:
    :return:
    """
    obj = YogaForm.objects.get(id=key)
    return obj.Name
