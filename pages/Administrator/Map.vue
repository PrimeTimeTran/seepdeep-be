<script setup>
import * as GMaps from '@googlemaps/js-api-loader'
const { Loader } = GMaps
definePageMeta({
  layout: 't-main-layout',
})

const loader = new Loader({
  apiKey: 'AIzaSyDo3so2R7VF4U2IjcC8fNo-HQM-7TJcrR0',
  version: 'weekly',
})

const mapOptions = {
  zoom: 12,
  center: { lat: 37.7749, lng: -122.4194 },
}

loader
  .importLibrary('maps')
  .then(({ Map }) => {
    new Map(document.getElementById('map'), mapOptions)
  })
  .catch((e) => {})
async function getDirections() {
  try {
    const response = await fetch('/api/googleDirections?origin=Florida&destination=California')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

function initMap() {
  const directionsService = new google.maps.DirectionsService()
  const directionsRenderer = new google.maps.DirectionsRenderer()
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: { lat: 37.7749, lng: -122.4194 },
  })
  directionsRenderer.setMap(map)

  const waypoints = [
    { location: { placeId: 'ChIJvypWkWV2wYgR0E7HW9MTLvc' } },
    { location: { placeId: 'ChIJPV4oX_65j4ARVW8IJ6IJUYs' } },
  ]

  const request = {
    origin: 'Starting Point',
    destination: 'End Point',
    waypoints: waypoints,
    travelMode: 'DRIVING',
  }

  directionsService.route(request, function (response, status) {
    if (status === 'OK') {
      directionsRenderer.setDirections(response)
    } else {
      window.alert('Directions request failed due to ' + status)
    }
  })
}
</script>
<template>
  <div id="map" class="w-screen h-screen"></div>
</template>
