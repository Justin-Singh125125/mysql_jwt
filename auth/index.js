const jwt = require('jsonwebtoken');

//a function that is going to act as our auth middleware
const authMiddleware = function () {

    //return an anonymous function that we are going to 
    //import into server.js
    return function (req, res, next) {

        //grab the token from the users cookies
        const token = req.cookies.token;

        if (token) {

            //extract out the id from jwt.verify
            const id = jwt.verify(token, process.env.APP_SECRET).id;

            //set the id onto the req.user obj
            req.user = id;
        }

        //once the code above is done, we will carry out the request
        next();
    }
}


module.exports = authMiddleware;