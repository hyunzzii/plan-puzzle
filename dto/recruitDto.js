const db = require('../models/index');
const Recruit = db.Recruit;
const User = db.User;

exports.toRecruit = async (recruitData) => {
    const {
        title,
        content,
        owner,
        regionFirst,
        regionSecond,
        peopleNum,
        startDate,
        endDate,
        timeCategory,
        startTime,
        endTime,
        color,
        userId,
        imagePath
    } = recruitData;

    const recruit = await Recruit.create({
        title: title,
        content: content,
        peopleNum: peopleNum,
        regionFirst: regionFirst,
        regionSecond: regionSecond,
        startDate: startDate,
        endDate: endDate || null,
        timeCategory: timeCategory,
        startTime: startTime || null,
        endTime: endTime || null,
        color: color,
        owner: owner,
        WriterId: userId,
        ...(imagePath && {imagePath: imagePath})
    });

    const user = await User.findByPk(userId);
    recruit.addUsers(user);
}

exports.fromRecruit = async (recruit) => {
    const {
        id:id,
        title,
        content,
        peopleNum,
        participateNum,
        regionFirst,
        regionSecond,
        startDate,
        endDate,
        timeCategory,
        startTime,
        endTime,
        color,
        state,
        imagePath,
        owner,
        WriterId
    } = recruit;

    let nickname;

    if (owner === 'User') {
        const user = await User.findByPk(WriterId);
        nickname = user.nickname;
    } else {
        //owner가 채널일 경우, 채널의 닉네임 추가해줘야 함
    }

    return {
        id:id,
        title: title,
        content: content,
        peopleNum: peopleNum,
        participateNum: participateNum,
        regionFirst: regionFirst,
        regionSecond: regionSecond,
        startDate: startDate,
        endDate: endDate,
        timeCategory: timeCategory,
        startTime: startTime,
        endTime: endTime,
        state: state,
        color: color,
        Writer: nickname,
        imagePath: imagePath
    }
}
