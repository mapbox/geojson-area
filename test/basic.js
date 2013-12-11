var gjArea = require('../'),
    assert = require('assert');

describe('geojson area', function() {
    it('computes the area of illinois', function() {
        var ill = require('./illinois.json');
        assert.equal(gjArea(ill), 145978332359.37125);
    });
    // http://www.wolframalpha.com/input/?i=surface+area+of+earth
    it('computes the area of the world', function() {
        var all = require('./all.json');
        assert.equal(gjArea(all), 511207893395811.06);
    });
});
