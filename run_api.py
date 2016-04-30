from api import app,db
import models
import endpoints
from datetime import datetime
import os

if __name__ == '__main__':
    db.create_all()
    app.run(debug=False, host='0.0.0.0', port=int(os.environ.get('PORT',5000)))
