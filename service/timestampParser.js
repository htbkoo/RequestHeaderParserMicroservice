/**
 * Created by Hey on 11 Jun 2017
 */
var moment = require('moment');
var DATE_FORMAT = "MMMM D, YYYY";

// From https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt
function filterInt(value) {
    if (/^([-+])?([0-9]+|Infinity)$/.test(value))
        return Number(value);
    return NaN;
}

function isUnixTimeStamp(timestamp) {
    return !isNaN(filterInt(timestamp));
}

function isNaturalLanguageDate(timestamp) {
    return !isNaN(Date.parse(timestamp));
}

function toUnix(decodedTimestamp) {
    return moment.utc(decodedTimestamp, DATE_FORMAT).unix();
}

function toNatural(timestampInInt) {
    return moment.utc(moment.unix(timestampInInt)).format(DATE_FORMAT);
}


function createResponseJson(unix, natural) {
    return {
        "unix": unix,
        "natural": natural
    };
}

module.exports = function (timestamp) {
    if (isUnixTimeStamp(timestamp)) {
        var timestampInInt = filterInt(timestamp);
        return createResponseJson(timestampInInt, toNatural(timestampInInt));
    } else if (isNaturalLanguageDate(timestamp)) {
        var decodedTimestamp = decodeURI(timestamp);
        return createResponseJson(toUnix(decodedTimestamp), decodedTimestamp);
    } else {
        return "null";
    }
};