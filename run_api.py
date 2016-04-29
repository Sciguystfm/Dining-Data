from api import app,db
import models
import endpoints
from datetime import datetime
db.drop_all()
db.create_all()
app.run(debug=True)
