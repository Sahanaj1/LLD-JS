import URLMapping from "./UrlMapping.js";
import Base62Encoder from "./Base62Encoder.js";

class URLRepository {
    constructor() {
        this.shortToLong = new Map(); // shortCode => URLMapping
        this.longToShort = new Map(); // longURL => shortCode (optional, for deduplication)
        this.counter = 1;
        this.encoder = new Base62Encoder(); // only one encoder instance
    }

    save(longURL) {
        // Optional: check if URL already shortened
        if (this.longToShort.has(longURL)) {
            const shortCode = this.longToShort.get(longURL);
            return this.shortToLong.get(shortCode);
        }

        const shortCode = this.encoder.encode(this.counter++);
        const mapping = new URLMapping(shortCode, longURL);
        this.shortToLong.set(shortCode, mapping);
        this.longToShort.set(longURL, shortCode); // optional
        return mapping;
    }

    find(shortCode) {
        return this.shortToLong.get(shortCode);
    }
}

export default URLRepository;
