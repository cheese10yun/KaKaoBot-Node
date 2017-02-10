/**
 * Created by cheese on 2017. 2. 10..
 */

let
    buttons =['교내식단', '메뉴2', '메뉴3'],
    message = {};

message.bases={
    message: {
        text: null,
    },
    keyboard: {
        type: 'buttons',
        buttons: buttons
    }
};

message.photo = {
    message: {
        text: '귀하의 차량이 성공적으로 등록되었습니다. 축하합니다!',
        photo: {
            url: null,
            width: 640,
            height: 480
        },
        message_button: {
            label: null,
            url: null,
        }
    },
    keyboard: {
        type: 'buttons',
        buttons: buttons
    }
};


module.exports = message;