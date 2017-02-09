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
    
    const menu ={
        type: 'buttons',
        buttons:["교내식단", "메뉴2", "메뉴3"]
    };
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(menu));
});

router.post('/message', (req, res) => {
    
    // TODO content 값이 이상한 값이라면 ?.
    // TODO 식단은 하루동안은 바뀌지 않기 떄문에 레디스에다가 케쉬해서 가져다 쓰자.
    
    
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    
    
    console.log(_obj);
    
    Bot.choseMenu(_obj.content, (err, result) => {
        if (!err) {
            res.set({
                'content-type': 'application/json'
            }).send(JSON.stringify({message: {text: result}}));
        } else {
            res.set({
                'content-type': 'application/json'
            }).send(JSON.stringify({message: {text: '문제가 발생했습니다.'}}));
        }
    });
});

router.post('/friend', (req, res)=>{
    const user_key = req.body.user_key;
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({message: {text: '환영 합니다.'}}));
    
    
});

router.delete('/friend', (req, res)=>{
    const user_key = req.body.user_key;
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({message: {text: '가지마ㅠㅠ'}}));
});

router.delete('/chat_room/:user_key', (req, res)=>{
    const user_key = req.params.user_key;
    
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({message: {text: '미워 ㅠㅠ'}}));
});


module.exports = router;
