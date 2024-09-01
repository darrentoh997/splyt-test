import type { Coordinates } from "@/types/map";
import axios from "axios";

const useAxios = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getDrivers(
  coordinates: Coordinates,
  driversCount: number
) {
  try {
    const response = await useAxios.get("/api/drivers", {
      params: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        count: driversCount,
      },
    });
    return response.data.drivers;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    throw error;
  }
}
