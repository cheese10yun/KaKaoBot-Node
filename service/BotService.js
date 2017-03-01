/**
 * Created by cheese on 2017. 2. 9..
 */

const
  request = require('request'),
  cheerio = require('cheerio'),
  async = require('async'),
  RedisDAO = require('../service/RedisDAO'),
  message = require('../service/message'),
  test = require('../service/CronService'),
  Bot={};


Bot.choseMenu = (req, content, callback) => {
  
  switch (content) {
    case message.buttons[0]: //교내식단
      test.test();
        callback(null, message.baseType('asdasd'));
      // RedisDAO.getByKey(req.cache, RedisDAO.key_diet_normal, (err, result) => {
      //   callback(err, message.baseType(JSON.parse(result)));
      // });
      break;
    case message.buttons[1]: //BTL식단
      RedisDAO.getByKey(req.cache, RedisDAO.key_diet_BTL, (err, result) => {
        callback(err, message.baseType(JSON.parse(result)));
      });
      break;
    case message.buttons[2]: //하교 광주
      callback(null, message.messageButtonType(getSongJeongSchedule(), '링크를 클릭하시면 시간표가 보입니다.', 'http://i.imgur.com/71CHVU2.png'));
      break;
    case message.buttons[3]: //하교 목포
      callback(null, message.messageButtonType('하교[목포권 노선 23편(학교버스 5편/도서관 차량 포함), 일로권 1편 운행]', '링크를 클릭하시면 시간표가 보입니다.', 'http://i.imgur.com/QU66mjA.png'));
      break;
    case message.buttons[4]: //기능추가요청
      callback(null, message.messageButtonType('버그 및 추가기능 요청', '링크를 클릭해서 등록해주세요.', 'https://github.com/cheese10yun/Node-Boot/issues'));
      break;
    default:
      callback(null, message.baseType('올바른 입력값이 아닙니다.'));
      break;
  }
};

function getSongJeongSchedule() {
  let schedule;
  
  schedule = '출발시간  |  운행노선\r\n';
  schedule += '(1) | 16:00  |  송정역\r\n';
  schedule += '(2) | 17:30  |  송정역 ⇒ 송정동파출소 ⇒ 호남대 ⇒ 추선회관\r\n';
  schedule += '(3)(4) | 18:20  |  송정역 ⇒ 송정동파출소 ⇒ 세정아울렛건너편 ⇒ 호남대 ⇒ 추선회관 ⇒ 상록회관\r\n';
  schedule += '(5)(6) |  18:10 |   남부대학교 ⇒ 첨단서라A 신가주공5단지 ⇒ 신가주공1단지 ⇒ 신가사거리 ⇒ 신창동우체국\r\n';
  schedule += '(7) | 18:20  |  월곡동부영A ⇒ 어등산약국 ⇒ 농수산물유통센터 ⇒ 현진에버빌A  ⇒ 수완2차우미린A노선 추가\r\n';
  schedule += '(8) | 18:10  |  서광주우체국 ⇒ 염주체육관 ⇒ 금호지구중흥A\r\n';
  schedule += '(9) | 20:00  |  송정역 ⇒ 송정동파출소 ⇒ 호남대 ⇒ 추선회관\r\n';
  
  return schedule;
}


module.exports = Bot;