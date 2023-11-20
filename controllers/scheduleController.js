const scheduleService = require('../services/scheduleService');

exports.loadHome = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const response = await scheduleService.loadHome(userId);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
    }
};

exports.createSchedule = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const scheduleData = req.body;
        await scheduleService.createSchedule(userId, scheduleData);
        res.status(201).send();
    } catch (err) {
        console.log(err);
    }
};

exports.showSchedules = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const date = req.query.date;
        const response = await scheduleService.showSchedules(userId, date);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
    }
};

exports.deleteSchedule = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const scheduleId = req.params.scheduleId;
        const option = req.body;
        await scheduleService.deleteSchedule(userId, scheduleId, option);
        res.status(200).send();
    } catch (err) {
        console.log(err);
    }
}