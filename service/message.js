/**
 * Created by cheese on 2017. 2. 10..
 */

let message = {};

message.buttons= ['교내식단', 'BTL식단', '메뉴3'];

message.base = (text)=>{
    return {
        message: {
            text: text,
        },
        keyboard: {
            type: 'buttons',
            buttons: message.buttons
        }
    }
};

message.photo = (text, url_photo, label, url_button)=>{
    return{
        message: {
            text: text,
            photo: {
                url: url_photo,
                width: 640,
                height: 480
            },
            message_button: {
                label: label,
                url: url_button,
            }
        },
        keyboard: {
            type: 'buttons',
            buttons: message.buttons
        }
    }
};

module.exports = message;