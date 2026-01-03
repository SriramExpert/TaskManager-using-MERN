const Task = require('../models/Task');
const { Op } = require('sequelize');

exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.create({
            title,
            description,
            status,
            userId: req.user.id
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getTaskStats = async (req, res) => {
    try {
        const stats = await Task.findAll({
            where: { userId: req.user.id },
            attributes: ['status', [Task.sequelize.fn('COUNT', Task.sequelize.col('status')), 'count']],
            group: ['status']
        });

        const formattedStats = {
            Todo: 0,
            'In Progress': 0,
            Completed: 0
        };

        stats.forEach(stat => {
            formattedStats[stat.getDataValue('status')] = parseInt(stat.getDataValue('count'));
        });

        res.json(formattedStats);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
