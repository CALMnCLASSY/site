print("wsgi.py: Starting...")
from app import app
print("wsgi.py: Application imported.")
application = app
print("wsgi.py: Application assigned.")