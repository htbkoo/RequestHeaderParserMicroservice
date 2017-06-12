/**
 * Created by Hey on 11 Jun 2017
 */
var test = require('chai');
var format = require('string-format');

var timestampParser = require('../timestampParser');

describe("timestampParser", function () {
    [
        {
            "input": "0",
            "expectedResponse": {
                "unix": 0,
                "natural": "January 1, 1970"
            }
        },
        {
            "input": "1",
            "expectedResponse": {
                "unix": 1,
                "natural": "January 1, 1970"
            }
        },
        {
            "input": "86399",
            "expectedResponse": {
                "unix": 86399,
                "natural": "January 1, 1970"
            }
        },
        {
            "input": "86400",
            "expectedResponse": {
                "unix": 86400,
                "natural": "January 2, 1970"
            }
        }
    ].forEach(function (params) {
        it(format("should return {} for {} which is a unix timestamp", JSON.stringify(params.expectedResponse), params.input), function () {
            //    given
            //    when
            var response = timestampParser(params.input);

            //    then
            test.expect(response).to.deep.equal(params.expectedResponse);
        });
    });
    [
        {
            "input": "January 1, 2016",
            "expectedResponse": {
                "unix": 1451606400,
                "natural": "January 1, 2016"
            }
        },
        {
            "input": "January 1, 1970",
            "expectedResponse": {
                "unix": 0,
                "natural": "January 1, 1970"
            }
        },
        {
            "input": "January 2, 1970",
            "expectedResponse": {
                "unix": 86400,
                "natural": "January 2, 1970"
            }
        }
    ].forEach(function (params) {
        it(format("should return {} for {} which is a natural language date", JSON.stringify(params.expectedResponse), params.input), function () {
            //    given
            //    when
            var response = timestampParser(params.input);

            //    then
            test.expect(response).to.deep.equal(params.expectedResponse);
        });
    });

    [
        "some broken string",
        "123a"
    ].forEach(function (str) {
        it(format("should return null for {} which is not unix timestamp nor natural language date", str), function () {
            //    given
            //    when
            var response = timestampParser(str);

            //    then
            test.expect(response).to.equal("null");
        });
    });
});