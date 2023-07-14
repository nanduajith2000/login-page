from fastapi import FastAPI,Body,Depends,Header
from pydan import LogoutToken,createConferenceInfo,conferenceInfo,ConferenceTemplate,ConferenceFilter,TemplateList,ConferenceInvite,VerifyParticipant,ProlongConf,QueryConfInfo,UserPasswordInfo,FindUserPasswordInfo,IsAllMute,Contactor,LeaveParti,DeleteConferencetemplate
from app.model import UsersLoginSchema
from app.auth.jwt_handler import signJWT,decodeJWT
from app.auth.jwt_bearer import jwtBearer
import xml.parsers.expat
from typing import Dict, Any


from fastapi.middleware.cors import CORSMiddleware
import redis
import ssl1 



redis_client = redis.Redis(host='localhost',port=6379,db=0)


msg1= "Enter Student ID"

app = FastAPI()

def checkToken(token):
    if token==None:
        return True
    return False

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"Data":"First Data"}

@app.post("/user/login", tags=["user"])
def user_login(user: UsersLoginSchema = Body(default=None)):
    URL = "login?accountType="+user.accountType+"&accountName="+user.email+"&password="+user.password
    dict1=ssl1.login(URL,user)
   
    try:
        if dict1["loginResult"]["result"]["resultDesc"]=="SUCCESS":
            jwt_token=signJWT(user.email)["access token"]
            redis_client.set(jwt_token,dict1["loginResult"]["profile"]["token"])
            return {"message": "success","token":jwt_token,"userID":dict1["loginResult"]["profile"]["userID"]}
    except:
        if dict1["result"]["resultDesc"]=="NOT_FOUND":
            return{"message":"Invalid username or password"}
        else:
            return{"message":"some error has occurred"}
   
#Route : To logout
@app.delete("/user/logout", tags=["user"])
def logout(logout_token: LogoutToken = Body(default=None)):
    token = logout_token.token
    try:
        head = {'Authorization': "Basic " + redis_client.get(token).decode("utf-8")}
    except AttributeError:
        return {"message":"User Already Logged Out"}
    URL = "logout"
    dict1 = ssl1.logout(URL, head)
    is_deleted = redis_client.delete(token)

    # Perform additional logout actions, such as removing the token from a blacklist or invalidating the token

    if is_deleted:
        return {"message": "User has been logged out"}
    else:
        return {"message": "Logout failed or token does not exist"}


