from api import app,db
from models import Transaction

from selenium import webdriver
import time
from dateutil import parser as dateparser
import json
import time
import requests
import sys
import argparse
import datetime
import os


def get_eservices(username,password):
    driver = webdriver.PhantomJS()
    driver.set_window_size(1120, 550)

    driver.get("https://www.rit.edu/eservices/")
    driver.find_element_by_xpath("//*[@id=\"block-block-19\"]/div/div/p/a").click()

    username_field = driver.find_element_by_xpath("//*[@id=\"username\"]")
    password_field = driver.find_element_by_xpath("//*[@id=\"password\"]")
    submit_button  = driver.find_element_by_xpath("/html/body/div[2]/div/form/button")

    username_field.send_keys(username)
    password_field.send_keys(password)
    submit_button.click()

    return driver

def post_transaction(t, username):
    new_trans = Transaction(description=t["ld"],amount=t["amt"],date=t["date"],curBal=t["bal"],username=username)
    db.session.add(new_trans)
    db.session.commit()


def get_transactions(username,password,start,end):
    os.system('clear')
    print("Username: "+username+", Password: "+"*"*len(password))
    driver = get_eservices(username,password)

    starttime = dateparser.parse(start)
    endtime = dateparser.parse(end)
    nowtime =datetime.datetime.now()

    if starttime>nowtime or endtime>nowtime:
        sys.exit("Pick a date thats occurred already")
    print("Start: "+start+", End: "+end)



    driver.get("https://sis.rit.edu/portalServices/foodtransactionsajax.do?sdate="+starttime.strftime("%m%d%Y")+"&edate="+endtime.strftime("%m%d%Y")+"&_="+str(int(nowtime.strftime('%s'))*1000))
    # import pdb; pdb.set_trace()

    ret = json.loads(driver.find_element_by_xpath("//pre").get_attribute('innerHTML'))["customer"]["transactions"][0]["food"]["transactions"]
    #import pdb; pdb.set_trace()
    return ret



parser = argparse.ArgumentParser(description='Add a users transactions to database')
parser.add_argument("username", help='RIT Username')
parser.add_argument("password", help='RIT Username')
parser.add_argument("sdate", help='Start Date')
parser.add_argument("edate", help='End Date')
args = parser.parse_args()

for transaction in get_transactions(args.username,args.password,args.sdate,args.edate):
    post_transaction(transaction)
