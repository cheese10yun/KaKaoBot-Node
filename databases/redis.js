/**
 * Created by cheese on 2017. 2. 11..
 */
const redis = require('redis');
const db_info = require('../secret/secret');

module.exports = (router) => {
  global.client = redis.createClient(db_info.redis.port, db_info.redis.host);
  
  client.on('connect', () => {
    console.log("Redis is connected ");
  });
  
  client.on('ready', () => {
    console.log("Redis is ready");
  });
  
  client.on('error', (err) => {
    console.log('Redis error encountered : ', err);
  });
  
  client.monitor((err, res) => {
    if (err) {
      console.err(err);
    } else {
      console.info(res);
    }
  });
  
  client.on('monitor', (time, args, raw_reply) => {
    console.log(time + ': ' + args + ' | ' + raw_reply);
  });
  
  router.use((req, res, next) => {
    req.cache = client;
    next();
  });
  client.unref();
};