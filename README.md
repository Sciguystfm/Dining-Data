# Dining-Data
A web service that pulls a user's dining transaction data off of RIT's eServices page, and visualizes the aquired data in the browser.

As a student at RIT, I am forced to use a school currrency known as "Food Debit" to pay for food on campus. From time to time, I'll need to stumble through the school's outdated and unintuitive website to determine how much I have left in my account. Fed up, I did a bit of research and discovered an API that allowed me to pull my raw dining transaction data and make something useful of it.

I created a web app that prompts for a users credentials with SweetAlert, and pulls their dining transaction data using RITs Dining Services API with Selenium with phantomJS. This data is put in a JSON file which is parsed and added into a database created and controled with SQLAlcemy and flask. The data is then requested by a basic webpage through a series of ajax requests and modeled with a series of c3 graphs.
Two graphs are created:
* A line chart showing Food Debit balance over time across two semesters
* A pie chart showing the users distribution of spent food debit across the schools resturants 
The database and site are hosted using Heroku's cloud application platform.

The app can be found at *http://dining.stefanmarchhart.com*


#Images
**The Main Webpage**
![](http://imgur.com/3XLnltc.png)
**Balance over time chart expanded**
![](http://imgur.com/OLsaZWn.png)
**One data set from expanded over time**
![](http://imgur.com/xFgmzkg.png)
**The Distribution of spending pie chart**
![](http://imgur.com/ZL06NvY.png)
**An alert prompting the user to load data**
![](http://imgur.com/MtD0nre.png)

