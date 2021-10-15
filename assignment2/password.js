const fs = require('fs')
const crypto = require('crypto');

const password = fs.readFileSync('./password.txt').toString();

const encrypt = (salt, password) => {
    crypto.pbkdf2(password, salt.toString(), 1, 32, "sha512", (err, derivedKey)=>{
        if (err) throw err;
        const hashed = derivedKey.toString("hex");
        fs.writeFileSync('./hashed.txt', hashed);
    })
}

const salt = crypto.randomBytes(32).toString("hex");
encrypt(salt, password);