/**
 * Created by cheese on 2017. 2. 17..
 */
const cron = require('node-cron');
const async = require('async');
const RedisDAO = require('../service/RedisDAO');
const request = require('request');
const cheerio = require('cheerio');
const Scheduler = {};

const URL = {
  diet_normal: 'http://dormi.mokpo.ac.kr/www/bbs/board.php?bo_table=food',
  diet_BTL: 'http://dormi.mokpo.ac.kr/www/bbs/board.php?bo_table=food_btl'
};

// let task = cron.schedule('*/3 * * * *', ()=> {
Scheduler.test =()=> {
  const tasks = [
    (callback) => {
      RedisDAO.deleteByKeyPattern(client, RedisDAO.keys_pattern, (err) => {
        callback(err);
      });
    },
    
    (callback) => {
      
      request.get(URL.diet_normal, (err, res, html) => {
        if (!err && res.statusCode === 200) {
          let $ = cheerio.load(html);
          let diet = null;
          
          $('.tbline31 tr').each(function () {
            diet = '기존식단\r\n';
            diet += '----------아침---------\r\n';
            diet += $(this).find("td").eq(0).text() + '\r\n';
            diet += '----------점심---------\r\n';
            diet += $(this).find("td").eq(1).text() + '\r\n';
            diet += '----------저녁---------\r\n';
            diet += $(this).find("td").eq(2).text();
          });
          
          callback(err, diet);
        }
      });
    },
    
    (diet, callback) => {
      RedisDAO.setByKey(client, RedisDAO.key_diet_normal, JSON.stringify(diet), (err) => {
        callback(err);
      });
    },
    
    (callback) => {
      
      request.get(URL.diet_BTL, (err, res, html) => {
        if (!err && res.statusCode === 200) {
          let $ = cheerio.load(html);
          let diet = null;
          
          $('.tbline31 tr').each(() => {
            diet = '기존식단\r\n';
            diet += '----------아침---------\r\n';
            diet += $(this).find("td").eq(0).text() + '\r\n';
            diet += '----------점심---------\r\n';
            diet += $(this).find("td").eq(1).text() + '\r\n';
            diet += '----------저녁---------\r\n';
            diet += $(this).find("td").eq(2).text();
          });
          callback(err, diet);
        }
      });
    },
    
    (diet, callback) => {
      RedisDAO.setByKey(client, RedisDAO.key_diet_BTL, JSON.stringify(diet), (err) => {
        callback(err, diet);
      });
    },
  ];
  
  async.waterfall(tasks, (err) => {
    if (!err) {
      console.info('Crontab Success');
    } else {
      console.error(err);
    }
  });
// });
};

// task.start(); //cron start

module.exports = Scheduler;