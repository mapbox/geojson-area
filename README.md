# geojson-area

Calculate the area inside of any [GeoJSON](http://geojson.org/) geometry.

## usage

    npm install @mapbox/geojson-area

## example

```js
var geojsonArea = require('@mapbox/geojson-area');

var area = geojsonArea.geometry(obj);
```

## api

### `geojsonArea.geometry(obj)`

Given a Geometry object, return contained
area as square meters. Invalid input will return `null`.

Adapted from [OpenLayers](http://openlayers.org/)

## publishing

Pull Requests to `main` automatically publish a new version based on the PR's title prefix (`major:`, `minor:` or `patch:`) to the npmjs registry.

The published version in the registry is the source of truth for the package version, but you can manually increment the `package.json`'s `version`.

### pre-release versions on other branches

For testing in downstream projects, you can manually trigger the "NPM release" workflow on a branch to publish a pre-release tagged with the short commit sha (e.g. `0.2.2-aa79c6a`) under the npm `prerelease` dist-tag, without affecting `latest`. Check the workflow results for the published version.
