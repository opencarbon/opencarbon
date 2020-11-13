"""
Copyright (c) Open Carbon, 2020
 
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.

backend/views.py
Routes user to React app or JSON schema page where necessary
Otherwise delivers custom views for REST endpoints using Django REST framework
including 'POST' method for submitting new data
"""

from django.shortcuts import render
from django.http import JsonResponse
from django.template.loader import get_template
from django.template import TemplateDoesNotExist
from django.shortcuts import redirect
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from .models import Organisation
from .serializers import OrganisationSerializer

import os
import re
import json
import urllib


def home(request):
    """
    Shows default home page or other frontend-specific pages to be rendered by frontend React app
    """
    return render(request, 'index.html')

def schema(request, version):
    """
    Shows Open Carbon JSON schema
    """
    schemaname = 'schema' + version + '.json'

    try:
        # Attempt to load schema with specific version
        get_template(schemaname)
        return render(request, schemaname, None, content_type="application/json")
    except TemplateDoesNotExist:
        # Return default schema if requested schema not found not found
        return redirect("schema.1.0.0.json")

class RecaptchaException(PermissionDenied):
    """
    Throws reCAPTCHA exception if recaptcha verification failed
    """
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Recaptcha error"
    default_code = 'invalid'

    def __init__(self, detail, status_code=None):
        self.detail = detail
        if status_code is not None:
            self.status_code = status_code

class Organisations(APIView):
    """
    List all organisations with carbon data
    """
    http_method_names = ['get', 'post', 'head']
    permission_classes = ()
    authentication_classes = ()

    @csrf_exempt
    def get(self, request, format=None):
        if 'name' in request.GET:
            organisations = Organisation.objects.filter(published=True, name__icontains=request.GET['name']).order_by('shortcode')
        else:
            organisations = Organisation.objects.filter(published=True).order_by('shortcode')
        serializer = OrganisationSerializer(organisations, many=True)
        return Response(serializer.data)

    @csrf_exempt
    def post(self, request, format=None):

        """ Begin reCAPTCHA validation """

        recaptcha_response = ''
        if 'recaptcha_response' in request.data: recaptcha_response = request.data['recaptcha_response']
        url = 'https://www.google.com/recaptcha/api/siteverify'
        values = {
            'secret': os.environ.get("GOOGLE_RECAPTCHA_SECRET_KEY"),
            'response': recaptcha_response
        }
        data = urllib.parse.urlencode(values).encode()
        req =  urllib.request.Request(url, data=data)
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode())

        """ End reCAPTCHA validation """

        if result['success'] is not True:
            raise RecaptchaException(detail={"type": "recaptcha", "recaptcha-error": result['error-codes']})

        # Ensure all posted items are not immediately published
        request.data['published'] = False
        serializer = OrganisationSerializer(data=request.data)
        if serializer.is_valid():
            organisation = serializer.save()

            # Reorder data JSON for ease of legibility

            converteddata = []
            if 'datasources' in request.data:
                for sourcedataitem in request.data['datasources']:
                    converteddataitem = {}
                    if 'sourceurl' in sourcedataitem: converteddataitem['sourceurl'] = sourcedataitem['sourceurl']
                    if 'sourcepage' in sourcedataitem: converteddataitem['sourcepage'] = sourcedataitem['sourcepage']
                    if 'sourcecomments' in sourcedataitem: converteddataitem['sourcecomments'] = sourcedataitem['sourcecomments']
                    if 'periodstart' in sourcedataitem: 
                        converteddataitem['periodstart'] = sourcedataitem['periodstart']
                        if len(converteddataitem['periodstart']) == 10: converteddataitem['periodstart'] += 'T00:00:00'
                    if 'periodend' in sourcedataitem: 
                        converteddataitem['periodend'] = sourcedataitem['periodend']
                        if len(converteddataitem['periodend']) == 10: converteddataitem['periodend'] += 'T00:00:00'
                    converteddataitem['dataitems'] = []
                    if 'dataitems' in sourcedataitem:
                        for dataitem in sourcedataitem['dataitems']:
                            unit = 'TCO2E'
                            if ('measure' in dataitem) and ('value' in dataitem):
                                if (dataitem['measure'] == 'floor.area'): unit = "M2"
                                converteddataitem['dataitems'].append({'measure': dataitem['measure'], 'unit': unit, 'value': str(dataitem['value'])})
                    converteddata.append(converteddataitem)

                organisation.datasources = json.dumps(converteddata, indent=2)
                organisation.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SingleOrganisation(APIView):
    """ 
    Display carbon data for single organisation 
    """
    http_method_names = ['get', 'post', 'head']

    def get(self, request, shortcode, format=None):
        shortcode = re.sub("[^0-9a-zA-Z]+", "", shortcode).lower()

        # We assume only one live organisation with specific shortcode 
        # though other entries with same shortcode may be added which are not live
        # All non-live submissions will be checked and incorporated into main live org

        organisation = Organisation.objects.filter(shortcode=shortcode, published=True).first()
        if organisation is None:
            data = returndata = {"name": "Not found", "datasources": []}
        else:
            datasources = json.loads(organisation.datasources)
            data = {"id": organisation.shortcode, "name": organisation.name, "parent": organisation.parent, "osm": organisation.osm, "datasources": datasources}

        return Response(data)

    def put(self, request, shortcode, format=None):
        return Response([], status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, shortcode, format=None):
        return Response([], status=status.HTTP_400_BAD_REQUEST)


