<template>
  <div class="slider-container">
    <input type="range" :min="min" :max="max" v-model="localSliderValue" @input="debouncedUpdateValue" />
    <div>{{ localSliderValue }} Drivers</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { debounce } from 'lodash';

const props = defineProps<{
  min: number;
  max: number;
  modelValue: number;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void;
}>();

const localSliderValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  localSliderValue.value = newValue;
});

const debouncedUpdateValue = debounce(() => {
  emit('update:modelValue', localSliderValue.value);
}, 500); 
</script>

<style scoped>
.slider-container {
  margin: 20px 0;
  text-align: center;
}

input[type="range"] {
  width: 100%;
}
</style>
