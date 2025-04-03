import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubjectTimer from "./SubjectTimer";
import { Clock, Atom, Calculator } from "lucide-react";
import { Beaker } from "lucide-react";

interface StudySession {
  subject: string;
  time: number;
  date: string;
}

interface SubjectTimerDashboardProps {
  initialSubject?: "Physics" | "Chemistry" | "Mathematics";
}

const SubjectTimerDashboard = ({
  initialSubject,
}: SubjectTimerDashboardProps = {}) => {
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [totalTime, setTotalTime] = useState({
    Physics: 0,
    Chemistry: 0,
    Mathematics: 0,
  });

  // Load study sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem("studySessions");
    if (savedSessions) {
      setStudySessions(JSON.parse(savedSessions));
    }

    // Calculate total time for each subject
    const savedTotalTime = localStorage.getItem("totalStudyTime");
    if (savedTotalTime) {
      setTotalTime(JSON.parse(savedTotalTime));
    }
  }, []);

  // Save study sessions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("studySessions", JSON.stringify(studySessions));
  }, [studySessions]);

  // Save total time to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("totalStudyTime", JSON.stringify(totalTime));
  }, [totalTime]);

  const handleTimeUpdate = (subject: string, time: number) => {
    setTotalTime((prev) => ({
      ...prev,
      [subject]: time,
    }));
  };

  const saveStudySession = (subject: string, time: number) => {
    if (time > 0) {
      const newSession: StudySession = {
        subject,
        time,
        date: new Date().toISOString(),
      };

      setStudySessions((prev) => [...prev, newSession]);
    }
  };

  // Format time as HH:MM:SS
  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate total study time across all subjects
  const calculateTotalTime = () => {
    return Object.values(totalTime).reduce((acc, curr) => acc + curr, 0);
  };

  // Filter sessions by subject if initialSubject is provided
  const filteredSessions = initialSubject
    ? studySessions.filter((session) => session.subject === initialSubject)
    : studySessions;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {initialSubject
            ? `${initialSubject} Timer`
            : "Subject Timer Dashboard"}
        </h2>
        <div className="bg-gray-100 px-4 py-2 rounded-md">
          <span className="text-sm font-medium text-gray-500">
            Total Study Time:
          </span>
          <span className="ml-2 font-bold">
            {initialSubject
              ? formatTime(totalTime[initialSubject])
              : formatTime(calculateTotalTime())}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {!initialSubject || initialSubject === "Physics" ? (
          <SubjectTimer
            subject="Physics"
            color="text-blue-600"
            bgColor="bg-blue-50"
            icon={<Atom className="h-6 w-6" />}
            initialTime={totalTime.Physics}
            onTimeUpdate={handleTimeUpdate}
          />
        ) : null}

        {!initialSubject || initialSubject === "Chemistry" ? (
          <SubjectTimer
            subject="Chemistry"
            color="text-green-600"
            bgColor="bg-green-50"
            icon={<Beaker className="h-6 w-6" />}
            initialTime={totalTime.Chemistry}
            onTimeUpdate={handleTimeUpdate}
          />
        ) : null}

        {!initialSubject || initialSubject === "Mathematics" ? (
          <SubjectTimer
            subject="Mathematics"
            color="text-red-600"
            bgColor="bg-red-50"
            icon={<Calculator className="h-6 w-6" />}
            initialTime={totalTime.Mathematics}
            onTimeUpdate={handleTimeUpdate}
          />
        ) : null}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {initialSubject
              ? `Recent ${initialSubject} Study Sessions`
              : "Recent Study Sessions"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSessions.length > 0 ? (
            <div className="space-y-2">
              {filteredSessions
                .slice(-5)
                .reverse()
                .map((session, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          session.subject === "Physics"
                            ? "bg-blue-500"
                            : session.subject === "Chemistry"
                              ? "bg-green-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span className="font-medium">{session.subject}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600">
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                      <span className="font-mono">
                        {formatTime(session.time)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No study sessions recorded yet. Start a timer to begin tracking!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectTimerDashboard;
