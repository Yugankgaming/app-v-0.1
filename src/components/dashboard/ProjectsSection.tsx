import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FolderKanban, Calendar, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  id: string;
  title: string;
  description: string;
  subject: "Physics" | "Chemistry" | "Mathematics" | "General";
  progress: number;
  dueDate: string;
}

const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Physics Lab Report",
    description: "Complete the lab report on electromagnetic induction",
    subject: "Physics",
    progress: 75,
    dueDate: "2023-06-15",
  },
  {
    id: "2",
    title: "Chemistry Research Paper",
    description: "Research paper on organic compounds and their applications",
    subject: "Chemistry",
    progress: 40,
    dueDate: "2023-06-20",
  },
  {
    id: "3",
    title: "Mathematics Problem Set",
    description: "Complete the calculus problem set for Chapter 7",
    subject: "Mathematics",
    progress: 90,
    dueDate: "2023-06-10",
  },
];

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    subject: "General",
    progress: 0,
    dueDate: new Date().toISOString().split("T")[0],
  });

  const handleAddProject = () => {
    if (!newProject.title) return;

    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description || "",
      subject: (newProject.subject as Project["subject"]) || "General",
      progress: newProject.progress || 0,
      dueDate: newProject.dueDate || new Date().toISOString().split("T")[0],
    };

    setProjects([...projects, project]);
    setNewProject({
      title: "",
      description: "",
      subject: "General",
      progress: 0,
      dueDate: new Date().toISOString().split("T")[0],
    });
    setIsAddDialogOpen(false);
  };

  const getSubjectColor = (subject: Project["subject"]) => {
    switch (subject) {
      case "Physics":
        return "blue";
      case "Chemistry":
        return "green";
      case "Mathematics":
        return "red";
      default:
        return "gray";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Study Projects</h2>
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <PlusCircle className="h-4 w-4" /> Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const color = getSubjectColor(project.subject);
          return (
            <Card
              key={project.id}
              className={`border-${color}-100 hover:shadow-md transition-shadow`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className={`text-${color}-600`}>
                    {project.title}
                  </CardTitle>
                  <div
                    className={`px-2 py-1 text-xs font-medium rounded-full bg-${color}-100 text-${color}-600`}
                  >
                    {project.subject}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-sm">
                  {project.description}
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress
                      value={project.progress}
                      className={`h-2 bg-${color}-100`}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(project.dueDate)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {project.progress < 100 ? "In progress" : "Completed"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Project Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="Enter project title"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Project description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <select
                id="subject"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newProject.subject}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    subject: e.target.value as Project["subject"],
                  })
                }
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="progress">Progress (%)</Label>
              <Input
                id="progress"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={newProject.progress}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    progress: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newProject.dueDate}
                onChange={(e) =>
                  setNewProject({ ...newProject, dueDate: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProject}>Add Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsSection;
