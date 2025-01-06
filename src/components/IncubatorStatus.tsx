import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IncubatorState } from "@/types/incubator";
import { calculateGrowthStage, calculateTimeToTarget } from "@/utils/simulation";

interface IncubatorStatusProps {
  state: IncubatorState;
}

export const IncubatorStatus = ({ state }: IncubatorStatusProps) => {
  const growthStage = calculateGrowthStage(state.confluence);
  const timeToTarget = calculateTimeToTarget(state.confluence);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4 bg-black/20 border-incubator-accent1/20">
        <h3 className="text-lg font-semibold text-incubator-accent1 mb-4">
          Environment Status
        </h3>
        <div className="space-y-3">
          <StatusItem
            label="Temperature"
            value={`${state.temperature.toFixed(1)}°C`}
            target={`${state.targetTemperature}°C`}
          />
          <StatusItem
            label="Humidity"
            value={`${state.humidity.toFixed(0)}%`}
            target={`${state.targetHumidity}%`}
          />
          <StatusItem
            label="CO2 Level"
            value={`${state.co2Level.toFixed(1)}%`}
            target={`${state.targetCo2Level}%`}
          />
        </div>
      </Card>

      <Card className="p-4 bg-black/20 border-incubator-accent1/20">
        <h3 className="text-lg font-semibold text-incubator-accent1 mb-4">
          Culture Status
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-incubator-text/80">Confluence</span>
              <span className="text-incubator-accent1">
                {state.confluence.toFixed(1)}%
              </span>
            </div>
            <Progress value={state.confluence} className="h-2" />
          </div>
          <StatusItem
            label="Growth Stage"
            value={growthStage}
            className="text-incubator-accent2"
          />
          <StatusItem
            label="Time in Incubator"
            value={`${Math.floor(state.timeInIncubator / 3600)}h ${Math.floor((state.timeInIncubator % 3600) / 60)}m`}
          />
          <StatusItem
            label="Time to Target"
            value={timeToTarget}
          />
        </div>
      </Card>
    </div>
  );
};

interface StatusItemProps {
  label: string;
  value: string;
  target?: string;
  className?: string;
}

const StatusItem = ({ label, value, target, className }: StatusItemProps) => (
  <div className="flex justify-between items-center">
    <span className="text-sm text-incubator-text/80">{label}</span>
    <div className="text-right">
      <span className={className || "text-incubator-accent1"}>{value}</span>
      {target && (
        <span className="text-sm text-incubator-text/60 ml-2">
          (Target: {target})
        </span>
      )}
    </div>
  </div>
);