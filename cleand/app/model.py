from pydantic import BaseModel,Field

class PostSchema(BaseModel):
    id: int = Field(default=None)
    title: str = Field(default=None)
    content: str = Field(default=None)
    class Config:
        schema_extra = {
            "post_demo": {
                "title":"Some Title",
                "content":"Some Content"
            }
        }

class UsersSchema(BaseModel):
    fullname:str 
    email: str
    password: str 
    class Config:
        the_schema = {
            "user_demo": {
                "name": "Bek",
                "email": "bek@example.com",
                "password": "123"
            }
        }

class UsersLoginSchema(BaseModel):
    email: str = Field(default=None)
    password: str = Field(default=None)
    accountType: str

    class Config:
        the_schema = {
            "user_demo": {
                "email": "bek@example.com",
                "password": "123"
            }
        }
