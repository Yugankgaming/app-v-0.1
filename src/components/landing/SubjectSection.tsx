import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Subject interface
interface Subject {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
}

export default function SubjectSection() {
  // Subject data
  const subjects: Subject[] = [
    {
      name: "Physics",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: "⚛️",
      description:
        "Track your physics study time with dedicated timers and access essential formulas for mechanics, thermodynamics, and more.",
    },
    {
      name: "Chemistry",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: "🧪",
      description:
        "Monitor your chemistry study sessions and quickly reference formulas for organic chemistry, periodic trends, and chemical reactions.",
    },
    {
      name: "Mathematics",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      icon: "📐",
      description:
        "Optimize your mathematics study time and access a comprehensive library of formulas for calculus, algebra, and geometry.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">
            Subjects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
            Specialized Support for Each Subject
          </h2>
          <p className="text-gray-600 max-w-[700px] mx-auto">
            Study Yugank provides tailored tools and resources for each subject
            with unique color coding to help you stay organized and focused.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <Card
              key={index}
              className={`border ${subject.borderColor} ${subject.bgColor} shadow-md hover:shadow-lg transition-shadow`}
            >
              <CardHeader>
                <div className="text-4xl mb-4">{subject.icon}</div>
                <CardTitle className={subject.color}>{subject.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{subject.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
