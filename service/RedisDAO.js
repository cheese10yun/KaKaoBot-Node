const RedisDAO = {};

RedisDAO.getByKey = (reqCache, key, callback) => {
    return reqCache.get(key, callback);
};

RedisDAO.setByKey = (reqCache, key, value, callback) => {
    return reqCache.set(key, value, callback);
};

RedisDAO.deleteByKeyPattern = (reqCache, key, callback) =>{
    reqCache.keys(key, (err, keyList)=>{
        return reqCache.del(keyList, callback);
    });
};
module.exports = RedisDAO;