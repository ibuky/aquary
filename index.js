const cron = require('node-cron');
const { Client } = require('tplink-smarthome-api');

/*
 * ┌────────────── second (optional)
 * │ ┌──────────── minute
 * │ │ ┌────────── hour
 * │ │ │ ┌──────── day of month
 * │ │ │ │ ┌────── month
 * │ │ │ │ │ ┌──── day of week
 * *  *  *  *  *  *
 */

const client = new Client();

const host = {
    daytime : '192.168.11.51',  // 日中用
    night   : '192.168.11.52',  // 夜間用
}

// 日中
cron.schedule('0 0 11 * * *', () => {
    client.getDevice({host: host.daytime}).then((dev) => dev.setPowerState(true));
    client.getDevice({host: host.night}).then((dev) => dev.setPowerState(false));
});

// 夜間
cron.schedule('0 30 23 * * *', () => {
    client.getDevice({host: host.daytime}).then((dev) => dev.setPowerState(false));
    client.getDevice({host: host.night}).then((dev) => dev.setPowerState(true));
});