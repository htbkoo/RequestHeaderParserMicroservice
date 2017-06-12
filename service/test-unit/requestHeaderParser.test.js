/**
 * Created by Hey on 12 Jun 2017
 */
var test = require('chai');

var requestHeaderParser = require('../requestHeaderParser');

describe("requestHeaderParser", function () {
    var mockRequest;

    beforeEach(function () {
        mockRequest = {
            headers: {
                "host": "localhost:3000",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0",
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "accept-language": "en-US,en;q=0.5",
                "accept-encoding": "gzip, deflate",
                "dnt": "1",
                "connection": "keep-alive",
                "upgrade-insecure-requests": "1",
                "cache-control": "max-age=0"
            }
        };
    });

    it("should return parsed headers information, given mock information", function () {
        //    given
        var mockIpAddress = "192.168.1.1";
        var expectedResponse = {
            ipaddress: mockIpAddress,
            language: "en-US",
            software: "Windows NT 10.0; WOW64; rv:53.0"
        };
        mockRequest.headers['x-forwarded-for'] = mockIpAddress;

        //    when
        var response = requestHeaderParser(mockRequest);

        //    then
        test.expect(response).to.deep.equal(expectedResponse);
    });

    it("should parse ipaddress from req.connection.remoteAddress", function () {
        //    given
        var mockIpAddress = "192.168.1.1";
        mockRequest.connection = {
            "remoteAddress": mockIpAddress
        };

        //    when
        var response = requestHeaderParser(mockRequest);

        //    then
        test.expect(response.ipaddress).to.equal(mockIpAddress);
    });

    it("should parse ipaddress from req.socket.remoteAddress", function () {
        //    given
        var mockIpAddress = "192.168.1.1";
        mockRequest.connection = {};
        mockRequest.socket = {
            "remoteAddress": mockIpAddress
        };

        //    when
        var response = requestHeaderParser(mockRequest);

        //    then
        test.expect(response.ipaddress).to.equal(mockIpAddress);
    });
    it("should parse ipaddress from req.connection.socket.remoteAddress", function () {
        //    given
        var mockIpAddress = "192.168.1.1";
        mockRequest.socket = {};
        mockRequest.connection = {
            socket: {
                "remoteAddress": mockIpAddress
            }
        };

        //    when
        var response = requestHeaderParser(mockRequest);

        //    then
        test.expect(response.ipaddress).to.equal(mockIpAddress);
    });
});