/**
 * Created by cheese on 2017. 2. 9..
 */

const
    request = require('request'),
    cheerio = require('cheerio'),
    async = require('async'),
    RedisDAO = require('../service/RedisDAO'),
    message = require('../service/message'),
    Bot = {};


const URL = {
    diet_normal: 'http://dormi.mokpo.ac.kr/www/bbs/board.php?bo_table=food',
    diet_BTL: 'http://dormi.mokpo.ac.kr/www/bbs/board.php?bo_table=food_btl'
};

const REDIS_KEYS = {
    diet_normal: 'BOT:DIET:NORMAL',
    diet_BTL: 'BOT:DIET:BTL',
};

// TODO 리턴 메시지들은 관리할것인가 아래 처럼 ? 아니면 별도로 구성 ??
Bot.choseMenu = (req, content, callback) => {
    
    switch (content) {
        case message.buttons[0]: //교내식단
            Bot.dietNormal(req, (err, result) => {
                callback(err, message.base(result));
            });
            break;
        case message.buttons[1]: //BTL식단
            Bot.dietBTL(req, (err, result)=>{
                callback(err, message.base(result));
            });
            break;
        case message.buttons[2]: //메뉴3
            callback(null, message.photo('테스트중', 'http://i.imgur.com/VyzToYw.jpg', '맥북 쿠폰받기', 'https://cheese10yun.github.io/'));
            break;
        default:
            callback(null, message.base('입력값이 올바르지 않습니다.'));
            break;
    }
};

Bot.dietNormal = (req, callback) => {
    const tasks = [
        (callback) => {
            RedisDAO.getByKey(req.cache, REDIS_KEYS.diet_normal, (err, cached) => {
                callback(err, JSON.parse(cached));
            });
        },
        
        (cached, callback) => {
            if (cached !== null) {
                callback(null, cached);
            } else {
                getDietNormalMenu(req, (err, result) => {
                    callback(err, result);
                });
            }
        }
    ];
    
    async.waterfall(tasks, (err, result) => {
        callback(err, result);
    });
};

Bot.dietBTL = (req, callback) => {
    
    const tasks = [
        (callback) =>{
            RedisDAO.getByKey(req.cache, REDIS_KEYS.diet_BTL, (err, cached) =>{
                callback(err, JSON.parse(cached));
            });
        },
        
        (cached, callback) => {
            if(cached !== null){
                console.log('from redis');
                callback(null, cached);
            }else{
                console.log('from parsing');
                getDietBTLMenu(req, (err, result)=>{
                    callback(err, result);
                });
            }
        }
    ];
    
    async.waterfall(tasks, (err, result)=>{
        callback(err, result)
    });
};

function getDietNormalMenu(req, callback) {
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
            
            RedisDAO.setByKey(req.cache, REDIS_KEYS.diet_normal, JSON.stringify(diet), (err, result) => {
                callback(null, diet);
            });
        } else {
            callback(err, null);
        }
    });
}

function getDietBTLMenu(req, callback) {
    
    request.get(URL.diet_BTL, (err, res, html) => {
        if (!err && res.statusCode === 200) {
            let $ = cheerio.load(html);
            let diet = null;
    
            $('.tbline31 tr').each(function () {
                diet = 'BTL식단\r\n';
                diet += '----------아침---------\r\n';
                diet += $(this).find("td").eq(0).text() + '\r\n';
                diet += '----------점심---------\r\n';
                diet += $(this).find("td").eq(1).text() + '\r\n';
                diet += '----------저녁---------\r\n';
                diet += $(this).find("td").eq(2).text();
            });
    
            RedisDAO.setByKey(req.cache, REDIS_KEYS.diet_BTL, JSON.stringify(diet), (err, result)=>{
                callback(err, diet);
            });
        } else {
            callback(err, null);
        }
    });
}


module.exports = Bot;