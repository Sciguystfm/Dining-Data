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

def save_tx(t, username):
    new_trans = Transaction(description=t["ld"],amount=int(t["amt"]),date=dateparser.parse(t["date"]),curBal=float(t["bal"]),username=username)
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

    ret = json.loads(driver.find_element_by_xpath("//pre").get_attribute('innerHTML'))["customer"]["transactions"][0]["food"]["transactions"]
    #console.log(ret)
    return ret

def scrape(username, password, sdate, edate):
    for transaction in get_transactions(username,password,sdate,edate):
        save_tx(transaction, username)
