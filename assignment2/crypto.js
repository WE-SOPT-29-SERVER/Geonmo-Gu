const { SSL_OP_ALL } = require("constants");
const crypto = require("crypto");

// const password = "serveristhebest";

// const hex = crypto.createHash("sha512").update(password).digest('hex');

// const base64 = crypto.createHash("sha512").update(password).digest('base64'); 

// console.log("hex: ", hex);
// console.log("base64: ", base64);

// const salt = "QxLUF1bglAdeQXbv5PehSMfV11CdYYLmfY6lehjZMQ";
// const iteration = 1000000;
// const keylen = 64;
// const digest = "sha512";
// const callback = (err, derivedKey) => {
//     if (err) throw err;
//     console.log(derivedKey.tostring("hex"));
// };
// crypto.pbkdf2(password, salt, iteration, keylen, digest, callback);

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 1, 32, "sha512", (err, derivedKey)=>{
        if (err) throw err;
        const hashed = derivedKey.toString("hex");
        console.log("salt: ", salt);
        console.log("hashed :", hashed);
    })
};

const password = "1234";
const salt = crypto.randomBytes(32).toString("hex");
encrypt(salt, password);
