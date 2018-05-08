declare module '@mapbox/geojson-area' {
  import { Geometry } from 'geojson';

  export function geometry(geo: Geometry): number;
}
