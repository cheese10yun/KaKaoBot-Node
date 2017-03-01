const RedisDAO = {};

RedisDAO.key_diet_normal = 'BOT:DIET:NORMAL';
RedisDAO.key_diet_BTL = 'BOT:DIET:BTL';
RedisDAO.keys_pattern = 'BOT:DIET:*';

RedisDAO.getByKey = (reqCache, key, callback) => {
  return reqCache.get(key, callback);
};

RedisDAO.setByKey = (reqCache, key, value, callback) => {
  return reqCache.set(key, value, callback);
};

RedisDAO.deleteByKeyPattern = (reqCache, key, callback) => {
  reqCache.keys(key, (err, keyList) => {
    return reqCache.del(keyList, callback);
  });
};
module.exports = RedisDAO;