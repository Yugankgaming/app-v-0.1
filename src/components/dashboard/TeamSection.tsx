import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MessageSquare, UserPlus } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  subjects: string[];
  online: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Priya Sharma",
    role: "Study Partner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    subjects: ["Physics", "Mathematics"],
    online: true,
  },
  {
    id: "2",
    name: "Rahul Verma",
    role: "Study Group Leader",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    subjects: ["Chemistry", "Physics"],
    online: false,
  },
  {
    id: "3",
    name: "Ananya Patel",
    role: "Study Partner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya",
    subjects: ["Mathematics"],
    online: true,
  },
  {
    id: "4",
    name: "Vikram Singh",
    role: "Tutor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    online: false,
  },
];

const TeamSection = () => {
  const getSubjectBadge = (subject: string) => {
    switch (subject) {
      case "Physics":
        return "bg-blue-100 text-blue-600";
      case "Chemistry":
        return "bg-green-100 text-green-600";
      case "Mathematics":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Study Team</h2>
        <Button variant="outline" size="sm" className="gap-1">
          <UserPlus className="h-4 w-4" /> Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    {member.online && (
                      <div className="absolute bottom-0 right-2 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{member.name}</CardTitle>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {member.subjects.map((subject) => (
                    <span
                      key={subject}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getSubjectBadge(
                        subject,
                      )}`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1 text-gray-600"
                >
                  <MessageSquare className="h-4 w-4" /> Message
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1 text-gray-600"
                >
                  <Mail className="h-4 w-4" /> Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Study Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Physics Group Study</h3>
                <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  Tomorrow, 4:00 PM
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Review electromagnetic induction and practice problems
              </p>
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
                      alt="Priya"
                    />
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
                      alt="Rahul"
                    />
                    <AvatarFallback>R</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
                      alt="Vikram"
                    />
                    <AvatarFallback>V</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs text-gray-500">3 participants</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Mathematics Tutoring</h3>
                <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  Friday, 5:30 PM
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Calculus problem-solving session with Vikram
              </p>
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya"
                      alt="Ananya"
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-6 w-6 border-2 border-white">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
                      alt="Vikram"
                    />
                    <AvatarFallback>V</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs text-gray-500">2 participants</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamSection;
