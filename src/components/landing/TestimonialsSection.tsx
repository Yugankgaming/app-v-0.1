import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  role: string;
  school: string;
  content: string;
  avatar: string;
  subject: string;
  subjectColor: string;
}

export default function TestimonialsSection() {
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "12th Grade Student",
      school: "Delhi Public School",
      content:
        "Study Yugank has transformed how I prepare for my physics exams. The timer helps me stay focused, and the formula repository is a lifesaver during revision.",
      avatar: "priya",
      subject: "Physics",
      subjectColor: "text-blue-600",
    },
    {
      id: 2,
      name: "Rahul Verma",
      role: "11th Grade Student",
      school: "St. Xavier's High School",
      content:
        "The performance tracking feature helped me identify that I needed to spend more time on organic chemistry. My test scores improved by 15% after adjusting my study schedule!",
      avatar: "rahul",
      subject: "Chemistry",
      subjectColor: "text-green-600",
    },
    {
      id: 3,
      name: "Ananya Patel",
      role: "12th Grade Student",
      school: "Modern Academy",
      content:
        "I love how the app color-codes each subject. The mathematics formula repository with LaTeX support makes complex equations easy to understand and memorize.",
      avatar: "ananya",
      subject: "Mathematics",
      subjectColor: "text-red-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gray-200 text-gray-800 hover:bg-gray-300 border-none">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-black">
            Loved by Students
          </h2>
          <p className="text-gray-600 max-w-[700px] mx-auto">
            See what students have to say about how Study Yugank has helped them
            excel in their studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-md"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.avatar}`}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base text-black">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {testimonial.role} at {testimonial.school}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-2">{testimonial.content}</p>
                <Badge
                  className={`mt-2 ${testimonial.subjectColor} bg-opacity-10`}
                >
                  {testimonial.subject} Student
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
