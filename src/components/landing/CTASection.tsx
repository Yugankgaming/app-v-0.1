import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, BookOpen } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="bg-gradient-to-r from-blue-50 via-green-50 to-red-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
              Ready to Boost Your Academic Performance?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-600">
              Join thousands of students who are already improving their study
              habits and test scores with Study Yugank.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
                >
                  Get Started Free
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Track Study Time</h3>
                <p className="text-gray-600 text-center">
                  Monitor your time spent on each subject with color-coded
                  timers
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">
                  Analyze Performance
                </h3>
                <p className="text-gray-600 text-center">
                  Visualize the correlation between study time and test scores
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">Access Formulas</h3>
                <p className="text-gray-600 text-center">
                  Quickly find and reference formulas for all your subjects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
