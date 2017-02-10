/**
 * Created by cheese on 2017. 2. 9..
 */

const
    request = require('request'),
    url = 'http://dormi.mokpo.ac.kr/www/bbs/board.php?bo_table=food',
    cheerio = require('cheerio'),
    async = require('async'),
    RedisDAO = require('../service/RedisDAO'),
    redis_key_diet = 'BOT:DIET',
    message = require('../service/message'),
    Bot = {};


// TODO 리턴 메시지들은 관리할것인가 아래 처럼 ? 아니면 별도로 구성 ??
Bot.choseMenu = (req, content, callback) => {
    
    switch (content) {
        case '교내식단':
            Bot.diet(req, (err, result) => {
                callback(err, message.base(result));
            });
            break;
        case '메뉴2':
            callback(null, message.photo('테스트중', 'http://i.imgur.com/VyzToYw.jpg', '맥북 쿠폰받기', 'https://cheese10yun.github.io/'));
            break;
        case '메뉴3':
            callback(null, message.base('메뉴3 테스트중'));
            break;
        default:
            callback(null, message.base('입력값이 올바르지 않습니다.'));
            break;
    }
};

Bot.diet = (req, callback) => {
    const tasks = [
        (callback) => {
            RedisDAO.getDiet(req.cache, redis_key_diet, (err, cached) => {
                callback(err, JSON.parse(cached));
            });
        },
        
        (cached, callback) => {
            if (cached !== null) {
                callback(null, cached);
            } else {
                GetDietMenu(req, (err, result) => {
                    callback(err, result)
                })
            }
        }
    ];
    async.waterfall(tasks, (err, result) => {
        callback(err, result);
    });
};

function GetDietMenu(req, callback) {
    
    request.get(url, (err, res, html) => {
        if (!err && res.statusCode === 200) {
            let $ = cheerio.load(html);
            let diet = null;
            
            $('.tbline31 tr').each(function () {
                diet = '----------아침---------\r\n';
                diet += $(this).find("td").eq(0).text() + '\r\n';
                diet += '----------점심---------\r\n';
                diet += $(this).find("td").eq(1).text() + '\r\n';
                diet += '----------저녁---------\r\n';
                diet += $(this).find("td").eq(2).text();
            });
            
            RedisDAO.setDiet(req.cache, redis_key_diet, JSON.stringify(diet), (err, result) => {
                callback(err, diet);
            });
        } else {
            callback(err, null);
        }
    });
};


module.exports = Bot;