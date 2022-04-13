<template>
  <v-card :style="`height: ${height};`">
    <div id="map" />
  </v-card>
</template>

<script>
export default {
  name: 'GoogleMapsCenters',
  props: {
    centers: {
      type: Array,
      default () {
        return []
      }
    },
    height: {
      type: String,
      default () {
        return '90vh'
      }
    }
  },
  mounted () {
    this.drawMap()
  },
  methods: {
    drawMap () {
      const markers = this.centers.filter(e => e.location)
      const myStyle = [
        {
          featureType: 'administrative.neighborhood',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi.business',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'road.local',
          stylers: [
            {
              visibility: 'on'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        }
      ]
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: markers[0].location,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: myStyle
      })
      let marker
      for (let i = 0; i < markers.length; i++) {
        const element = markers[i]
        marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(element.location.lat, element.location.lng),
          map
        })
      }
      return marker
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
    width: 100%;
}
</style>
