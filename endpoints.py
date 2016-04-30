from api import app,db
from models import Transaction
from flask import jsonify,request, abort, send_from_directory
from functools import wraps
from dateutil import parser
from scraper import scrape
from selenium.common.exceptions import NoSuchElementException
import os
def check_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Flask automatically parses auth headers and attaches the .authorization property to the request
        # (which is why we"re using it here instead of the extended headers like x-auth-token)
        auth = request.authorization

        if not auth:
            abort(422, "Bad request - missing authorization headers")

        if not auth.username:
            abort(422, "Bad request - missing username")
        if not auth.password:
            abort(422, "Bad request - missing password")

        return f(*args, **kwargs)
    return decorated

def output_transaction(t):
    return {
        "id":t.id,
        "description":t.description,
        "amount":str(t.amount),
        "date":str(t.date),
        "curBal":str(t.curBal),
        "username":str(t.username)
    }

@app.route("/transaction/<string:username>",methods=["GET"])
def transactions(username):
        transactions=Transaction.query.filter_by(username=username).all()
        return jsonify({
            "transactions": [output_transaction(t) for t in transactions]
        }),200

@app.route("/static/<path:path>")
def send_js(path):
    return send_from_directory("www", path)

@app.route("/")
def index():
    return send_from_directory("www", "index.html")

@app.route("/scrape",methods=["GET"])
@check_auth
def handle_scrape():
    username = request.authorization.username
    password = request.authorization.password
    sdate = request.args.get("sdate")
    edate = request.args.get("edate")
    try:
        scrape(username, password, sdate, edate)
    except NoSuchElementException as e:
        return jsonify({
            "status": "failure"
        }),400


    return jsonify({
        "status": "success"
    }), 200
