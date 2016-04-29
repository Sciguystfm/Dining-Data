from api import db

class Transaction(db.Model):
    """docstring for Transaction"""
    id=db.Column(db.Integer,primary_key=True)
    description=db.Column(db.String(300))
    amount=db.Column(db.Numeric)
    date=db.Column(db.DateTime)
    curBal=db.Column(db.Numeric)
    username=db.Column(db.String(300))
