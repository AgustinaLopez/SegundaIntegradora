const fileURLToPath = require('url');
const dirname = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Implementamos  Bcrypt
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) =>{
    return bcrypt.compareSync(password, user.password)
}

export const PRIVATE_KEY = "EcommerceSecretKeyJWT";
export const generateJWToken = (user) => {
    return jwt.sign({user}, PRIVATE_KEY, {expiresIn: '120s'});
};

//Strategy de Passport.
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({error: info.messages?info.messages:info.toString()});
            }
            req.user = user;
            next();
        })(req, res, next);
    }
};

module.exports = __dirname;