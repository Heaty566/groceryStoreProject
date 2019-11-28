const jwt = require('jsonwebtoken');
const config = require('config');

authAd = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send("Invalid username or password");

    try {
        const decode = jwt.verify(token, config.get("app.secretKey"));
        if (!decode.isAdmin) throw new Error("");
        req.body = decode;
        next();
    } catch (err) {
        res.status(401).send("Invalid username or password");
    }
};

module.exports.authAd = authAd;