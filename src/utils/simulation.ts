import { IncubatorState, GrowthStage } from "../types/incubator";

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
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