class RateLimiter {
    constructor(strategy) {
        this.strategy = strategy;
    }

    isAllowed(userId) {
        return this.strategy.isAllowed(userId);
    }
}

export default RateLimiter;