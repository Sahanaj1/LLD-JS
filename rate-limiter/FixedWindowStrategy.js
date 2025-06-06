class FixedWindowStrategy {
    constructor(limit, windowMs) {
        this.limit = limit; // e.g., 100 requests
        this.windowMs = windowMs; // e.g., 10 * 60 * 1000 (10 min)
        this.requestMap = new Map(); // userId -> { count, windowStart }
    }

    isAllowed(userId) {
        const currentTime = Date.now();
        const record = this.requestMap.get(userId) || { count: 0, windowStart: currentTime };

        // If window expired, reset
        if (currentTime - record.windowStart >= this.windowMs) {
            record.count = 1;
            record.windowStart = currentTime;
        } else {
            record.count++;
        }

        this.requestMap.set(userId, record);

        return record.count <= this.limit;
    }
}

export default FixedWindowStrategy;
