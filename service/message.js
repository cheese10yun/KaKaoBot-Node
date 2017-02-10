/**
 * Created by cheese on 2017. 2. 10..
 */

let
    buttons =['교내식단', '메뉴2', '메뉴3'],
    message = {};

message.base={
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
        text: null,
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