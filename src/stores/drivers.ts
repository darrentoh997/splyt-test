import { defineStore } from "pinia";
import { getDrivers } from "@/apis/splytech";
import type { Coordinates } from "@/types/map";

// state interface
interface DriverState {
  drivers: any[];
  driversCount: number;
}

export const useDriverStore = defineStore("driver", {
  state: (): DriverState => ({
    drivers: [],
    driversCount: 1,
  }),
  actions: {
    async fetchDrivers(coordinates: Coordinates, driversCount: number) {
      this.drivers = await getDrivers(coordinates, driversCount);
      this.driversCount = driversCount;
    },
  },
});
