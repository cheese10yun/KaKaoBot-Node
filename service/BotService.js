/**
 * Created by cheese on 2017. 2. 9..
 */

const request = require('request');
const url = 'http://dormi.mokpo.ac.kr/www/bbs/board.php?bo_table=food';
const Bot = {};
const cheerio = require('cheerio');
const message = require('../service/message');

// TODO 리턴 메시지들은 관리할것인가 아래 처럼 ? 아니면 별도로 구성 ??
Bot.choseMenu = (content, callback) => {
    
    switch (content) {
        case '교내식단':
            Bot.diet((err, result) => {
                message.bases.message.text = result;
                callback(err, message.bases);
            });
            break;
        case '메뉴2':
            message.photo.message.text = '테스트중';
            message.photo.message.photo.url = 'http://i.imgur.com/VyzToYw.jpg';
            message.photo.message.message_button.label = '맥북 쿠폰받기';
            message.photo.message.message_button.url = 'https://cheese10yun.github.io/';
            callback(null, message.photo);
            break;
        case '':
            break;
        default:
            message.bases.text = '입력이 제대로 입력해주세요';
            callback(null, message.bases);
            break;
    }
};

Bot.diet = (callback) => {
    
    request.get(url, (err, res, html) => {
        
        if (!err && res.statusCode === 200) {
            let $ = cheerio.load(html);
            
            let diet = null;
            
            $('.tbline31 tr').each(function () {
                diet = '----------아침---------\r\n';
                diet +=$(this).find("td").eq(0).text() +'\r\n';
                diet +='----------점심---------\r\n';
                diet += $(this).find("td").eq(1).text()+'\r\n';
                diet +='----------저녁---------\r\n';
                diet += $(this).find("td").eq(2).text();
            });
            
            callback(null, diet);
            
        } else {
            callback(err, '다시 시도해주세요');
        }
    });
};


module.exports = Bot;