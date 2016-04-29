from api import app,db
from models import Transaction
from flask import jsonify,request
from dateutil import parser
def output_transaction(t):
    return {
        "id":t.id,
        "description":t.description,
        "amount":str(t.amount),
        "date":str(t.date),
        "curBal":str(t.curBal)
    }

@app.route("/transactions",methods=["GET","POST"])
def transactions():
    if request.method == 'GET':
        transactions=Transaction.query.all()
        return jsonify({
        "transactions": [output_transaction(t) for t in transactions]
        }),200
    elif request.method == 'POST':
        description=request.form["description"]
        amount=float(request.form["amount"])
        curBal=float(request.form["curBal"])
        date=parser.parse(request.form["date"])
        new_trans = Transaction(description=description,amount=amount,date=date,curBal=curBal)
        db.session.add(new_trans)
        db.session.commit()
        return jsonify({
        "transaction":output_transaction(new_trans)
        }),201

@app.route('/transaction/<int:id>')
def get_transaction(id):
    transaction = Transaction.query.get(id)
    if transaction is None:
        return jsonify({
        "status":"Transaction not found"
        }),404
    return jsonify({
    "transaction": output_transaction(transaction)
    }),200
