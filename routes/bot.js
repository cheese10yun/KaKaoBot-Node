const
    express = require('express'),
    router = express.Router(),
    message = require('../service/message'),
    Bot = require('../service/BotService');

require('../databases/redis')(router); // redis

router.get('/keyboard', (req, res) => {
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(message.buttons()));
});

router.post('/message', (req, res) => {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    
    Bot.choseMenu(req, _obj.content, (err, result) => {
        if (!err) {
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
    const user_key = req.body.user_key;
    console.log(`${user_key}님이 쳇팅방에 참가했습니다.`);
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success:true}));
});

router.delete('/friend', (req, res) => {
    const user_key = req.body.user_key;
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
