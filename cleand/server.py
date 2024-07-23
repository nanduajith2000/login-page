from fastapi import FastAPI,Body,Depends,Header
from pydan import LogoutToken,createConferenceInfo,conferenceInfo,ConferenceTemplate,ConferenceFilter,TemplateList,ConferenceInvite,VerifyParticipant,ProlongConf,QueryConfInfo,UserPasswordInfo,FindUserPasswordInfo,IsAllMute,Contactor,LeaveParti,DeleteConferencetemplate,Contactor_mod,Contactor_info,ContactFilter,ResetConfPassword,RaiseHand,EnableMute,Usermodel,OnlineConfInfo,CancelInvite,RollCall,RollCall,ChairRights,ContactorGroup,Contactor_modGroup,ContactorGroup_info,ContactGroupFilter
from app.model import UsersLoginSchema
from app.auth.jwt_handler import signJWT,decodeJWT
from app.auth.jwt_bearer import jwtBearer
import xml.parsers.expat
from config import ERROR_MESSAGE,CONF_DETAILS
from password_manager import set_password,is_password_expired

from fastapi.middleware.cors import CORSMiddleware
import ssl1 


import redis
redis_client = redis.Redis(host='localhost',port=6379,db=0)
redis_client.select(0)

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
#30 days expiery check
            if is_password_expired(user.email):
                expiry={"expiry":"EXPIRED"}
            else:
                expiry={"expiry":"VAILD"}
            message={"message": "success","token":jwt_token,"userID":dict1["loginResult"]["profile"]["userID"]}
            message.update(expiry)
            return message
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
        return ERROR_MESSAGE
    BODY = {'conferenceTemplate':conf_template.dict()}
    del BODY['conferenceTemplate']['token']
    dict1 = ssl1.create_POST(URL,head,BODY)
    return dict1

