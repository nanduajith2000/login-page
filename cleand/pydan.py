from typing import Optional,List
from pydantic import BaseModel

class Student(BaseModel):
    name: str
    age: int
    year: str

class UpdateStudent(BaseModel):
    name: Optional[str]=None
    age: Optional[int]= None
    year: Optional[str]= None

class UserSchema(BaseModel): 
    email: str
    password: str
    accountType: str

class LogoutToken(BaseModel):
    token:str

class addressEntrySchema(BaseModel):
     address:str
     type:str
     
class attendeeSchema(BaseModel):
     attendeeName:str
     conferenceRole: str
     addressEntry: Optional[List[addressEntrySchema]]=[]

class createConferenceInfo(BaseModel):
    token:str
    length:int
    size:int
    subject:str
    mediaTypes:str
    startTime:Optional[str]="0"
    timeZone:int
    language: str
    attendees:Optional[List[attendeeSchema]]=[]
    isAllowInvite:Optional [bool]=True
    isAutoInvite: Optional [bool]=True


class conferenceInfo (BaseModel):
    token:str
    conferenceID:str
    subconferenceID:str="0"
    length:int
    size:int
    subject:str
    mediaTypes:str
    startTime:Optional[str]="0"
    timeZone:int
    language: str
    attendees:Optional[List[attendeeSchema]]=[]
    isAllowInvite:Optional [bool]=True

class ConferenceTemplate(BaseModel):
    token:str
    conferenceTemplate: int
    templateName: str
    timeZone: int
    length: int
    size: int
    mediaTypes: str
    language: str
    isAllowInvite:Optional [bool]=True

class DeleteConferencetemplate(BaseModel):
     token:str
     templateID:str
class Conditions(BaseModel):
	key:str
	value:str
	matching:str

class Filter(BaseModel):
	resultFields:Optional[List[str]]=[]
	conditions:Conditions
	isAscend:bool
	pageIndex:int
	pageSize:int

class ConferenceFilter(BaseModel):
	token:str
	filter:Filter
	isIncludeInvitedConference:bool	

class TemplateList(BaseModel):
	token:str
	resultField:Optional[List[str]]=[]
	conditions:Conditions
	isAscend:bool
	pageIndex:int
	pageSize:int
        
class InvitePara(BaseModel):
    name: str
    phone: str
    email: Optional[str]
    sms: Optional[str]
    role: Optional[str] = "general"
    isMute:Optional [bool] = False


class ConferenceInvite(BaseModel):
    token: str
    conferenceID: str
    invitePara: List[InvitePara]

class VerifyParticipant(BaseModel):
    token: str
    conferenceID: str
    participantID: str

class ProlongConf(BaseModel):
    token:str
    conferenceID: str
    length: int  

class QueryConfInfo(BaseModel):
    token:str
    conferenceID:str
    subconferenceID:Optional[str]="0" 



class AccountInfo(BaseModel):
    name:str
    type:str

class UserPasswordInfo(BaseModel):
    token: str
    account: AccountInfo
    oldPassWord: str
    newPassWord: str
    newPassWordAffirm: str

class FindUserPasswordInfo(BaseModel):
    token:str
    accountType:str
    notifyType:str
    ipaddr:str

class IsAllMute(BaseModel):
    token:str
    conferenceID: str
    isAllMute: bool

class LeaveParti(BaseModel):
    token:str
    conferenceID: str
    participantID:str


class Contactor(BaseModel):
     token:str
     name:str
     phone:str
     mobile:str
     otherPhone1:str
     otherPhone2:str
     otherPhone3:str
     email:str
     impu:str
     description:str

class Contactor_mod(BaseModel):
     token:str
     contactorID:str
     name:str
     phone:str
     mobile:str
     otherPhone1:str
     otherPhone2:str
     otherPhone3:str
     email:str
     impu:str
     description:str

class Contactor_info(BaseModel):
     token:str
     contactorID:str

class ResultField(BaseModel):
     xsi_nil:bool=True

class SortField(BaseModel):
     xsi_nil:bool=True

class Conditions(BaseModel):
     key:str
     value:str
     matching:str

class ContactFilter(BaseModel):
     token:str
     resultField:Optional[ResultField]
     conditions:Conditions
     isAscend:bool
     sortField:Optional[SortField]
     pageIndex:int
     pageSize:int

class ResetConfPassword(BaseModel):
     token:str
     conferenceID:str
     subConferenceID:str="0"
