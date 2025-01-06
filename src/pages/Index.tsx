import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { IncubatorControls } from "@/components/IncubatorControls";
import { IncubatorStatus } from "@/components/IncubatorStatus";
import { IncubatorChart } from "@/components/IncubatorChart";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { IncubatorState } from "@/types/incubator";
import { simulateNewValues, getRandomImage } from "@/utils/simulation";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  
  // Initialize incubator state
  const [state, setState] = useState<IncubatorState>({
    temperature: 37,
    targetTemperature: 37,
    humidity: 55,
    targetHumidity: 55,
    co2Level: 5,
    targetCo2Level: 5,
    doorStatus: "Closed",
    fanStatus: "OFF",
    heaterStatus: "OFF",
    confluence: 20,
    timeInIncubator: 0,
    lastImageUrl: getRandomImage(),
  });

  // Simulate environment changes
  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        ...simulateNewValues(prev),
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Auto update image
  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        lastImageUrl: getRandomImage(),
      }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleUpdateTarget = (key: keyof IncubatorState, value: number) => {
    setState((prev) => ({ ...prev, [key]: value }));
    toast({
      title: "Target Updated",
      description: `New ${key} target: ${value}`,
    });
  };

  const handleToggle = (key: "doorStatus" | "fanStatus" | "heaterStatus") => {
    setState((prev) => ({
      ...prev,
      [key]: key === "doorStatus"
        ? prev[key] === "Open" ? "Closed" : "Open"
        : prev[key] === "ON" ? "OFF" : "ON",
    }));
  };

  const handleCaptureImage = () => {
    setState((prev) => ({
      ...prev,
      lastImageUrl: getRandomImage(),
    }));
    toast({
      title: "Image Captured",
      description: "New image has been captured successfully",
    });
  };

  return (
    <div className="min-h-screen bg-incubator-bg">
      <Header onToggleSidebar={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 p-4">
        <div className="max-w-[1920px] mx-auto space-y-4">
          <div className="grid lg:grid-cols-[30%_1fr] gap-4">
            <div className="space-y-4">
              <IncubatorControls
                state={state}
                onUpdateTarget={handleUpdateTarget}
                onToggle={handleToggle}
                onCaptureImage={handleCaptureImage}
              />
              <IncubatorStatus state={state} />
            </div>

            <div className="space-y-4">
              <IncubatorChart currentState={state} />
              
              <Card className="p-4 bg-black/20 border-incubator-accent1/20">
                <h3 className="text-lg font-semibold text-incubator-accent1 mb-4">
                  Last Captured Image
                </h3>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={state.lastImageUrl}
                    alt="Last captured"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;