/**
 * Created by cheese on 2017. 2. 9..
 */

const request = require('request');
const url = 'http://dormi.mokpo.ac.kr/www/bbs/board.php?bo_table=food';

const Bot = {};
const cheerio = require('cheerio');


Bot.choseMenu = (content, callback) => {
    
    switch (content) {
        case '교내식단':
            console.log('여기는 교내식단');
            Bot.diet((err, result) => {
                callback(err, result);
            });
            break;
        case '메뉴2':
            callback(null, {message: {text: '테스트 중입니다..'}});
            break;
        case '':
            break;
        default:
            break;
    }
};

Bot.diet = (callback) => {
    
    request.get(url, (err, res, html) => {
        
        if (!err && res.statusCode === 200) {
            let $ = cheerio.load(html);
            
            let diet = {
                breakfast: null,
                lunch: null,
                dinner: null
            };
            
            $('.tbline31 tr').each(function () {
                diet.breakfast = $(this).find("td").eq(0).text();
                diet.lunch = $(this).find("td").eq(1).text();
                diet.dinner = $(this).find("td").eq(2).text();
            });
            
            
            callback(null, {message: {text: diet}});
            
        } else {
            callback(err, {message: {text: '문제가 발생했습니다.'}});
        }
    });
};


module.exports = Bot;