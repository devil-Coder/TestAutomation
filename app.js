var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var webdriver = require('selenium-webdriver');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


var driver = new webdriver.Builder().
  withCapabilities(webdriver.Capabilities.chrome()).
  build();

try {
    driver.get('http://www.google.com');
    driver.findElement(webdriver.By.name('q')).sendKeys('simple programmer');
    driver.findElement(webdriver.By.name('btnG')).click();
} catch(error){
  console.log(error);
} finally {
    driver.quit();
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
console.log('App running in port 3000');
module.exports = app;
