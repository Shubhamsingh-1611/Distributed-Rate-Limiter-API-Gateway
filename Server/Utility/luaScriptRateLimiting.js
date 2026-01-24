import Redis from "ioredis";
const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1", // or "redis" if using Docker Compose
  port: process.env.REDIS_PORT || 6379
});

const MAX_TOKENS = process.env.MAX_TOKENS || 10; // maximum number of requests
const REFILL_RATE = process.env.REFILL_RATE || 1; // tokens per second

const script = `
local key = KEYS[1]
local now = tonumber(ARGV[1])
local max_tokens = tonumber(ARGV[2])
local refill_rate = tonumber(ARGV[3])

local bucket = redis.call("GET", key)
if not bucket then
    bucket = {tokens=max_tokens, lastRefill=now}
else
    bucket = cjson.decode(bucket)
    local elapsed = now - bucket.lastRefill
    local tokens_to_add = elapsed * refill_rate / 1000
    bucket.tokens = math.min(max_tokens, bucket.tokens + tokens_to_add)
    bucket.lastRefill = now
end

if bucket.tokens >= 1 then
    bucket.tokens = bucket.tokens - 1
    redis.call("SET", key, cjson.encode(bucket))
    return 1
else
    redis.call("SET", key, cjson.encode(bucket))
    return 0
end
`;

async function rateLimiter(req, res, next) {
  const userId = req.user.id;
  const now = Date.now();
  console.log("Rate Limiter Invoked for User:", userId);

  const allowed = await redis.eval(script, 1, `rate_limit:${userId}`, now, MAX_TOKENS, REFILL_RATE);
   console.log(`User ${userId} allowed:`, allowed);
  if (allowed === 1) {
    next();
  } else {
    res.status(429).send("Too Many Requests");
  }
}
export default rateLimiter;