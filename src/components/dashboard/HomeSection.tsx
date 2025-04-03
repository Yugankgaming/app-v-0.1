import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, TrendingUp, BookOpen } from "lucide-react";

const HomeSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome to Study Yugank
        </h2>
        <Button variant="outline" size="sm" className="gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-600">
              <Clock className="h-5 w-5 mr-2" />
              Subject Timers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Track your study time for Physics, Chemistry, and Mathematics with
              dedicated timers.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              Go to Timers
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-600">
              <TrendingUp className="h-5 w-5 mr-2" />
              Performance Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Monitor your test scores and see the correlation with your study
              time.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              View Performance
            </Button>
          </CardContent>
        </Card>

        <Card className="border-red-100 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-red-600">
              <BookOpen className="h-5 w-5 mr-2" />
              Formula Repository
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Access organized formulas for Physics, Chemistry, and Mathematics.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Browse Formulas
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-white rounded-md border border-gray-100">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">Physics study session</p>
              <p className="text-sm text-gray-500">
                2 hours 15 minutes - Today
              </p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-white rounded-md border border-gray-100">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Chemistry test score added</p>
              <p className="text-sm text-gray-500">85% - Yesterday</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-white rounded-md border border-gray-100">
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
              <BookOpen className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="font-medium">Mathematics formula accessed</p>
              <p className="text-sm text-gray-500">Calculus - 2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
