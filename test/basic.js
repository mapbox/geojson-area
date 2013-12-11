var gjArea = require('../'),
    assert = require('assert');

describe('geojson area', function() {
    it('computes the area of illinois', function() {
        var ill = require('./illinois.json');
        assert.equal(gjArea(ill), 145978332359.37125);
    });
});
