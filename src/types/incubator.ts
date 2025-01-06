export interface IncubatorState {
  temperature: number;
  targetTemperature: number;
  humidity: number;
  targetHumidity: number;
  co2Level: number;
  targetCo2Level: number;
  doorStatus: "Open" | "Closed";
  fanStatus: "ON" | "OFF";
  heaterStatus: "ON" | "OFF";
  confluence: number;
  timeInIncubator: number;
  lastImageUrl: string;
}

export interface EventLog {
  timestamp: Date;
  message: string;
  type: "info" | "warning" | "error" | "success";
}

export type GrowthStage = "Lag Phase" | "Exponential Phase" | "Stationary Phase" | "Death Phase";