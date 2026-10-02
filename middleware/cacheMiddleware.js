let cache = {};
const TTL_MS = 60 * 1000;

function cacheMiddleware(req, res, next) {
  if (req.method !== "GET") {
    return next();
  }

  const key = req.originalUrl;
  const now = Date.now();

  if (cache[key]) {
    const cachedEntry = cache[key];
    const isExpired = now - cachedEntry.createdAt > TTL_MS;

    if (!isExpired) {
      res.setHeader("X-Cache", "HIT");
      return res.json(cachedEntry.data);
    }

    delete cache[key];
  }

  res.setHeader("X-Cache", "MISS");

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache[key] = {
        data: body,
        createdAt: Date.now(),
      };
    }
    return originalJson(body);
  };

  next();
}

function clearCache() {
  cache = {};
}

module.exports = {
  cacheMiddleware,
  clearCache,
};
