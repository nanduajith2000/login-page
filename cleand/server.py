from fastapi import FastAPI,Body,Depends
from pydan import LogoutToken
from app.model import UsersLoginSchema
from app.auth.jwt_handler import signJWT,decodeJWT
from app.auth.jwt_bearer import jwtBearer

from fastapi.middleware.cors import CORSMiddleware
import redis
import ssl1 

redis_client = redis.Redis(host='localhost',port=6379,db=0)


msg1= "Enter Student ID"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/user/login", tags=["user"])
def user_login(user: UsersLoginSchema = Body(default=None)):
    dict1=ssl1.login(user.email, user.password)
    try:
        if dict1["loginResult"]["result"]["resultDesc"]=="SUCCESS":
            redis_client.set(dict1["loginResult"]["profile"]["token"],signJWT(user.email)["access token"])
            return {"message": "success",
                    "token":redis_client.get(dict1["loginResult"]["profile"]["token"])
                    }
        else:
            return{"Message":"Invalid username or password"}
    except:
        return{"Message":"Not found"}

   
#Route : To logout
@app.delete("/user/logout", dependencies=[Depends(jwtBearer())], tags=["user"])
def logout(logout_token: LogoutToken= Body(default=None)):
    user = decodeJWT(logout_token.token)
    if user:
        redis_client.expire(logout_token.token,1)
        # user["expiry"] = time.time() 
    # Perform additional logout actions, such as removing the token from a blacklist or invalidating the token
    return {"message": "User has been logged out"}

