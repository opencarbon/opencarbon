"""
Copyright (c) Open Carbon, 2020
 
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.

backend/admin.py
Register forms for Django admin interface
"""

from django.contrib import admin
from .models import Organisation, OrganisationAdmin

admin.site.register(Organisation, OrganisationAdmin)