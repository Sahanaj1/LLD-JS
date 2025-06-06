class Base62Encoder {
    constructor() {
        this.charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    encode(num) {
        if (num === 0) return this.charset[0];
        let result = "";
        while (num > 0) {
            result = this.charset[num % 62] + result;
            num = Math.floor(num / 62);
        }
        return result;
    }
}

export default Base62Encoder;
