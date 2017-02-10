/**
 * Created by cheese on 2017. 2. 9..
 */

const request = require('request');
const url = 'http://dormi.mokpo.ac.kr/www/bbs/board.php?bo_table=food';

const Bot = {};
const cheerio = require('cheerio');

let menu = {
    message: {
        text: null,
    },
    keyboard: {
        type: 'buttons',
        buttons: ["교내식단", "메뉴2", "메뉴3"]
    }
};
Bot.choseMenu = (content, callback) => {
    
    switch (content) {
        case '교내식단':
            Bot.diet((err, result) => {
                menu.message.text = result;
                callback(err, menu);
            });
            break;
        case '메뉴2':
            // menu.message.photo ={
            //     url: "http://i.imgur.com/VyzToYw.jpg",
            //     width: 640,
            //     heigh: 480
            // };
            // menu.message.message_button ={
            //     label: "맥북받기 쿠폰받기",
            //     url: "https://cheese10yun.github.io/"
            // };
            // menu.message.text = '테스트 중입니다.';
            
            
            let test = {
                message: {
                    text: "테스트 중입니다.",
                    photo: {
                        url: "http://i.imgur.com/VyzToYw.jpg",
                        width: 640,
                        heigh: 480
                    },
                    message_button: {
                        "label": "맥북받기 쿠폰받기",
                        "url": "https://cheese10yun.github.io/"
                    }
                },
                keyboard: {
                    type: "buttons",
                    buttons: ["교내식단", "메뉴2", "메뉴3"]
                }
            };
            
            console.log(test);
            callback(null, test);
            break;
        case '':
            break;
        default:
            menu.message.text = '선택하신 메뉴는 존재하지 않습니다.';
            callback(null, menu);
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