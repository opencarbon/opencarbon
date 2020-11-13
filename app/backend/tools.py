"""
Copyright (c) Open Carbon, 2020
 
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.

backend/tools.py
Provides range of backend tools that can be run from command line:

importdata: Imports data from 'data/emissionsdata.xslx'
"""

import os
import pandas
import json

if __name__ == '__main__':
    import sys
    import django
    parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir))
    sys.path.append(parent_dir)
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "opencarbon.settings")
    django.setup()

from backend.models import Organisation


def convertrowtojson(row):
    """
    Convert line of data from spreadsheet into Open Carbon format
    """

    start = str(row['Latest year - Start'])
    end = str(row['Latest year - End'])

    # Make simplified assumptions about exact start and end date based on start/end year
    # If start = end, we assume calendar year
    # Otherwise assume standard accounting year

    if start == end:
        start += '-01-01T00:00:00'
        end += '-12-31T00:00:00'
    else:
        start += '-04-01T00:00:00'
        end += '-03-31T00:00:00'

    fields = {
        "Scope 1" : {'unit': 'TCO2E', 'measure': 'scope1'},	
        "Scope 2 - Location-based" : {'unit': 'TCO2E', 'measure': 'scope2.location'},	
        "Scope 2 - Market-based" : {'unit': 'TCO2E', 'measure': 'scope2.market'},	
        "Scope 1 & 2 - Location-based" : {'unit': 'TCO2E', 'measure': 'scope1and2.location'},	
        "Scope 1 & 2 - Market-based" : {'unit': 'TCO2E', 'measure': 'scope1and2.market'},
        "Scope 3" : {'unit': 'TCO2E', 'measure': 'scope3'},	
        "Floor area (m2)" : {'unit': 'M2', 'measure': 'floor.area'}
    }

    datajson = [{
        "sourceurl": row['Report URL'],
        "sourcepage": str(row['Page']),
        "sourcecomments": row['Comments'],
        "periodstart": start,
        "periodend": end,
        "dataitems": []
    }]

    for field in fields:
        if row[field] != "":
            datajson[0]["dataitems"].append({
                "measure": fields[field]['measure'],
                "unit": fields[field]['unit'],
                "value": str(row[field])
            })

    return json.dumps(datajson, indent=2)

def importdata():
    """
    Import data from existing XLSX data file
    """

    datafile = 'data/emissionsdata.xlsx' 

    if os.path.isfile(datafile) is False:
        print("Data file not present - aborting")
        return

    with open(datafile, 'rb') as f:
        organisations = pandas.read_excel(f).fillna('')
        for count, row in organisations.iterrows():
            name = row['Company']
            organisation = Organisation.objects.filter(name=name).first()
            parent = row['Parent Company']
            datasources = convertrowtojson(row)
            if organisation is None:
                organisation = Organisation(
                    name=name,
                    parent=parent, 
                    published=True, 
                    datasources=datasources)
            else:
                organisation.parent = parent
                organisation.published = True
                organisation.datasources = datasources
            organisation.save()

    print("Import organisations finished, imported: " + str(count))

if len(sys.argv) == 1:
    print("""
****** Open Carbon Batch Processing *******

Possible arguments are:

importdata
  Imports data from 'data/emissionsdata.xslx'

""")

else:
    primaryargument = sys.argv[1]

    if primaryargument == "importdata":
        importdata()
