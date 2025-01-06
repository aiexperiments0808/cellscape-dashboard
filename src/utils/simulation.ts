import { IncubatorState, GrowthStage } from "../types/incubator";

const PLACEHOLDER_IMAGES = [
  "/cell-image-1.jpg",  // Add your image files to the public folder
  "/cell-image-2.jpg",  // and reference them here
  "/cell-image-3.jpg",
  "/cell-image-4.jpg",
  "/cell-image-5.jpg",
];

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * PLACEHOLDER_IMAGES.length);
  return PLACEHOLDER_IMAGES[randomIndex];
};

export const calculateGrowthStage = (confluence: number): GrowthStage => {
  if (confluence <= 25) return "Lag Phase";
  if (confluence <= 70) return "Exponential Phase";
  if (confluence <= 95) return "Stationary Phase";
  return "Death Phase";
};

export const simulateNewValues = (current: IncubatorState): Partial<IncubatorState> => {
  const randomFluctuation = (range: number) => (Math.random() - 0.5) * range;

  return {
    temperature: current.targetTemperature + randomFluctuation(0.2),
    humidity: current.targetHumidity + randomFluctuation(2),
    co2Level: current.targetCo2Level + randomFluctuation(0.2),
    confluence: Math.min(100, current.confluence + randomFluctuation(1) + 0.1),
    timeInIncubator: current.timeInIncubator + 5,
  };
};

export const calculateTimeToTarget = (currentConfluence: number): string => {
  if (currentConfluence >= 80) return "Target reached";
  const remainingConfluence = 80 - currentConfluence;
  const estimatedHours = Math.ceil(remainingConfluence / 0.5);
  return `~${estimatedHours} hours`;
};