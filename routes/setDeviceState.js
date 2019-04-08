const Const = require('../const');
const exec  = require('child_process').exec;

var express = require('express');
var router = express.Router();

/* パラメータが足りない場合 */
router.get('/', function(req, res, next) {
    res.send("Usage: setDeviceState/[device name]/[on|off]");
    res.end();
});

/* パラメータがそろっている場合 */
router.get('/:dev/:st/', function(req, res, next) {
    if (!isValidParam(req, res)) return;

    var ipaddr;
    var status;

    if (req.params.dev === Const.DEV_NAME_DAYTIME) {
        ipaddr = Const.IPADDR_DAYTIME;
    } else if (req.params.dev === Const.DEV_NAME_NIGHT) {
        ipaddr = Const.IPADDR_NIGHT;
    }

    if (req.params.st === Const.DEV_STATUS_ON) {
        status = 'true';
    } else if (req.params.st === Const.DEV_STATUS_OFF) {
        status = 'false';
    }

    command = `node_modules/tplink-smarthome-api/lib/cli.js setPowerState ${ipaddr} ${status}`;

    exec(command, (err, stdout, stderr) => res.send("Device state changed."));
});

/**
 * 渡されたPathが使用可能か判定します。
 * @param {object} req
 * @param {object} res
 * @returns {boolean} 使用可能な場合true
 */
function isValidParam(req, res) {
    if (!(req.params.dev === Const.DEV_NAME_DAYTIME || req.params.dev === Const.DEV_NAME_NIGHT)
            || !(req.params.st  === Const.DEV_STATUS_ON || req.params.st  === Const.DEV_STATUS_OFF)) {
        res.send('invald params.');
        return false;
    }
    return true;
}

module.exports = router;
