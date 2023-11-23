// middlewares/authHandler.js
const db = require('../models/index');
const User = db.User;

const checkAuth = async (req, res, next) => {
    const {user} = req.session;
    if (!user) {
        res.status(401).send("로그인이 필요합니다.");
    }

    const findUserId = await User.findOne({
        where: {'userId': user.userId}
    });

    if (findUserId === null) {
        res.status(401).send("로그인이 필요합니다.");
    }
    req.user.id = findUserId.id;
    next();
}

module.exports = checkAuth;