class APIGateway {
    constructor(rateLimiter) {
        this.rateLimiter = rateLimiter;
    }

    handleRequest(userId) {
        if (this.rateLimiter.isAllowed(userId)) {
            console.log(`✅ API call allowed for user: ${userId}`);
        } else {
            console.log(`❌ Rate limit exceeded for user: ${userId}`);
        }
    }
}

export default APIGateway;
