class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;           // max requests
    this.windowMs = windowMs;     // time window in ms
    this.tokens = new Map();      // store tokens per key
  }

  isAllowed(key) {
    const now = Date.now();

    if (!this.tokens.has(key)) {
      this.tokens.set(key, { tokens: this.limit - 1, lastRefill: now });
      return true;
    }

    let bucket = this.tokens.get(key);
    let elapsed = now - bucket.lastRefill;
    let refillRate = this.limit / this.windowMs;

    // Refill tokens based on time passed
    let refillAmount = Math.floor(elapsed * refillRate);
    bucket.tokens = Math.min(this.limit, bucket.tokens + refillAmount);
    bucket.lastRefill += refillAmount / refillRate;

    if (bucket.tokens > 0) {
      bucket.tokens--;
      this.tokens.set(key, bucket);
      return true;
    }

    return false;
  }
}

// Example Usage in Express.js middleware
const limiter = new RateLimiter(100, 10 * 60 * 1000); // 100 reqs per 10 min

function rateLimitMiddleware(req, res, next) {
  const ip = req.ip;

  if (!limiter.isAllowed(ip)) {
    return res.status(429).send("Too Many Requests");
  }

  next();
}
