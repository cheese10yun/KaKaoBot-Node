/**
 * Created by cheese on 2017. 2. 9..
 */

const
  message = require('../service/message'),
  Bot = {};

Bot.choseMenu = (content) => {
  let result_message;
  switch (content) {
    case message.buttons[0]:
      result_message = message.baseType('메뉴1를 선택했습니다.');
      break;
    case message.buttons[1]:
      result_message = message.messageButtonType('메뉴2를 선택했습니다.', '라벨입니다.', 'https://cheese10yun.github.io/');
      break;
    case message.buttons[2]:
      result_message = message.photoType('메뉴3를 선택했습니다.', 'http://i.imgur.com/tvuH0ZJ.png', '라벨입니다', 'https://cheese10yun.github.io/');
      break;
    case message.buttons[3]:
      result_message = message.baseType('메뉴4를 선택했습니다.');
      break;
    case message.buttons[4]:
      result_message = message.baseType('메뉴5를 선택했습니다.');
      break;
    default:
      result_message = message.baseType('해당 메뉴가 없습니다.');
      break;
  }
  
  return result_message;
};

module.exports = Bot;