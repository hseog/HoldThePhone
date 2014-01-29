// Mongoose support
var mongoose = require('mongoose');
mongoose.connect('mongodb://hseog:seog1122@ds027829.mongolab.com:27829/holdthephone');
exports.mongoose = mongoose.connection;

// Parse support
var Kaiseki = require('kaiseki');
var APP_ID = 'vr1X3dkgDi4tnKCgts7c8ctaFjVF7r7SpeimRC7H';
var REST_API_KEY = 'ZujXIXDd2KUyCu3IRbeIquH2vaissyGWoGgSRdaI';
var kaiseki = new Kaiseki(APP_ID, REST_API_KEY);
exports.kaiseki = kaiseki;