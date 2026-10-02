const { clearCache } = require("./cacheMiddleware");

function invalidateCacheMiddleware(req, res, next) {
  const originalJson = res.json.bind(res);

  res.json = (body) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      clearCache();
    }
    return originalJson(body);
  };

  next();
}

module.exports = invalidateCacheMiddleware;
