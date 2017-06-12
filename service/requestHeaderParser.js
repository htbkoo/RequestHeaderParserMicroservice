/**
 * Created by Hey on 12 Jun 2017
 */
function getLanguageFromHeaders(headers) {
    return headers['accept-language'].split(',')[0];
}
function getSoftwareFromHeaders(headers) {
    return /.*\((.*)\)/.exec(headers['user-agent'])[1];
}
module.exports = function (request) {
    var headers = request.headers;
    var language = getLanguageFromHeaders(headers);
    var software = getSoftwareFromHeaders(headers);
    var ipaddress = headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;

    return {
        language: language,
        software: software,
        ipaddress: ipaddress
    }
};