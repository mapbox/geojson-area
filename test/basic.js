var gjArea = require('../'),
    test = require('tape'),
    ill = require('./illinois.json'),
    all = require('./all.json');

test('geojson area', function(t) {
    t.test('computes the area of illinois', function(t) {
        t.equal(gjArea.geometry(ill), 145978332359.36746);
        t.end();
    });
    // http://www.wolframalpha.com/input/?i=surface+area+of+earth
    t.test('computes the area of the world', function(t) {
        t.equal(gjArea.geometry(all), 511207893395811.06);
        t.end();
    });
    t.test('point has zero area', function(t) {
        t.equal(gjArea.geometry({ type: 'Point', coordinates: [0,0] }), 0);
        t.end();
    });
    t.test('linestring has zero area', function(t) {
        t.equal(gjArea.geometry({ type: 'LineString', coordinates: [[0,0],[1,1]] }), 0);
        t.end();
    });
    t.test('geometrycollection is the sum', function(t) {
        t.equal(gjArea.geometry({ type: 'GeometryCollection', geometries: [all, ill] }), 511353871728170.44);
        t.end();
    });
    // From Turfjs/turf#2665
    t.test('area does not depend on the starting vertex', function(t) {
        var vertices = [
            [28.321755510202507, 16.35627490376781],
            [20.424575867090823, 1.7575215418945476],
            [48.254218513706036, 20.42650462625916],
            [36.310934132380964, 14.226760576846956]
        ];
        var expected = gjArea.ring(vertices.concat([vertices[0]]));
        for (var i = 1; i < vertices.length; i++) {
            var rotated = vertices.slice(i).concat(vertices.slice(0, i));
            t.equal(gjArea.ring(rotated.concat([rotated[0]])), expected);
        }
        t.end();
    });
    t.test('unclosed rings have the same area as closed rings', function(t) {
        var closedSquare = [[0,0],[1,0],[1,1],[0,1],[0,0]],
            closedTriangle = [[0,0],[1,0],[0,1],[0,0]];
        t.equal(gjArea.ring(closedSquare.slice(0, -1)), gjArea.ring(closedSquare));
        t.equal(gjArea.ring(closedTriangle.slice(0, -1)), gjArea.ring(closedTriangle));
        t.end();
    });
    t.test('closed ring with fewer than three distinct positions has zero area', function(t) {
        t.equal(gjArea.ring([[0,0],[1,1],[0,0]]), 0);
        t.end();
    });
    t.end();
});
