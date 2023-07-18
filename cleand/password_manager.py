from datetime import datetime,timedelta
from app.redis1 import redis_client

redis_client.select(1)


def set_password(name):
    time = datetime.now()
    redis_client.set(name,time.strftime('%Y-%m-%d %H:%M:%S'))

def is_password_expired(username):
    creation_date_str = redis_client.get(username)
    creation_date = datetime.strptime(creation_date_str.decode(), '%Y-%m-%d %H:%M:%S')
    current_date = datetime.now()

    time_difference = current_date - creation_date

    if time_difference >= timedelta(days=30):
        return True
    else:
        return False