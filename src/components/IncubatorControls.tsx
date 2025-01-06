import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Power, 
  DoorOpen,
  Camera 
} from "lucide-react";
import { IncubatorState } from "@/types/incubator";

interface IncubatorControlsProps {
  state: IncubatorState;
  onUpdateTarget: (key: keyof IncubatorState, value: number) => void;
  onToggle: (key: "doorStatus" | "fanStatus" | "heaterStatus") => void;
  onCaptureImage: () => void;
}

export const IncubatorControls = ({
  state,
  onUpdateTarget,
  onToggle,
  onCaptureImage,
}: IncubatorControlsProps) => {
  return (
    <div className="space-y-6 p-4 bg-black/20 rounded-lg">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-incubator-accent1">
          Environment Controls
        </h3>
        
        {/* Temperature Control */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-incubator-text/80">
            <Thermometer className="h-4 w-4 text-incubator-accent1" />
            <span>Target Temperature: {state.targetTemperature}°C</span>
          </div>
          <Slider
            value={[state.targetTemperature]}
            min={30}
            max={40}
            step={0.1}
            onValueChange={([value]) => onUpdateTarget("targetTemperature", value)}
            className="w-full"
          />
        </div>

        {/* Humidity Control */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-incubator-text/80">
            <Droplets className="h-4 w-4 text-incubator-accent1" />
            <span>Target Humidity: {state.targetHumidity}%</span>
          </div>
          <Slider
            value={[state.targetHumidity]}
            min={40}
            max={80}
            step={1}
            onValueChange={([value]) => onUpdateTarget("targetHumidity", value)}
            className="w-full"
          />
        </div>

        {/* CO2 Control */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-incubator-text/80">
            <Wind className="h-4 w-4 text-incubator-accent1" />
            <span>Target CO2: {state.targetCo2Level}%</span>
          </div>
          <Slider
            value={[state.targetCo2Level]}
            min={2}
            max={10}
            step={0.1}
            onValueChange={([value]) => onUpdateTarget("targetCo2Level", value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-incubator-accent1">
          System Controls
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={state.doorStatus === "Closed" ? "default" : "destructive"}
            onClick={() => onToggle("doorStatus")}
            className="w-full"
          >
            <DoorOpen className="h-4 w-4 mr-2" />
            {state.doorStatus}
          </Button>

          <Button
            variant={state.fanStatus === "ON" ? "default" : "secondary"}
            onClick={() => onToggle("fanStatus")}
            className="w-full"
          >
            <Wind className="h-4 w-4 mr-2" />
            Fan: {state.fanStatus}
          </Button>

          <Button
            variant={state.heaterStatus === "ON" ? "default" : "secondary"}
            onClick={() => onToggle("heaterStatus")}
            className="w-full"
          >
            <Power className="h-4 w-4 mr-2" />
            Heater: {state.heaterStatus}
          </Button>

          <Button
            variant="secondary"
            onClick={onCaptureImage}
            className="w-full"
          >
            <Camera className="h-4 w-4 mr-2" />
            Capture
          </Button>
        </div>
      </div>
    </div>
  );
};