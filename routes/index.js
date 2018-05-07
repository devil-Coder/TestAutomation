var express = require('express');
var router = express.Router();
//
// var webdriver = require('selenium-webdriver');
//
// var driver = new webdriver.Builder().
// withCapabilities(webdriver.Capabilities.chrome()).
// build();

const {Builder, By, Key, until} = require('selenium-webdriver');

(async function randomTest() {
    console.log('function exectued..');
    let driver = await new Builder().forBrowser('chrome').build();
    console.log('Built driver..');
    try {
        await driver.get('http://www.google.com');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        console.log(Key);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        console.log(driver.findElement(webdriver.By.name('')))
    } catch(e){
        console.log('Some error in the code..',e);
    } finally {
        await driver.quit();
    }
})();

module.exports = router;
