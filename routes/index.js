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
    res.json({
        "type": "buttons",
        "buttons": ["교내식단", "메뉴2", "메뉴3"]
    })
});

router.post('/message', (req, res) => {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    
    
    
    let results = null;
    
    switch (_obj.content) {
        case "교내식단":
            Bot.diet((err, result)=>{
                if(!err){
                    res.json({
                        message: {
                            text: result
                        }
                    });
                }else{
                }
            });
            break;
        case '':
            break;
        case '':
            break;
        default:
            break;
    }
    
    
    
    
});


module.exports = router;
