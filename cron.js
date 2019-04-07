const Const = require('./const.js');

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

// 日中
cron.schedule('0 0 11 * * *', () => {
    client.getDevice({host: Const.IPADDR_DAYTIME}).then((dev) => dev.setPowerState(true));
    client.getDevice({host: Const.IPADDR_NIGHT}).then((dev) => dev.setPowerState(false));
});

// 夜間
cron.schedule('0 30 23 * * *', () => {
    client.getDevice({host: Const.IPADDR_DAYTIME}).then((dev) => dev.setPowerState(false));
    client.getDevice({host: Const.IPADDR_NIGHT}).then((dev) => dev.setPowerState(true));
});