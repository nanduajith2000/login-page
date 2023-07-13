import requests
import time
import urllib3
import xmltodict
import json


requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
requests.packages.urllib3.disable_warnings() 
def login(URL,head):
      url = "https://conference.ngn.bsnl.co.in/rest/V3R8C30/"+URL
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

    url = "https://conference.ngn.bsnl.co.in/rest/V3R8C30/" + URL

    headers = {'content-type': 'application/json'}
    headers.update(head)

#     body_dict = body.dict()
    
    body_xml = '<?xml version="1.0" encoding="UTF-8"?>' + xmltodict.unparse( body, full_document=False)
    print("\nBody IN\n",body_xml)
#     print(headers)
    start = time.time()
    r = requests.post(url, headers=headers, data=body_xml, verify=False)
    end = time.time()
    
    print("\n Content Out \n",r)
    data_dict = xmltodict.parse(r.content)

    # print("Body OUT\n",data_dict)
    
    print("The time of execution is:", (end - start) * 10**3, "ms")

    return data_dict


def update_PUT(URL, head, body):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings()

    url = "https://conference.ngn.bsnl.co.in/rest/V3R8C30/" + URL

    headers = {'content-type': 'application/json'}
    headers.update(head)

    # body_dict = body.dict()
    
    body_xml = '<?xml version="1.0" encoding="UTF-8"?>' + xmltodict.unparse( body, full_document=False)
    print(body_xml)
    print("Body IN\n",body_xml)

#     print(headers)
    start = time.time()
    r = requests.put(url, headers=headers, data=body_xml, verify=False)
    end = time.time()

    data_dict = xmltodict.parse(r.content)

    print("Body OUT\n",data_dict)
    
    print("The time of execution is:", (end - start) * 10**3, "ms")

    return data_dict

def encoded_PUT(URL,head,body,):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings()

    headers = {'content-type': 'application/json'}
    headers.update(head)

    url = "https://conference.ngn.bsnl.co.in/rest/V3R8C30/" + URL

    body_encoded = urllib3.parse.urlencode(body)

    start = time.time()
    r = requests.put(url, headers=headers, data=body_encoded, verify=False)
    end = time.time()

    data_dict = xmltodict.parse(r.content)

    print("Body OUT\n", data_dict)

    print("The time of execution is:", (end - start) * 10**3, "ms")

    return data_dict

#------------------------------------------------------------------------------------------------  
def data_GET(URL, head):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings()

    url = "https://conference.ngn.bsnl.co.in/rest/V3R8C30/" + URL

    headers = {'content-type': 'application/json'}
    headers.update(head)
    print("Head IN\n",headers)

#     body_dict = body.dict()
    
    # print(headers)
    start = time.time()
    r = requests.get(url, headers=headers,  verify=False)
    end = time.time()

    print (r.content)
    data_dict = xmltodict.parse(r.content)

    print("Body OUT\n",data_dict)
    print("The time of execution is:", (end - start) * 10**3, "ms")

    return data_dict

def remove_DELETE(URL,head):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings() 
    url = "https://conference.ngn.bsnl.co.in/rest/V3R8C30/"+URL
    headers = {'content-type': 'application/json'}
    headers.update(head)
    
    start = time.time()
    r = requests.delete(url,headers=headers, verify=False)
    end = time.time()

    data_dict=xmltodict.parse(r.content)

    print(data_dict)
    print("The time of execution is :",
        (end-start) * 10**3, "ms")
      
      
    return data_dict

def logout(URL,head):
    requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
    requests.packages.urllib3.disable_warnings() 
    url = "https://conference.ngn.bsnl.co.in/rest/V3R8C30/"+URL
    headers = {'content-type': 'application/json'}
    headers.update(head)

#   print (head)

    start = time.time()
    r = requests.delete(url,headers=headers, verify=False)
    end = time.time()

    data_dict = xmltodict.parse(r.content)
    
    print(data_dict)
    print("The time of execution is :",
        (end-start) * 10**3, "ms")
    
    
    return data_dict
