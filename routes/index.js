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
        await driver.get('http://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        await driver.wait(until.titleIs('webdriver - Google Search'),(title)=>{
            console.log(title);
        }, 1000);
    } catch(e){
        console.log('Some error in the code..',e);
    } finally {
        await driver.quit();
    }
})();
// driver.get('http://www.google.com');
// driver.findElement(webdriver.By.name('q')).sendKeys('hello world');
// driver.findElement(webdriver.By.name('btnG')).click();
// driver.quit();

module.exports = router;
