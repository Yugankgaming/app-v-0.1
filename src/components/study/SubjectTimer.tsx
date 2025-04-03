import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

interface SubjectTimerProps {
  subject: "Physics" | "Chemistry" | "Mathematics";
  color: string;
  bgColor: string;
  icon?: React.ReactNode;
  initialTime?: number; // in seconds
  onTimeUpdate?: (subject: string, time: number) => void;
}

const SubjectTimer = ({
  subject,
  color,
  bgColor,
  icon = <Clock />,
  initialTime = 0,
  onTimeUpdate = () => {},
}: SubjectTimerProps) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Format time as HH:MM:SS
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate progress percentage (assuming 4 hours = 100%)
  const calculateProgress = () => {
    const maxTime = 4 * 60 * 60; // 4 hours in seconds
    return Math.min((time / maxTime) * 100, 100);
  };

  useEffect(() => {
    let interval: number | null = null;

    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          onTimeUpdate(subject, newTime);
          return newTime;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, subject, onTimeUpdate]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const handlePause = () => {
    setIsRunning(false);
    setStartTime(null);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setStartTime(null);
    onTimeUpdate(subject, 0);
  };

  return (
    <Card
      className={`border ${bgColor} shadow-md hover:shadow-lg transition-shadow`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className={color}>{subject}</CardTitle>
          <div className={color}>{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            {/* Circular progress background */}
            <div className="absolute inset-0 rounded-full bg-gray-200"></div>

            {/* Circular progress indicator */}
            <svg className="absolute inset-0" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="46"
                cx="50"
                cy="50"
              />
              <circle
                className={color.replace("text-", "text-")}
                strokeWidth="8"
                strokeDasharray={`${calculateProgress() * 2.89}, 289`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="46"
                cx="50"
                cy="50"
                transform="rotate(-90 50 50)"
              />
            </svg>

            {/* Timer display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{formatTime(time)}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                size="sm"
                className={`${color.replace("text-", "bg-")} hover:${color.replace("text-", "bg-")}/90 text-white`}
              >
                <Play className="h-4 w-4 mr-1" /> Start
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                size="sm"
                variant="outline"
                className={`border-${color.replace("text-", "")} ${color}`}
              >
                <Pause className="h-4 w-4 mr-1" /> Pause
              </Button>
            )}
            <Button
              onClick={handleReset}
              size="sm"
              variant="outline"
              className="border-gray-300"
            >
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectTimer;
