<template>
  <main style="width: 1280px">
    <Map :center="centerMap" :driver-count="driverStore.driversCount" :zoom-level="14" />
    <Slider v-model="driverStore.driversCount" :min="1" :max="50" />
  </main>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import Map from '@/components/Map.vue';
import Slider from '@/components/Slider.vue';
import { useDriverStore } from '@/stores/drivers';
import type { Coordinates } from '@/types/map';

const driverStore = useDriverStore();

const centerMap: Coordinates = {
  latitude: 37.394,
  longitude: 127.11
};

// Fetch drivers when the driver count changes
watch(() => driverStore.driversCount, (newCount) => {
  driverStore.fetchDrivers(centerMap, newCount);
}, { immediate: true });
</script>