import requests
import time
import urllib3
import xmltodict
import json
import urllib.parse
from urllib.parse import quote
from config import BODY_ENCODE,URI


requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
requests.packages.urllib3.disable_warnings() 
def login(URL,head):
      url = URI+URL
      headers = {'content-type': 'application/json'}
      headers.update(head)

      start = time.time()
      r = requests.post(url, verify=False)
      end = time.time()

      data_dict = xmltodict.parse(r.content)
      
      print("Body OUT\n",data_dict)

      print("The time of execution is :",
            (end-start) * 10**3, "ms")
      
      
      return data_dict

def create_POST(URL, head, body):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings()

    url = URI + URL

    headers = {'content-type': 'application/json'}
    headers.update(head)

    #body_dict = body.dict()
    # print("\nBody IN\n",body)
    body_xml = BODY_ENCODE + xmltodict.unparse( body, full_document=False)
    print("\nBody IN\n",body_xml)

    start = time.time()
    r = requests.post(url, headers=headers, data=body_xml, verify=False)
    end = time.time()
    
    # print("\n Content Out \n",r)
    data_dict = xmltodict.parse(r.content)

    print("\nBody OUT\n",data_dict)
    
    print("The time of execution is:", (end - start) * 10**3, "ms")

    return data_dict


def update_PUT(URL, head, body):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings()

    url = URI + URL

    headers = {'content-type': 'application/json'}
    headers.update(head)

    # body_dict = body.dict()
    
    body_xml = BODY_ENCODE + xmltodict.unparse( body, full_document=False)
    print("\nBody IN\n",body_xml)

    start = time.time()
    r = requests.put(url, headers=headers, data=body_xml, verify=False)
    end = time.time()

    print("\nBody OUT\n",r.content)
    data_dict = xmltodict.parse(r.content)

    # print("\nBody OUT\n",data_dict)
    
    print("The time of execution is:", (end - start) * 10**3, "ms")

    return data_dict

def encoded_PUT(URL,head,body):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings()

    headers = {'content-type': 'application/x-www-form-urlencoded'}
    headers.update(head)

    url_encoded = quote(URL)

    url = URI + url_encoded

    print ("\nBody in\n",body)

    start = time.time()
    r = requests.put(url, headers=headers, data=body, verify=False)
    end = time.time()

    print("\ncontent out\n",r.content)
    data_dict = xmltodict.parse(r.content)

    # print("\nBody OUT\n", data_dict)

    print("The time of execution is:", (end - start) * 10**3, "ms")

    return data_dict

#------------------------------------------------------------------------------------------------  
def data_GET(URL, head):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings()

    url = URI + URL

    headers = {'content-type': 'application/json'}
    headers.update(head)
    print("\nHead IN\n",headers)
    print("\nURL=\n",url)
#     body_dict = body.dict()
    
    start = time.time()
    r = requests.get(url, headers=headers,  verify=False)
    end = time.time()

    # print (r.content)
    data_dict = xmltodict.parse(r.content)

    print("\nBody OUT\n",data_dict)
    print("The time of execution is:", (end - start) * 10**3, "ms")

    return data_dict

def remove_DELETE(URL,head):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings() 
    encoded_url=quote(URL)
    url = URI+encoded_url
    headers = {'content-type': 'application/json'}
    headers.update(head)
    print("\nHeader\n",headers)
    print("\nURL IN\n",url)

    start = time.time()
    r = requests.delete(url,headers=headers, verify=False)
    end = time.time()

    # print("\nBODY OUT\n",r.content)
    data_dict=xmltodict.parse(r.content)

    print("\nBody OUT\n",data_dict)
    print("The time of execution is :",
        (end-start) * 10**3, "ms")
      
      
    return data_dict

def logout(URL,head):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings() 
    url = URI+URL
    headers = {'content-type': 'application/json'}
    headers.update(head)

#   print (head)
    print("\nURL\n=",url)
    start = time.time()
    r = requests.delete(url,headers=headers, verify=False)
    end = time.time()

    data_dict = xmltodict.parse(r.content)
    
    print(data_dict)
    print("The time of execution is :",
        (end-start) * 10**3, "ms")
    
    
    return data_dict
