const RedisDAO = {};

RedisDAO.getDiet = (reqCache, key, callback) => {
    return reqCache.get(key, callback);
};

RedisDAO.setDiet = (reqCache, key, value, callback) => {
    return reqCache.set(key, value, callback);
};


module.exports = RedisDAO;