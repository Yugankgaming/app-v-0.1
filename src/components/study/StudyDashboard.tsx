import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, TrendingUp, BookOpen, Brain } from "lucide-react";
import SubjectTimerDashboard from "./SubjectTimerDashboard";
import PerformanceTracking from "./PerformanceTracking";
import FormulaRepository from "./FormulaRepository";

const StudyDashboard = () => {
  const [activeTab, setActiveTab] = useState("timers");

  return (
    <div className="p-6 bg-white min-h-screen">
      <Tabs
        defaultValue="timers"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Study Yugank</h1>
          <TabsList>
            <TabsTrigger value="timers" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Subject Timers
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="formulas" className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Formulas
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="timers" className="mt-0">
          <SubjectTimerDashboard />
        </TabsContent>

        <TabsContent value="performance" className="mt-0">
          <PerformanceTracking />
        </TabsContent>

        <TabsContent value="formulas" className="mt-0">
          <FormulaRepository />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyDashboard;
