const express = require('express');
const router = express.Router();
const Notification = require('../models').Notification;

router.get('/notifications/:id', (req, res) => {
    if (!req.params.id)
        return res.status(400).json({ success: false, error: "One of request parameters missing" });
    Notification.find({ device_id: req.params.id }, (err, result) => {
        if (err)
            return res.status(400).json({ success: false, error: JSON.stringify(err) });
        return res.status(200).json(result);

    });
});

router.post('/notifications', (req, res) => {
    if (!req.body.device_id || !req.body.game_text || !req.body.game_id || !req.body.time) {
        return res.status(400).json({ success: false, error: "One of request parameters missing" });
    }
    const notification = new Notification({
        device_id: req.body.device_id,
        game_text: req.body.game_text,
        game_id: req.body.game_id,
        created_at: new Date(),
        time: new Date(req.body.time)
    });

    notification.save((err) => {
        if (err)
            return res.status(400).json({ success: false, error: JSON.stringify(err) });

        return res.status(200).json({ success: true, error: '' });
    });

});

router.delete('/notifications', (req, res) => {
    if (!req.body.device_id || !req.body.game_id) {
        return res.status(400).json({ success: false, error: "One of request parameters missing" });
    }
    Notification.findOneAndRemove({ $and: [{ device_id: req.body.device_id, game_id: req.body.game_id }] }, err => {
        if (err)
            return res.status(400).json({ success: false, error: JSON.stringify(err) });

        return res.status(200).json({ success: true, error: '' });

    });
});

module.exports = router;