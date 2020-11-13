"""
Copyright (c) Open Carbon, 2020
 
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.

backend/serializers.py
Custom serializers for Open Carbon Django objects
"""

from rest_framework import serializers

from .models import Organisation

import os

class OrganisationSerializer(serializers.ModelSerializer):
    """
    Custom serializer for Open Carbon Organisation object
    """

    id = serializers.CharField(source='shortcode', required=False)
    url = serializers.SerializerMethodField()

    def get_url(self, obj):
        return os.environ.get("PUBLICDOMAIN") + 'organisations/' + obj.shortcode
            
    class Meta:
        model = Organisation
        fields = ['id', 'name', 'parent', 'osm', 'url']
