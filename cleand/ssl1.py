import requests
import time
import urllib3.util.ssl_
import xmltodict


def login(URL,head):
      requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
      requests.packages.urllib3.disable_warnings() 
      url = "https://conference.ngn.bsnl.co.in/rest/V3R8C30/"+URL
      headers = {'content-type': 'application/json'}
      headers.update(head)
      start = time.time()
      r = requests.post(url, verify=False)
      end = time.time()

      data_dict = xmltodict.parse(r.content)
      
      print(data_dict)
      print("The time of execution is :",
            (end-start) * 10**3, "ms")

def logout(token):
      requests.packages.urllib3.util.ssl_.DEFAULT_CIPHERS = 'ALL:@SECLEVEL=1'
      requests.packages.urllib3.disable_warnings() 
      url = "https://conference.ngn.bsnl.co.in/rest/V3R8C30/logout"
      headers = {'content-type': 'application/json',
        'Authorization':'Basic '+ token}
      # headers.update(head)
      start = time.time()
      r = requests.delete(url, verify=False,headers=headers)
      end = time.time()

      data_dict = xmltodict.parse(r.content)
      
      print(data_dict)
      print("The time of execution is :",
            (end-start) * 10**3, "ms")
      

# logout('MTE5MTI4MTQyNDMxNjU5NjY2NjkwMDAtMDAxMA==')
login("login?accountType=WEB&accountName=Test_Bsnl&password=Bsnl~1234")