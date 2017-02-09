const
    express = require('express'),
    router = express.Router(),
    Bot = require('../service/BotService');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

//TODO ""로 반드시 감싸야 하는지?
router.get('/keyboard', (req, res) => {
    
    const menu = {
        type: 'buttons',
        buttons: ["교내식단", "메뉴2", "메뉴3"]
    };
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(menu));
});

// TODO content 값이 이상한 값이라면 ?.
// TODO 식단은 하루동안은 바뀌지 않기 떄문에 레디스에다가 케쉬해서 가져다 쓰자.
router.post('/message', (req, res) => {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    
    Bot.choseMenu(_obj.content, (err, result) => {
        if (!err) {
            console.log(result.message.text);

            res.set({
                'content-type': 'application/json'
            }).send(JSON.stringify(result));
        } else {
            res.set({
                'content-type': 'application/json'
            }).send(JSON.stringify(result));
        }
    });
});

router.post('/friend', (req, res) => {
    const
        user_key = req.body.user_key;
    
    console.log(`${user_key}님이 쳇팅방에 참가했습니다.`);
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
});

router.delete('/friend', (req, res) => {
    const
        user_key = req.body.user_key;
    
    console.log(`${user_key}님이 쳇팅방을 차단했습니다.`);
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
});

router.delete('/chat_room/:user_key', (req, res) => {
    const user_key = req.params.user_key;
    
    console.log(`${user_key}님이 쳇팅방에서 나갔습니다.`);
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
});


module.exports = router;
