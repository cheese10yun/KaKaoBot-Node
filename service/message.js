/**
 * Created by cheese on 2017. 2. 10..
 */

let message = {};

const buttons= ['교내식단', 'BTL식단', '통근버스송정', '메뉴3'];

message.buttons =()=>{
    return {
        type: 'buttons',
        buttons: buttons
    }
};

message.base = (text)=>{
    return {
        message: {
            text: text,
        },
        keyboard: {
            type: 'buttons',
            buttons: buttons
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
            buttons: buttons
        }
    }
};

message.message_button = (text, label, url_button)=>{
    return{
        message: {
            text: text,
            message_button: {
                label: label,
                url: url_button,
            }
        },
        keyboard: {
            type: 'buttons',
            buttons: buttons
        }
    }
};

module.exports = message;