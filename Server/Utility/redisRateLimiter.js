import Redis from 'ioredis';

const redis = new Redis(); // defaults to localhost:6379
const MAX_TOKENS = 10;
const REFILL_RATE = 1; // tokens per second


async function rateLimiter(req, res, next) {
  const userId = req.user.id;
  const key = `rate_limit:${userId}`;
  const now = Date.now();

  // fetch bucket from Redis
  let bucket = await redis.get(key);

  if (!bucket) {
    // first request
    bucket = { tokens: MAX_TOKENS, lastRefill: now };
  } else {
    bucket = JSON.parse(bucket);
    const elapsed = now - bucket.lastRefill;
    const tokensToAdd = elapsed * (REFILL_RATE / 1000);
    bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    await redis.set(key, JSON.stringify(bucket));
    next();
  } else {
    await redis.set(key, JSON.stringify(bucket));
    res.status(429).send("Too Many Requests");
  }
}
