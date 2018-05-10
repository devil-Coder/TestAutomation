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
        await driver.get('https://www.codepark.in');
        await driver.findElement(By.class('btn btn-outline-codepark')).click();
        await driver.findElement(By.id('loginUsername')).sendKeys(process.env.USERNAME);
        await driver.findElement(By.id('loginPassword')).sendKeys(process.env.password);
        await driver.findElement(By.class('btn btn-primary btn-sm')).click();
        await driver.wait(until.titleIs('CodePark | Dashboard'), 1000);
    } finally {
        await driver.quit();
    }
})();

console.log('App running in port 3000');
module.exports = app;
