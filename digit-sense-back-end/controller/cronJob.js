var cron = require('node-cron');

exports.cronJob = () => {
    // cron.schedule('0 0 * * *', () => {
    //     console.log('running a task every day on 00:00');
    // });
    cron.schedule('*/10 * * * * *', () => {
        // console.log(new Date(),'running a task every 10 s');
        // updateSchedule()
    });
}