@app.post("/user/modifyconferencetemplate")
def mod_conftemp(mod_template:ConferenceTemplate = Body(default=None)):
    URL="conferenceTemplate/"+mod_template.templateID
    try:
        head = {'Authorization': "Basic " + redis_client.get(mod_template.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    BODY= {"conferenceTemplate":mod_template.dict()}
    del BODY["conferenceTemplate"]["token"]
    dict1 = ssl1.update_PUT(URL,head,BODY)
    return dict1

@app.post("/user/deleteconferencetemplate")
def delete_conferenc(del_template:DeleteConferencetemplate = Body(default=None)):
    URL="conferenceTemplate/"+del_template.templateID
    try:
        head = {'Authorization': "Basic " + redis_client.get(del_template.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    
    dict1=ssl1.remove_DELETE(URL,head)
    return dict1

@app.post("/user/templatelist")
def templatelist(template_list: TemplateList = Body(default=None)):
    URL = "conferenceTemplateList"
    try:
        head = {'Authorization': "Basic " + redis_client.get(template_list.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    Body = {"conferenceTemplateFilter": template_list.dict()}
    del Body["conferenceTemplateFilter"]["token"]
    dict1 = ssl1.create_POST(URL, head, Body)

    if (dict1["conferenceTemplateList"]["page"]["total"]=="0"):
        return {"message":"no_conference_template"}
    
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
        return ERROR_MESSAGE
    BODY = {'conferenceInfo':create_conference.dict()}
    del BODY['conferenceInfo']['token']
    dict1 = ssl1.create_POST(URL, head, BODY)
    return dict1

@app.post("/user/modifyconference")
def createconference(modify_conference: conferenceInfo =Body(default=None)):
    URL = "conferences/"+modify_conference.conferenceID+"/subConferenceID/"+modify_conference.subconferenceID
    try:
        head = {'Authorization': "Basic " + redis_client.get(modify_conference.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    BODY = {'conferenceInfo':modify_conference.dict()}
    del BODY["conferenceInfo"]["conferenceID"]
    del BODY["conferenceInfo"]["subconferenceID"]
    del BODY['conferenceInfo']['token']
    dict1 = ssl1.update_PUT(URL, head, BODY)
    return dict1

@app.post("/user/deleteconference")
def delete_conference(delete_conf:QueryConfInfo = Body(default=None)):
    URL="conferences/"+delete_conf.conferenceID+"/subConferenceID/"+delete_conf.subconferenceID
    try:
        head = {'Authorization': "Basic " + redis_client.get(delete_conf.token).decode('utf8')}
    except AttributeError:
        return ERROR_MESSAGE
    dict1=ssl1.remove_DELETE(URL,head)
    return dict1

@app.post("/user/endconference")
def end_conference(end_conf:QueryConfInfo = Body(default=None)):
    URL="conferences/"+end_conf.conferenceID
    try:
        head = {'Authorization': "Basic " + redis_client.get(end_conf.token).decode('utf8')}
    except AttributeError:
        return ERROR_MESSAGE
    
    dict1=ssl1.remove_DELETE(URL,head)
    return dict1


@app.post("/user/prologconference")
def prologconference(prolog_Conf:ProlongConf= Body(default=None)):
    URL="conferences/"+prolog_Conf.conferenceID+"/length"

    try:
        head = {'Authorization': "Basic " + redis_client.get(prolog_Conf.token).decode('utf8')}
    except AttributeError:
        return ERROR_MESSAGE

    BODY="length="+prolog_Conf.length

    dict1=ssl1.encoded_PUT(URL,head,BODY)

    return dict1

'''This route has 2 api calls. One to get the List of conferences.
From the list of conferences we get the conferenceID. 
The second api call is to conferenceInfo using the conferenceID we got from the
previous API call'''
@app.post("/user/conferencelist")
def conferencelist(conference_list: ConferenceFilter = Body(default=None)):
    URL = "conferenceList"

#checking jwt logout
    try:
        head = {'Authorization': "Basic " + redis_client.get(conference_list.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    
    
    BODY = {'conferenceFilter': conference_list.dict()}
    del BODY['conferenceFilter']['token']

    dict1 = ssl1.create_POST(URL, head, BODY)

    if(dict1["conferenceList"]["result"]["resultDesc"]!="SUCCESS"):
        return dict1
    
    
    
    if (dict1["conferenceList"]["page"]["total"]=="0"):
        return {"message":"no_upcoming_meetings"}
    
    keys_to_extract = CONF_DETAILS
    total=dict1["conferenceList"]["page"]["total"]
    data_list = dict1["conferenceList"]["page"]["data"]
    hasprev =  dict1["conferenceList"]["page"]["hasPrev"]
    hasnext =  dict1["conferenceList"]["page"]["hasNext"]

    if(total=="1"):
        data_list=[data_list]

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
        try:
            info=dict1["conferenceResult"]["conferenceInfo"]
        except KeyError:
            return dict1
        i+=1

        passwords = dict1['conferenceResult']['conferenceInfo']['passwords']
        for password in passwords:
            role = password['conferenceRole']
            value = password['password']
            info[role] = value
        del info['passwords']
        
        conf_details[i]=info
        # print(conf_details)

    conf_details["total"]=total
    conf_details["hasNext"]=hasnext
    conf_details["hasPrev"]=hasprev
    

    return conf_details
    



@app.post("/user/queryconferenceinfo")
def queryConferenceInfo(confInfo: QueryConfInfo=Body(default=None)):
    URL="conferences/"+confInfo.conferenceID+"/subConferenceID/"+confInfo.subconferenceID
    try:
        head= {'Authorization': "Basic " +redis_client.get(confInfo.token).decode('utf8')}
    except AttributeError:
        return ERROR_MESSAGE

    dict1=ssl1.data_GET(URL,head)

    return dict1


@app.post("/user/modifyuserpassword")
def mod_userpass(mod_password:UserPasswordInfo = Body(default=None)):
    URL="modifyUserPassword"
    try:
        head = {'Authorization': "Basic " + redis_client.get(mod_password.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    BODY= {"userPasswordInfo":mod_password.dict()}
    del BODY["userPasswordInfo"]["token"]
    dict1 = ssl1.update_PUT(URL,head,BODY)

    if dict1["result"]["resultDesc"]=="SUCESS":
        set_password(mod_password.account.name)

    return dict1

@app.post("/user/inviteparticipants")
def InviteParticipant(invite_participant:ConferenceInvite = Body(default=None)):
    URL="conferences/"+invite_participant.conferenceID+"/participants"
    # print("Particpant Data:",invite_participant)
    try:
        head= {'Authorization': "Basic " +redis_client.get(invite_participant.token).decode('utf8')}
    except AttributeError:
        return ERROR_MESSAGE

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



@app.post("/user/leaveconference")
def leaveConference(leave_conf:LeaveParti=Body(default=None)):
    URL = "conferences/"+leave_conf.conferenceID+"/participants/"+leave_conf.participantID
    try:
        head = {'Authorization':'Basic ' + redis_client.get(leave_conf.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    
    dict1 = ssl1.remove_DELETE(URL,head)
    return dict1

@app.post("/user/finduserpassword")
def finduserpassword(find_password: FindUserPasswordInfo = Body(default=None)):
    URL = "findUserPassword"
    try:
        head = {'Authorization': "Basic " + redis_client.get(find_password.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    BODY = {'findUserPasswordInfo':find_password.dict()}
    del BODY["findUserPasswordInfo"]["token"]
    dict1 = ssl1.update_PUT(URL, head, BODY)
    return dict1

@app.post("/user/mute")
def isallmute(is_mute: IsAllMute = Body(default=None)):
    URL = "conferences/"+is_mute.conferenceID+"/isAllMute"
    try:
        head = {'Authorization': "Basic " + redis_client.get(is_mute.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    
    BODY = "isAllMute="+is_mute.isAllMute
    dict1 = ssl1.encoded_PUT(URL, head, BODY)
    return dict1

#Contact Management

@app.post("/user/createpersonalcontact")
def createpersonalcontact(create_contact: Contactor = Body(default=None)):
    URL = "contactor"
    try:
        head = {'Authorization': "Basic " + redis_client.get(create_contact.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    BODY = {'contactor':create_contact.dict()}
    del BODY['contactor']['token']
    dict1 = ssl1.create_POST(URL, head, BODY)
    return dict1 

@app.post("/user/modifypersonalcontact")
def modifypersonalcontact(modify_contact: Contactor_mod = Body(default=None)):
    URL="contactor/"+modify_contact.contactorID
    try:
        head = {'Authorization': "Basic " + redis_client.get(modify_contact.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    BODY= {"contactor":modify_contact.dict()}
    del BODY["contactor"]["token"]
    dict1 = ssl1.update_PUT(URL,head,BODY)
    return dict1  

@app.post("/user/deletepersonalcontact")
def delete_contact(delete_contact:Contactor_info = Body(default=None)):
    URL="contactor/"+delete_contact.contactorID
    try:
        head = {'Authorization': "Basic " + redis_client.get(delete_contact.token).decode('utf8')}
    except AttributeError:
        return ERROR_MESSAGE
    dict1=ssl1.remove_DELETE(URL,head)
    return dict1

@app.post("/user/listpersonalcontact")
def personalcontactlist(contact_list: ContactFilter = Body(default=None)):
    URL = "contactorList"
    try:
        head = {'Authorization': "Basic " + redis_client.get(contact_list.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    BODY = {'contactorFilter':contact_list.dict()}
    del BODY['contactorFilter']['token']
    dict1 = ssl1.create_POST(URL, head, BODY)
    return dict1

@app.post("/user/querypersonalcontactinfo")
def query_personalcontact(query_contact:Contactor_info = Body(default=None)):
    URL="contactor/"+query_contact.contactorID
    try:
        head = {'Authorization': "Basic " + redis_client.get(query_contact.token).decode('utf8')}
    except AttributeError:
        return ERROR_MESSAGE
    
    dict1=ssl1.data_GET(URL,head)
    return dict1


#End of contact Management

#Begin group Management

@app.post("/user/createpersonalcontactgroup")
def createpersonalcontactgroup(create_contactgroup: ContactorGroup = Body(default=None)):
    URL = "contactorGroup"
    try:
        head = {'Authorization': "Basic " + redis_client.get(create_contactgroup.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    BODY = {'contactorGroup':create_contactgroup.dict()}
    del BODY['contactor']['token']
    dict1 = ssl1.create_POST(URL, head, BODY)
    return dict1 

@app.post("/user/modifypersonalcontactGroup")
def modifypersonalcontactGroup(modify_contactGroup: Contactor_modGroup = Body(default=None)):
    URL="contactorGroup/"+modify_contactGroup.groupID
    try:
        head = {'Authorization': "Basic " + redis_client.get(modify_contactGroup.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    BODY= {"contactorGroup":modify_contactGroup.dict()}
    del BODY["contactor"]["token"]
    dict1 = ssl1.update_PUT(URL,head,BODY)
    return dict1  

@app.post("/user/deletepersonalcontactGroup")
def delete_contactgroup(delete_contactGroup:ContactorGroup_info = Body(default=None)):
    URL="contactorGroup/"+delete_contact.groupID
    try:
        head = {'Authorization': "Basic " + redis_client.get(delete_contactGroup.token).decode('utf8')}
    except AttributeError:
        return ERROR_MESSAGE
    dict1=ssl1.remove_DELETE(URL,head)
    return dict1

@app.post("/user/listpersonalcontactGroup")
def personalcontactGrouplist(contact_grouplist: ContactGroupFilter = Body(default=None)):
    URL = "contactorGroupList"
    try:
        head = {'Authorization': "Basic " + redis_client.get(contact_grouplist.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    BODY = {'contactorFilter':contact_grouplist.dict()}
    del BODY['contactorFilter']['token']
    dict1 = ssl1.create_POST(URL, head, BODY)
    return dict1

@app.post("/user/querypersonalcontactGroupinfo")
def query_personalcontactGroup(query_contactgroup:ContactorGroup_info = Body(default=None)):
    URL="contactorGroup/"+query_contactgroup.groupID
    try:
        head = {'Authorization': "Basic " + redis_client.get(query_contactgroup.token).decode('utf8')}
    except AttributeError:
        return ERROR_MESSAGE
    dict1=ssl1.data_GET(URL,head)
    return dict1
#End group management

@app.post("/user/resetconferencepassword")
def resetconferencepassword(reset_password:ResetConfPassword = Body(default=None)):
    URL="conferences/"+reset_password.conferenceID+"/subConferenceID/"+reset_password.subConferenceID+"/resetConferencePassword"
    try:
        head = {'Authorization': "Basic " + redis_client.get(reset_password.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    dict1=ssl1.update_PUT(URL,head)
    URL="conferences/"+reset_password.conferenceID+"/subConferenceID/"+reset_password.subConferenceID
    dict2 = ssl1.data_GET(URL,head)
    return dict2

@app.post("/user/modifyuser")
def modifyuser(modify_user:Usermodel = Body(default=None)):
    URL="modifyUser"
    try:
        head = {'Authorization': "Basic " + redis_client.get(modify_user.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    
    BODY={"user":modify_user.dict()}
    del BODY['user']['token']
    dict1=ssl1.update_PUT(URL,head,BODY)
    return dict1



@app.post("/user/raisehand")
def raisehand(raiseHand:RaiseHand=Body(default=None)):
    URL="conferences/"+raiseHand.conferenceID+"/participants/"+raiseHand.participantIDs+"/handsState"
    try:
        head = {'Authorization': "Basic " + redis_client.get(raiseHand.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    
    BODY = "handsState="+raiseHand.handsState
    dict1=ssl1.encoded_PUT(URL,head,BODY)
    return dict1

@app.post("/user/enablemute")
def enablemute(enableMute:EnableMute=Body(default=None)):
    URL="conferences/"+enableMute.conferenceID+"/participants/"+enableMute.participantID+"/isMute"
    try:
        head = {'Authorization': "Basic " + redis_client.get(enableMute.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE

    BODY="isMute ="+enableMute.isMute

    dict1 = ssl1.encoded_PUT(URL,head,BODY)

    return dict1

@app.post("/user/queryonlineconferenceinfo")
def queryonlineconferenceinformation(onlineConf_Info:OnlineConfInfo=Body(default=None)):
    URL="conferences/"+onlineConf_Info.conferenceID
    try:
        head = {'Authorization': "Basic " + redis_client.get(onlineConf_Info.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE
    
    head["If-Modified-Since"]="Sat, 16 Jul 2069 22:22:06 GMT"
    dict1=ssl1.data_GET(URL,head)

    return dict1

@app.post("/user/cancelinviteuser")
def cancelinviteuser(cancel_invite:CancelInvite = Body(default=None)):
    URL="conferences/"+cancel_invite.conferenceID+"/phone/"+cancel_invite.number
    try:
        head = {'Authorization': "Basic " + redis_client.get(cancel_invite.token).decode('utf8')}
    except AttributeError:
        return ERROR_MESSAGE
    dict1=ssl1.remove_DELETE(URL,head)
    return dict1

@app.post("/user/isrollcalled")
def isrollcalled(roll_call:RollCall=Body(default=None)):
    URL="conferences/"+roll_call.conferenceID+"/participants/"+roll_call.participantID+"/isRollcalled"
    try:
        head = {'Authorization': "Basic " + redis_client.get(roll_call.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE

    BODY="isRollCalled ="+roll_call.isRollCalled

    dict1 = ssl1.encoded_PUT(URL,head,BODY)

    return dict1

@app.post("/user/approvechairperson")
def approvechairperson(approve_rights:ChairRights=Body(default=None)):
    URL="conferences/"+approve_rights.conferenceID+"/moderator"
    try:
        head = {'Authorization': "Basic " + redis_client.get(approve_rights.token).decode("utf-8")}
    except AttributeError:
        return ERROR_MESSAGE

    BODY="participantID="+{approve_rights.participantID}+"&role="+approve_rights.role

    dict1 = ssl1.encoded_PUT(URL,head,BODY)

    return dict1