"""opencarbon URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))

opencarbon/urls.py
Manages URL routing for application including passing through 
multiple routes to frontend React app, eg. /datamenu, /adddata, etc
If a data endpoint is called, render it using Django REST Framework
"""

from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from backend import views

urlpatterns = [
    path('', views.home, name='home'),
    re_path(r'^schema(?P<version>[0-9\.]*).json$', views.schema, name='schema'),
    path('datamenu', views.home, name='home'),
    path('adddata', views.home, name='home'),
    path('builddata', views.home, name='home'),
    path('standards', views.home, name='home'),
    path('endpoints', views.home, name='home'),
    path('contact', views.home, name='home'),
    path('datasubmitted', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('organisations/', views.Organisations.as_view()),
    re_path(r'^organisations/(?P<shortcode>[\w\-]*)(/*)$', views.SingleOrganisation.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
