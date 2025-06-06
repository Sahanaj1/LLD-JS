// index.js
import RateLimiter from "./RateLimiter.js";
import FixedWindowStrategy from "./FixedWindowStrategy.js";
import APIGateway from "./ApiGateway.js";

// Allow max 5 requests per 10 seconds
const fixedWindow = new FixedWindowStrategy(5, 10000);
const rateLimiter = new RateLimiter(fixedWindow);
const apiGateway = new APIGateway(rateLimiter);

const userId = "user123";

// Simulate 7 requests
for (let i = 0; i < 7; i++) {
    apiGateway.handleRequest(userId);
}
