const express = require('express');
//const REST = require('./API/REST');
const TaskTimer = require('tasktimer'); // TODO: https://www.npmjs.com/package/tasktimer

let timer = new TaskTimer(1);

const router = express.Router();
/*
router.get('/', function(req, res) {
    "use strict";
    REST.messages.get(req, res);
});
*/
router.post('/', function(req, res) {
    "use strict";
    //let timer = new TaskTimer(1);
    timer.addTask({
        name: req.body.title,
        tickInterval: req.body.ms, // TODO: ms is gap from now to then.
        totalRuns: 100,
        callback: function(task) {
            // TODO: task
            console.log(`${task.name} task has run ${task.currentRuns} times.`);
        }
    });
    console.log('timer:', timer);
    console.log('task:', timer.getTask(req.body.title));
    /*
     timer.on('tick', function () {
     console.log('tick count: ' + timer.tickCount);
     console.log('elapsed time: ' + timer.time.elapsed + ' ms.');
     // stop timer (and all tasks) after 1 hour
     if (timer.tickCount >= 3600000) timer.stop();
     });
     */
    timer.start();
    res.json({ protocol: 201 });
    //REST.messages.post(req, res);
});

router.delete('/', function(req, res) {
    "use strict";
    timer.getTask(req.body.title).stop();
    res.json({ protocol: 200 });
});

module.exports = router;