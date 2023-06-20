#The function of this file is to check whether
#the reqest is authorized or not 

from fastapi import Request,HTTPException 
from fastapi.security import HTTPBearer,HTTPAuthorizationCredentials

from .jwt_handler import decodeJWT

import redis

redis_client = redis.Redis(host='localhost',port=6379,db=0)

class jwtBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(jwtBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(jwtBearer,self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme")
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid or expired token")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="invalid authorisation code")


    def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False
        if redis_client.exists(jwtoken):
            try:
                payload = decodeJWT(jwtoken)
            except:
                payload = None
            if payload:
                isTokenValid = True
            return isTokenValid


