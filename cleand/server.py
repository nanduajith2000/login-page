from fastapi import FastAPI,Body,Depends,Header
from pydan import LogoutToken
from app.model import UsersLoginSchema
from app.auth.jwt_handler import signJWT,decodeJWT
from app.auth.jwt_bearer import jwtBearer

from fastapi.middleware.cors import CORSMiddleware
import redis
import ssl1 
# from json2xml import json2xml
redis_client = redis.Redis(host='localhost',port=6379,db=0)


msg1= "Enter Student ID"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/user/login", tags=["user"])
def user_login(user: UsersLoginSchema = Body(default=None)):
    URL = "login?accountType=WEB&accountName="+user.email+"&password="+user.password
    dict1=ssl1.login(URL,user)
    print(dict1)
    try:
        if dict1["loginResult"]["result"]["resultDesc"]=="SUCCESS":
            redis_client.set(dict1["loginResult"]["profile"]["token"],signJWT(user.email)["access token"])
            return {"message": "success",
                    "token":dict1["loginResult"]["profile"]["token"]
            }
    except:
        if dict1["result"]["resultDesc"]=="NOT_FOUND":
            return{"message":"Invalid username or password"}
        else:
            return{"message":"some error has occurred"}

   
#Route : To logout
# @app.delete("/user/logout", dependencies=[Depends(jwtBearer())], tags=["user"])
@app.delete("/user/logout", tags=["user"])

def logout(logout_token: LogoutToken= Body(default=None)):
    URL="/logout"
    # logout_token=json2xml(logout_token).to_xml()
    dict1=ssl1.login(URL,logout_token)
    print(dict1)
    try:
        if dict1["result"]["resultDesc"]=="SUCCESS":
            user = decodeJWT(logout_token.token)
            redis_client.expire(logout_token.token,1)
            return {"message": "success"}
    except:
        return{"message":"some error has occurred"}
    # if user:
        # user["expiry"] = time.time() 
    # Perform additional logout actions, such as removing the token from a blacklist or invalidating the token
    # return {"message": "User has been logged out"}

