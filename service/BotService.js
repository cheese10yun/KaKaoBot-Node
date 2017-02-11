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
    diet_BTL: 'BOT:DIET:BTL'
};

// TODO 리턴 메시지들은 관리할것인가 아래 처럼 ? 아니면 별도로 구성 ??
Bot.choseMenu = (req, content, callback) => {
    
    switch (content) {
        case '교내식단': //교내식단
            Bot.dietNormal(req, (err, result) => {
                callback(err, message.base(result));
            });
            break;
        case 'BTL식단': //BTL식단
            Bot.dietBTL(req, (err, result)=>{
                callback(err, message.base(result));
            });
            break;
        case '하교광주권': //메뉴3
            // http://i.imgur.com/u9t9RYO.png
            callback(null, message.message_button(getSongJeongSchedule(), '링크를 클릭하시면 시간표가 보입니다.', 'http://i.imgur.com/71CHVU2.png'));
            break;
        case '하교목포권': //메뉴3
            callback(null, message.message_button('하교[목포권 노선 23편(학교버스 5편/도서관 차량 포함), 일로권 1편 운행]', '링크를 클릭하시면 시간표가 보입니다.', 'http://i.imgur.com/QU66mjA.png'));
            break;
        case '기능추가요청': //메뉴3
            callback(null, message.message_button('버그 및 추가기능 요청', '링크를 클릭해서 등록해주세요.', 'https://github.com/cheese10yun/Node-Boot/issues'));
            break;
        default:
            callback(null, message.base(getSongJeongSchedule()));
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
                callback(null, cached);
            }else{
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
                callback(err, diet);
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

function getSongJeongSchedule() {
    let schedule ;
    
    schedule = '출발시간  |  운행노선\r\n';
    schedule +='(1) | 16:00  |  송정역\r\n';
    schedule +='(2) | 17:30  |  송정역 ⇒ 송정동파출소 ⇒ 호남대 ⇒ 추선회관\r\n';
    schedule +='(3)(4) | 18:20  |  송정역 ⇒ 송정동파출소 ⇒ 세정아울렛건너편 ⇒ 호남대 ⇒ 추선회관 ⇒ 상록회관\r\n';
    schedule +='(5)(6) |  18:10 |   남부대학교 ⇒ 첨단서라A 신가주공5단지 ⇒ 신가주공1단지 ⇒ 신가사거리 ⇒ 신창동우체국\r\n';
    schedule +='(7) | 18:20  |  월곡동부영A ⇒ 어등산약국 ⇒ 농수산물유통센터 ⇒ 현진에버빌A  ⇒ 수완2차우미린A노선 추가\r\n';
    schedule +='(8) | 18:10  |  서광주우체국 ⇒ 염주체육관 ⇒ 금호지구중흥A\r\n';
    schedule +='(9) | 20:00  |  송정역 ⇒ 송정동파출소 ⇒ 호남대 ⇒ 추선회관\r\n';
    
    return schedule;
}


module.exports = Bot;