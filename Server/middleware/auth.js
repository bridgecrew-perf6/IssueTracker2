const jwt = require("jsonwebtoken")

exports.loginRequired = async function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
            jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
                if(payload) {
                    return next()
                } else {
                    return next({
                        status: 401,
                        message: "please login first"
                    })
                }
            })
    } catch (err) {
        return next({
            status: 401,
            message: "please login first"
        })
    }
}

//jwt.verify
exports.ensureCorrectUser = async function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]
            jwt.verify(token, process.env.SECRET_KEY, function(err, payload) {
                if(payload && payload.id === req.params.id) {
                    return next()
                } else {
                    return next({
                        status: 401,
                        message: "unauthorized"
                    })
                }
            })
    } catch (err) {
        return next({
            status: 401,
            message: "unauthorized"
        })
    }
}

