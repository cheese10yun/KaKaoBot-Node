const
    express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});


/**
 * Method : GET
 * URL : http(s)://:your_server_url/keyboard
 * Content-Type : application/json; charset=utf-8
 *
 * ex ) curl -XGET 'https://:your_server_url/keyboard'
 * {
 * "type" : "buttons",
 * "buttons" : ["선택 1", "선택 2", "선택 3"]
 * }
 */
//TODO ""로 반드시 감싸야 하는지?
router.get('/keyboard', (req, res) => {
    console.log('adasdasdasdasdas');
    res.json({
        "type": "buttons",
        "buttons": ["메뉴1", "메뉴2", "메뉴3"]
    })
});

/*
 Method : POST
 URL : http(s)://:your_server_url/message
 Content-Type : application/json; charset=utf-8
 Parameters
 
 필드명	타입	필수여부	설명
 user_key	String	Required	메시지를 발송한 유저 식별 키
 type	String	Required	text, photo
 content	String	Required	자동응답 명령어의 메시지 텍스트 혹은 미디어 파일 uri
 
 request ex )
 
 curl -XPOST 'https://:your_server_url/message' -d '{
     "user_key": "encryptedUserKey",
     "type": "text",
     "content": "차량번호등록"
 }'
 
 curl -XPOST 'https://your_server_url/message' -d '{
     "user_key": "encryptedUserKey",
     "type": "photo",
     "content": "http://photo_url/number.jpg"
 }'
 
 {
    "message":{
    "text" : "귀하의 차량이 성공적으로 등록되었습니다. 축하합니다!"
    }
 }
 
 Response ex )
 
 {
     "message": {
         "text": "귀하의 차량이 성공적으로 등록되었습니다. 축하합니다!",
         "photo": {
         "url": "https://photo.src",
         "width": 640,
         "height": 480
     },
     "message_button": {
         "label": "주유 쿠폰받기",
         "url": "https://coupon/url"
        }
     },
     "keyboard": {
         "type": "buttons",
         "buttons": [
            "처음으로",
            "다시 등록하기",
            "취소하기"
         ]
     }
 }
 

 */

router.post('/message', (req, res)=>{
    const _obj = {
        user_key: req.body.user_key,
        type:req.body.type,
        content: req.body.content
    };
    
    res.json({
        message:{
            text: '요청 결과 완료...'
        }
    })
});



module.exports = router;
