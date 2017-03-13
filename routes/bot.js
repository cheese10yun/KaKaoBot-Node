const express = require('express');
const router = express.Router();
const message = require('../service/message');
const CronService = require('../service/CronService');
const Bot = require('../service/BotService');

require('../databases/redis')(router); // redis

const checkUserKey = (req, res, next)=>{
  if(req.body.user_key !== undefined){
    next();
  }else{
    res.status(500).send({ error: 'user_key is undefined' });
  }
};

router.get('/keyboard', (req, res) => {
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(message.buttonsType()));
});

router.post('/message', checkUserKey, (req, res) => {
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
      }).send(JSON.stringify(message.baseType('다시 시도해주세요')));
    }
  });
});

router.post('/friend', checkUserKey, (req, res) => {
  const user_key = req.body.user_key;
  console.log(`${user_key}님이 쳇팅방에 참가했습니다.`);
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});

router.delete('/friend', checkUserKey, (req, res) => {
  const user_key = req.body.user_key;
  console.log(`${user_key}님이 쳇팅방을 차단했습니다.`);
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});

router.delete('/chat_room/:user_key', checkUserKey, (req, res) => {
  const user_key = req.params.user_key;
  console.log(`${user_key}님이 쳇팅방에서 나갔습니다.`);
  
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify({success: true}));
});

module.exports = router;
