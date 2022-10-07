<script setup lang="ts">
// import Mappa from 'mappa-mundi'
import 'leaflet/dist/leaflet.css'
import { LGeoJson, LMap } from '@vue-leaflet/vue-leaflet'
// const key = 'AIzaSyCF-selxrirXvEJNZRUNfgqVfbROunkX8k'

// Create an instance of Google.
// const mappa = new Mappa('Google', key)

// Options for map
// const options = {
//   lat: 0,
//   lng: 0,
//   zoom: 2,
//   width: 640,
//   height: 500,
//   scale: 1,
//   format: 'PNG',
//   language: 'en',
//   maptype: 'satellite',
// }
const geojsonOptions = ref({
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: {
      shape: 'Rectangle',
      name: 'Unnamed Layer',
      category: 'default',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-95.265208, 32.307053],
          [-95.264323, 32.307053],
          [-95.264323, 32.308209],
          [-95.265208, 32.308209],
          [-95.265208, 32.307053],
        ],
      ],
    },
    id: '3d9a5399-0d4f-4a32-aa76-5de7a556089a',
  }],

})
// Create the static map reference.
// const myMap = mappa.staticMap(options)

// let img
// let meteorites

// function preload() {
//   // Load the image
//   img = loadImage(myMap.imgUrl)
//   // Load the data
//   meteorites = loadTable('assets/data/Meteorite_Landings.csv', 'csv', 'header')
// }
const geojson = ref([{
  type: 'LineString',
  coordinates: [[-100, 40], [-105, 45], [-110, 55]],
}, {
  type: 'LineString',
  coordinates: [[-105, 40], [-110, 45], [-115, 55]],
}])
const mapisready = ref(false)
const myLines = [{
  type: 'LineString',
  coordinates: [[-100, 40], [-105, 45], [-110, 55]],
}, {
  type: 'LineString',
  coordinates: [[-105, 40], [-110, 45], [-115, 55]],
}]

const myStyle = {
  color: '#ff7800',
  weight: 5,
  opacity: 0.65,
}
onBeforeMount(async () => {
  // HERE is where to load Leaflet components!
  const { circleMarker } = await import('leaflet/dist/leaflet-src.esm')
  // And now the Leaflet circleMarker function can be used by the options:
  // geojsonOptions.value.pointToLayer = (feature, latLng) =>
  //   circleMarker(latLng, { radius: 8 })
  mapisready.value = true
})
</script>

<!-- AIzaSyCF-selxrirXvEJNZRUNfgqVfbROunkX8k -->
<template>
  <l-map :center="[-95.264924, 32.306835]" style="height:50vh">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <!-- <l-geo-json :geojson="geojson" :options="geojsonOptions" /> -->
  </l-map>
</template>
