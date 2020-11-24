"""
Copyright (c) Open Carbon, 2020
 
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.

backend/models.py
Django models and custom field widgets for Open Carbon backend application
"""

from django.db import models
from django.contrib import admin
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django import forms 

import re

class OpenCarbonDatasourcesWidget(forms.widgets.Input):
    """
    Custom widget that uses react-jsonschema-form to edit Open Carbon JSON datasources field
    """      
    template_name = 'opencarbon/datasources.html'
    input_type = 'text'

    def get_context(self, name, value, attrs):
        context = super(OpenCarbonDatasourcesWidget, self).get_context(name, value, attrs)
        context['widget']['attrs']['placeholder'] = name.title()
        return context

class OpenCarbonDatasourcesField(models.TextField):
    """
    Custom field for Open Carbon JSON datasources field that triggers custom widget when editing
    """      
    description = "A custom field for handling Open Carbon JSON datasources"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class Organisation(models.Model):
    """
    Open Carbon Organisation model
    """
    name = models.CharField(max_length = 200)
    shortcode = models.CharField(max_length = 200, blank=True, default='')
    parent = models.CharField(max_length = 200, verbose_name='Parent organisation', blank=True, default='')
    osm = models.CharField(max_length = 200, verbose_name='Open Street Map URL', blank=True, )
    published = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    datasources = OpenCarbonDatasourcesField(default='', blank=True, verbose_name='Data sources')    

    def __str__(self):
        return self.name

    class Meta:
        indexes = [
            models.Index(fields=['name',]),
            models.Index(fields=['shortcode',]),
        ]


@receiver(pre_save, sender=Organisation)
def update_profile(sender, instance, *args, **kwargs):
    """
    Update Open Carbon Organisation's shortcode if it's empty using organisation's name
    """
    # Generate shortcode name
    if instance.shortcode == '':
        instance.shortcode = re.sub("[^0-9a-zA-Z]+", "", instance.name).lower()

class OrganisationAdmin(admin.ModelAdmin):
    """
    OrganisationAdmin custom admin model using Open Carbon datasources widget
    """
    list_display = ['name', 'shortcode', 'published', 'created', 'updated']
    search_fields = ('name',)
    formfield_overrides = {
        OpenCarbonDatasourcesField: {'widget': OpenCarbonDatasourcesWidget }
    }
