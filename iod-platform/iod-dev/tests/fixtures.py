# conftest.py
import pytest
from django.contrib.auth.models import User
from django.test import Client
# from apps.configuration.factories import AssetTypeFactory, UserFactory,NetworthFactory
# from apps.home.factories import BaseUnitFactory


################################################################################################################################
# Client
################################################################################################################################

@pytest.fixture
def client():
    return Client()


################################################################################################################################
# Users
################################################################################################################################



################################################################################################################################
# Networth
################################################################################################################################



################################################################################################################################
# Asset-Type
################################################################################################################################




################################################################################################################################
# BaseUnit
################################################################################################################################

    
