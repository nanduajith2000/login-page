#This file is responsible for signing ,encoding
#decoding and returning JWTs

from datetime import timedelta
from typing import Dict
import jwt
from decouple import config
import redis
import time

JWT_SECRET = config("secret")
JWT_ALGORITHM = config("algorithm")

redis_client = redis.Redis(host='localhost',port=6379,db=0)

#function returns generated JWTs
def token_response(token:str):
    return{
        "access token":token
    }

#Function to sign the JMT string
def signJWT(userID : str)->Dict[str,str]:
    payload ={
        "userID":userID,
        "expiry":time.time()+200000
    }
    token = jwt.encode(payload,JWT_SECRET,algorithm=JWT_ALGORITHM)
    redis_client.set(token, 'valid') #ex will take value only as in seconds
    return token_response(token)

def decodeJWT(token:str)->dict:
    try:
        decode_token = jwt.decode(token,JWT_SECRET,algorithm=JWT_ALGORITHM)
        return decode_token if decode_token ['expiry'] >= time.time() else None
    except:
        return{}
    