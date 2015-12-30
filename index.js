var wgs84 = require('wgs84');

module.exports.geometry = geometry;
module.exports.ring = ringArea;

function geometry(_) {
    var area = 0, i;
    switch (_.type) {
        case 'Polygon':
            return polygonArea(_.coordinates);
        case 'MultiPolygon':
            for (i = 0; i < _.coordinates.length; i++) {
                area += polygonArea(_.coordinates[i]);
            }
            return area;
        case 'Point':
        case 'MultiPoint':
        case 'LineString':
        case 'MultiLineString':
            return 0;
        case 'GeometryCollection':
            for (i = 0; i < _.geometries.length; i++) {
                area += geometry(_.geometries[i]);
            }
            return area;
    }
}

function polygonArea(coords) {
    var area = 0;
    if (coords) {
        for (var i = 0; i < coords.length; i++) {
            area += ringArea(coords[i]);
        }
    }
    return area;
}

/**
 * Calculate the approximate area of the polygon were it projected onto
 *     the earth.  Note that this area will be positive if ring is oriented
 *     clockwise, otherwise it will be negative.
 *
 * Reference:
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 *     Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 *     Laboratory, Pasadena, CA, June 2007 http://trs-new.jpl.nasa.gov/dspace/handle/2014/40409
 *
 * Returns:
 * {float} The approximate signed geodesic area of the polygon in square
 *     meters.
 */

function ringArea(coords) {
    var p1, p2, p3;
    var area = 0;
    var coordsLength = coords.length;

    if (coordsLength > 2) {
        for (i = 0; i < coordsLength - 1; i++) {
            if (i === coordsLength - 2) {// i = N-2
                p1 = coordsLength - 2;
                p2 = coordsLength -1;
                p3 = 1;
            } else { // i = 0 to N-3
                p1 = i;
                p2 = i+1;
                p3 = i+2;
            }
            area += (rad(coords[p3][0]) - rad(coords[p1][0]) ) * Math.sin(rad(coords[p2][1]));
        }
    }

    return area * wgs84.RADIUS * wgs84.RADIUS / 2;
}

function rad(_) {
    return _ * Math.PI / 180;
}