@app.post("/user/createconferencetemplate")
def CreateConferenceTemplate(conf_template: ConferenceTemplate =Body(default=None)):
    URL="conferenceTemplate"
    try:
        head = {'Authorization': "Basic " + redis_client.get(conf_template.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invaild Token"}
    BODY = {'conferenceTemplate':conf_template.dict()}
    del BODY['conferenceTemplate']['token']
    dict1 = ssl1.create_POST(URL,head,BODY)
    return dict1

@app.put("/user/modifyconferencetemplate")
def mod_conftemp(mod_template:ConferenceTemplate = Body(default=None)):
    URL="conferenceTemplate/"+mod_template.templateId
    try:
        head = {'Authorization': "Basic " + redis_client.get(mod_template.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invalid Token"}
    BODY= {"conferenceTemplate":mod_template.dict()}
    del BODY["conferenceTemplate"]["token"]
    dict1 = ssl1.update_PUT(URL,head,BODY)
    return dict1

@app.delete("/user/deleteconferencetemplate")
def delete_conferenc(del_template:DeleteConferencetemplate = Body(default=None)):
    URL="conferenceTemplate/"+del_template.templateId
    try:
        head = {'Authorization': "Basic " + redis_client.get(del_template.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invalid Token"}
    
    dict1=ssl1.remove_DELETE(URL,head)
    return dict1


@app.post("/user/templatelist")
def templatelist(template_list: TemplateList = Body(default=None)):
    URL = "conferenceTemplateList"
    try:
        head = {'Authorization': "Basic " + redis_client.get(template_list.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invalid Token"}
    Body = {"conferenceTemplateFilter": template_list.dict()}
    del Body["conferenceTemplateFilter"]["token"]
    dict1 = ssl1.create_POST(URL, head, Body)
    data_list = dict1["conferenceTemplateList"]["page"]["data"]
    ans = {"message": "success"}
    i = 0
    for item in data_list:
        entry_list = item["entry"]
        extracted_dict = {}
        for entry in entry_list:
            key = entry["key"]
            value = entry["value"]
            extracted_dict[key] = value
        i += 1
        ans.update({i: extracted_dict})
    ans["total"] = i
    return ans

@app.post("/user/createconference")
def createconference(create_conference: createConferenceInfo =Body(default=None)):
    URL = "conference"
    try:
        head = {'Authorization': "Basic " + redis_client.get(create_conference.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invaild Token"}
    BODY = {'conferenceInfo':create_conference.dict()}
    del BODY['conferenceInfo']['token']
    dict1 = ssl1.create_POST(URL, head, BODY)
    return dict1

@app.put("/user/modifyconference")
def createconference(modify_conference: conferenceInfo =Body(default=None)):
    URL = "conferences/"+modify_conference.conferenceID+"/subConferenceID/"+modify_conference.subconferenceID
    try:
        head = {'Authorization': "Basic " + redis_client.get(modify_conference.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invalid Token"}
    BODY = {'conferenceInfo':modify_conference.dict()}
    del BODY["conferenceInfo"]["conferenceID"]
    del BODY["conferenceInfo"]["subconferenceID"]
    del BODY['conferenceInfo']['token']
    dict1 = ssl1.update_PUT(URL, head, BODY)
    return dict1

@app.delete("/user/deleteconference")
def delete_conference(delete_conf:QueryConfInfo = Body(default=None)):
    URL="conferences/"+delete_conf.conferenceID+"/subConferenceID/"+delete_conf.subconferenceID
    try:
        head = {'Authorization': "Basic " + redis_client.get(delete_conf.token).decode('utf8')}
    except AttributeError:
        return {"message": "Invalid Token"}
    dict1=ssl1.remove_DELETE(URL,head)
    return dict1

# @app.put("/user/prologconference")
# def prologconference(prolog_Conf:ProlongConf= Body(default=None)):
#     URL="conferences/"+prolog_Conf.conferenceID+"/length"

#     try:
#         head = {'Authorization': "Basic " + redis_client.get(prolog_Conf.token).decode('utf8')}
#     except AttributeError:
#         return {"message": "Invalid Token"}

#     BODY={}

#     dict1=ssl1.encoded_PUT(URL,head,BODY)

#     return dict1


@app.post("/user/conferencelist")
def conferencelist(conference_list: ConferenceFilter = Body(default=None)):
    URL = "conferenceList"

#checking jwt logout
    try:
        head = {'Authorization': "Basic " + redis_client.get(conference_list.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invalid Token"}
    
    
    BODY = {'conferenceFilter': conference_list.dict()}
    del BODY['conferenceFilter']['token']
    dict1 = ssl1.create_POST(URL, head, BODY)
    # return dict1
    data_list = dict1["conferenceList"]["page"]["data"]
    keys_to_extract = [
    "Subject",
    "StartTime",
    "EndTime",
    "ScheduserName",
    "accessNumber",
    "ConferenceID",
    "ChairpersonID",
    "ConferenceState",
    "factEndTime",
]

    ans={"message": "success"}
    conf_details={"message":'GET_SUCCESS'}

    i=0
    for item in data_list:
        entry_list = item["entry"]
        extracted_dict = {}
        for entry in entry_list:
            key = entry["key"]
            value = entry["value"]
            if key in keys_to_extract:
                extracted_dict[key] = value
        URL = "conferences/" + extracted_dict['ConferenceID'] + "/subConferenceID/0"
        dict1 = ssl1.data_GET(URL, head)
        info=dict1["conferenceResult"]["conferenceInfo"]
        i+=1
        info["chair"]=info["passwords"][0]["password"]
        info["general"]=info["passwords"][1]["password"]
        del info['passwords']
        conf_details[i]=info
        # print(conf_details)
        ans.update({i:extracted_dict})
    conf_details["total"]=i

    return conf_details


@app.post("/user/queryconferenceinfo")
def queryConferenceInfo(confInfo: QueryConfInfo=Body(default=None)):
    URL="conferences/"+confInfo.conferenceID+"/subConferenceID/"+confInfo.subconferenceID
    try:
        head= {'Authorization': "Basic " +redis_client.get(confInfo.token).decode('utf8')}
    except AttributeError:
        return {"message": "Invalid Token"}

    dict1=ssl1.data_GET(URL,head)

    return dict1

@app.put("/user/modifyuserpassword")
def mod_userpass(mod_password:UserPasswordInfo = Body(default=None)):
    URL="modifyUserPassword"
    try:
        head = {'Authorization': "Basic " + redis_client.get(mod_password.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invalid Token"}
    BODY= {"userPasswordInfo":mod_password.dict()}
    del BODY["userPasswordInfo"]["token"]
    dict1 = ssl1.update_PUT(URL,head,BODY)
    return dict1

@app.post("/user/inviteparticipants")
def InviteParticipant(invite_participant:ConferenceInvite = Body(default=None)):
    URL="conferences/"+invite_participant.conferenceID+"/participants"
    # print("Particpant Data:",invite_participant)
    try:
        head= {'Authorization': "Basic " +redis_client.get(invite_participant.token).decode('utf8')}
    except AttributeError:
        return {"message": "Invalid Token"}

    BODY={"inviteParas":invite_participant.dict()}
    del BODY["inviteParas"]["token"]
    del BODY["inviteParas"]["conferenceID"]


    try:
        dict1 = ssl1.create_POST(URL, head, BODY)
    except xml.parsers.expat.ExpatError as e:
        # Handle the exception here
        print("Error parsing XML:", e)
        return {"message": "Error occurred during XML parsing"}

    return dict1
    # return {"message":"Calling..."}

@app.put("/user/mute")
def isallmute(is_mute: IsAllMute=Body(default=None)):
    URL = "conferences/"+is_mute.conferenceID+"/isAllMute"
    try:
        head = {'Authorization':'Basic' + redis_client.get(is_mute.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invalid Token"}
    BODY = is_mute.dict()
    del BODY["token"]
    del BODY["conferenceID"]
    dict1 = ssl1.encoded_PUT(URL,head,BODY)
    return dict1

@app.delete("/user/leaveconference")
def leaveConference(leave_conf:LeaveParti=Body(default=None)):
    URL = "conferences/"+leave_conf.conferenceID+"/participants/"+leave_conf.participantID
    try:
        head = {'Authorization':'Basic' + redis_client.get(leave_conf.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invalid Token"}
    
    dict1 = ssl1.remove_DELETE(URL,head)
    return dict1
#         head = {'Authorization': "Basic " + redis_client.get(verifyparti.token).decode('utf8')}
#     except AttributeError:
#         return {"message": "Invalid Token"}

#     dict1 = ssl1.data_GET(URL, head)

#     return dict1
    
# @app.delete("/user/removeparticipant")
# def removeParticipant(remove_parti:verifyParticipant=Body(default=None)):
#     URL="conferences/"+remove_parti.conferenceID+"/participants/"+remove_parti.participantID
#     try:
#         head= {'Authorization': "Basic " +redis_client.get(remove_parti.token).decode('utf8')}
#     except AttributeError:
#         return {"message": "Invalid Token"}
    
#     dict1=ssl1.data_DELETE(URL,head)

#     return dict1

@app.put("/user/finduserpassword")
def finduserpassword(find_password: FindUserPasswordInfo = Body(default=None)):
    URL = "findUserPassword"
    try:
        head = {'Authorization': "Basic " + redis_client.get(find_password.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invalid Token"}
    BODY = {'findUserPasswordInfo':find_password.dict()}
    del BODY["findUserPasswordInfo"]["token"]
    dict1 = ssl1.update_PUT(URL, head, BODY)
    return dict1

@app.put("/user/mute")
def isallmute(is_mute: IsAllMute = Body(default=None)):
    URL = "conferences/"+is_mute.conferenceID+"/isAllMute"
    try:
        head = {'Authorization': "Basic " + redis_client.get(is_mute.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invalid Token"}
    BODY = is_mute.dict()
    del BODY["token"]
    del BODY["conferenceID"]
    dict1 = ssl1.encoded_PUT(URL, head, BODY)
    return dict1

@app.post("/user/createpersonalcontact")
def createpersonalcontact(create_contact: Contactor = Body(default=None)):
    URL = "contactor"
    try:
        head = {'Authorization': "Basic " + redis_client.get(create_contact.token).decode("utf-8")}
    except AttributeError:
        return {"message":"Invaild Token"}
    BODY = {'contactor':create_contact.dict()}
    del BODY['contactor']['token']
    dict1 = ssl1.create_POST(URL, head, BODY)
    return dict1 
