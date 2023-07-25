from typing import Optional,List
from pydantic import BaseModel
from config import CONF_DETAILS

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

class CycleParams(BaseModel):
    startDate: int
    endDate: int
    cycle: str
    point: int

class createConferenceInfo(BaseModel):
    token:str
    length:int
    size:int
    subject:str
    mediaTypes:str
    startTime:Optional[str]
    timeZone:int
    language: str
    attendees:Optional[List[attendeeSchema]]=[]
    cycleParams: Optional[CycleParams]=[]
    accessValidateType: Optional[int]=0
    isCycleType: Optional[bool]=False
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
    templateID: int
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
    resultFields:List[str]=CONF_DETAILS
    conditions:Optional[Conditions]
    isAscend:bool
    sortField:Optional[str]
    pageIndex:int
    pageSize:int

class ConferenceFilter(BaseModel):
	token:str
	filter:Filter
	isIncludeInvitedConference:bool	

class TemplateList(BaseModel):
	token:str
	resultField:Optional[List[str]]=[]
	isAscend:bool
	pageIndex:int
	pageSize:int
        
class InvitePara(BaseModel):
    name: str
    phone: str
    email: str=""
    sms: str=""
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
    length: str  

class QueryConfInfo(BaseModel):
    token:str
    conferenceID:str
    subconferenceID:Optional[str]="0" 



class AccountInfo(BaseModel):
    name:str
    type:str

class Usermodel(BaseModel):
     token:str
     account:AccountInfo
     name:str
     pin:str
     mobile:str
     telephone:str
     email:str

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
    isAllMute: str

class LeaveParti(BaseModel):
    token:str
    conferenceID: str
    participantID:str


class Contactor(BaseModel):
     token:str
     name:str
     phone:str
     mobile:Optional[str]
     otherPhone1:Optional[str]
     otherPhone2:Optional[str]
     otherPhone3:Optional[str]
     email:Optional[str]
     impu:Optional[str]
     description:Optional[str]

class Contactor_mod(BaseModel):
     token:str
     contactorID:str
     name:Optional[str]
     phone:Optional[str]
     mobile:Optional[str]
     otherPhone1:Optional[str]
     otherPhone2:Optional[str]
     otherPhone3:Optional[str]
     email:Optional[str]
     impu:Optional[str]
     description:Optional[str]

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
    resultFields:Optional[ResultField]
    conditions:Optional[Conditions]=[]
    isAscend:bool
    sortField:Optional[SortField]
    pageIndex:int
    pageSize:int
class ContactorGroup(BaseModel):
     token:str
     groupID:int
     groupName:str
     Description:Optional[str]

class Contactor_modGroup(BaseModel):
     token:str
     groupID:int
     groupName:Optional[str]
     Description:Optional[str]

class ContactorGroup_info(BaseModel):
     token:str
     groupID:int
class ContactGroupFilter(BaseModel):
    token:str
    resultFields:Optional[ResultField]
    conditions:Optional[Conditions]=[]
    isAscend:bool
    sortField:Optional[SortField]
    pageIndex:int
    pageSize:int

class ResetConfPassword(BaseModel):
    token:str
    conferenceID:str
    subConferenceID:str="0"
class RaiseHand(BaseModel):
    token:str
    conferenceID:str
    participantIDs:str
    handsState:str="Down"

class EnableMute(BaseModel):
    token:str
    conferenceID:str
    participantID:str
    isMute:str


class OnlineConfInfo(BaseModel):
     token:str
     conferenceID:str


class CancelInvite(BaseModel):
     token:str
     conferenceID:str
     phone:str

class RollCall(BaseModel):
     token:str
     conferenceID:str
     participantID:str
     confToken:str
     isRollCalled:bool

class ChairRights(BaseModel):
     token:str
     conferenceID:str
     participantID:str
     role:str="chair"


