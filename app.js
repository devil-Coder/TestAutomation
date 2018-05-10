var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Selenium code

var webdriver = require('selenium-webdriver');
//importing webdriver
const {Builder, By, Key, until} = require('selenium-webdriver');

/*
  * Above code is same as below
  * var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
*/

//Initializing driver for chrome
var driver =new webdriver.Builder()
    .forBrowser('firefox')
    .build();
//Above code can be written as below
//let driver = await new Builder().forBrowser('chrome').build();


(async function LoginVerification() {
    try {
        await driver.get('https://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('raj chandra vit');
        await driver.findElement(By.xpath('//input[@aria-label="Google Search"]')).click();
        await driver.findElement(By.linkText("Raj Chandra - Quora")).click();
        await driver.wait(until.titleIs('Raj Chandra - Quora'));
    } finally {
        await driver.quit();
    }
})();

console.log('App running in port 3000');
module.exports = app;
