<template>
  <div ref="mapContainer" class="map"></div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { useDriverStore } from '@/stores/drivers';
import type { Coordinates } from '@/types/map';

const props = defineProps<{
  center: Coordinates;
  driverCount: number;
  zoomLevel: number;
}>();

const mapContainer = ref<HTMLDivElement | null>(null);
const driverStore = useDriverStore();

const markers = computed((): Coordinates[] => {
  if (driverStore.drivers) {
    return driverStore.drivers.map(driver => driver.location);
  }
  return [];
});

let map: L.Map;
let leafletMarkers: L.Marker[] = [];

const initMap = () => {
  if (mapContainer.value) {
    map = L.map(mapContainer.value).setView([props.center.latitude, props.center.longitude], props.zoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const centerIcon = L.icon({
      iconUrl: '/icon/location-red.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    L.marker([props.center.latitude, props.center.longitude], { icon: centerIcon })
      .bindTooltip('Center Location', { permanent: false, direction: 'top' })
      .addTo(map);
  }
};

const updateMarkers = () => {
  if (map) {
    leafletMarkers.forEach(marker => map?.removeLayer(marker));
    leafletMarkers = [];

    markers.value.forEach((marker) => {
      const leafletMarker = L.marker([marker.latitude, marker.longitude]).addTo(map);
      leafletMarkers.push(leafletMarker);
    });
  }
};

onMounted(() => {
  initMap();
  updateMarkers();
});

watch(markers, () => {
  updateMarkers();
}, { immediate: true });
</script>

<style scoped>
.map {
  width: 100%;
  height: 500px;
}
</style>
