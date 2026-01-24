const buckets = new Map();

const MAX_TOKENS = 2;
const REFILL_RATE = 1; // token per second

function rateLimiter(req, res, next) {
  const userId = req.user.id;
  const now = Date.now();

  let bucket = buckets.get(userId);

  if (!bucket) {
    bucket = {
      tokens: MAX_TOKENS,
      lastRefill: now
    };
    buckets.set(userId, bucket);
  }

  const timePassed = now - bucket.lastRefill;
  const tokensToAdd = timePassed * (REFILL_RATE / 1000);

  bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + tokensToAdd);
  bucket.lastRefill = now;

  console.log({
  user: req.user.id,
  tokens: bucket.tokens.toFixed(2),
  time: new Date().toISOString()
});

setInterval(() => {
  const now = Date.now();
  for (const [userId, bucket] of buckets) {
    if (now - bucket.lastRefill > 10 * 60 * 1000) {
      buckets.delete(userId);
    }
  }
}, 5 * 60 * 1000);

  if (bucket.tokens >= 1) {
    bucket.tokens--;
    next();
  } else {
    res.status(429).json({ message: "Too many requests. Please try again later." });
  }
}

export default rateLimiter;
