import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, Brain, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <div>
              <Badge className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">
                Smart Academic Companion
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Study Yugank
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600">
              A comprehensive study assistance app that helps students track
              their subject-wise study time while providing performance
              analytics and a formula repository for quick reference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:border-gray-500 hover:text-black w-full sm:w-auto"
                >
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="h-4 w-4 text-black" />
              <span>Track study time</span>
              <Separator
                orientation="vertical"
                className="h-4 mx-2 bg-gray-300"
              />
              <CheckCircle2 className="h-4 w-4 text-black" />
              <span>Performance analytics</span>
              <Separator
                orientation="vertical"
                className="h-4 mx-2 bg-gray-300"
              />
              <CheckCircle2 className="h-4 w-4 text-black" />
              <span>Formula repository</span>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-blue-200/60 via-green-400/40 to-red-300/40 rounded-3xl blur-2xl transform scale-110" />
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-t-xl">
                <div className="flex items-center gap-2 px-3 py-1">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div className="ml-2 text-xs text-white font-medium">
                    Study Yugank
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-blue-600">Physics</h3>
                      <p className="text-sm text-gray-600">2h 15m today</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-600">Chemistry</h3>
                      <p className="text-sm text-gray-600">1h 45m today</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-red-600">Mathematics</h3>
                      <p className="text-sm text-gray-600">3h 30m today</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Total study time today
                      </span>
                      <span className="text-lg font-bold">7h 30m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-200/60 blur-[100px]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-red-200/40 blur-[100px]" />
    </section>
  );
}
