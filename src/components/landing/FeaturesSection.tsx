import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp, BookOpen, Brain } from "lucide-react";

// Feature interface
interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

export default function FeaturesSection() {
  // Features data for Study Yugank
  const features: Feature[] = [
    {
      title: "Subject Timer Dashboard",
      description:
        "Track dedicated timers for Physics, Chemistry, and Mathematics with circular progress indicators and color-coding.",
      icon: <Clock className="h-10 w-10" />,
      color: "text-blue-600",
    },
    {
      title: "Performance Tracking",
      description:
        "Enter test scores and visualize trends showing correlation between study time and performance.",
      icon: <TrendingUp className="h-10 w-10" />,
      color: "text-green-600",
    },
    {
      title: "Formula Repository",
      description:
        "Access organized, searchable formulas by subject with LaTeX support for mathematical expressions.",
      icon: <BookOpen className="h-10 w-10" />,
      color: "text-red-600",
    },
    {
      title: "Smart Analytics",
      description:
        "Gain insights on study patterns and receive suggestions for improvements based on your performance data.",
      icon: <Brain className="h-10 w-10" />,
      color: "text-purple-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
            Everything You Need to Excel in Your Studies
          </h2>
          <p className="text-gray-600 max-w-[700px] mx-auto">
            Study Yugank combines powerful tools to help you manage your study
            time, track your performance, and access important formulas all in
            one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className={`mb-4 ${feature.color}`}>{feature.icon}</div>
                <CardTitle className="text-black">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
