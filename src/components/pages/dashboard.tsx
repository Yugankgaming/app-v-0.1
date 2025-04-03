import React, { useState } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import DashboardGrid from "../dashboard/DashboardGrid";
import TaskBoard from "../dashboard/TaskBoard";
import ActivityFeed from "../dashboard/ActivityFeed";
import StudyDashboard from "../study/StudyDashboard";
import HomeSection from "../dashboard/HomeSection";
import ProjectsSection from "../dashboard/ProjectsSection";
import TeamSection from "../dashboard/TeamSection";
import SubjectTimerDashboard from "../study/SubjectTimerDashboard";
import PerformanceTracking from "../study/PerformanceTracking";
import FormulaRepository from "../study/FormulaRepository";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleSidebarItemClick = (label: string) => {
    switch (label) {
      case "Home":
        setActiveSection("home");
        break;
      case "Dashboard":
        setActiveSection("dashboard");
        break;
      case "Study":
        setActiveSection("study");
        break;
      case "Projects":
        setActiveSection("projects");
        break;
      case "Team":
        setActiveSection("team");
        break;
      case "Physics":
        setActiveSection("physics");
        break;
      case "Chemistry":
        setActiveSection("chemistry");
        break;
      case "Mathematics":
        setActiveSection("mathematics");
        break;
      default:
        setActiveSection("dashboard");
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return (
          <main className="flex-1 overflow-auto p-6">
            <HomeSection />
          </main>
        );
      case "dashboard":
        return (
          <>
            <main className="flex-1 overflow-auto p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome to Your Dashboard
                </h1>
                <p className="text-gray-600">
                  Manage your projects and tasks efficiently.
                </p>
              </div>

              <div className="space-y-8">
                <DashboardGrid />
                <TaskBoard />
              </div>
            </main>

            <div className="w-[280px] border-l border-gray-200 bg-white">
              <div className="p-4">
                <ActivityFeed />
              </div>
            </div>
          </>
        );
      case "study":
        return (
          <main className="flex-1 overflow-auto">
            <StudyDashboard />
          </main>
        );
      case "projects":
        return (
          <main className="flex-1 overflow-auto p-6">
            <ProjectsSection />
          </main>
        );
      case "team":
        return (
          <main className="flex-1 overflow-auto p-6">
            <TeamSection />
          </main>
        );
      case "physics":
        return (
          <main className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-blue-600">Physics</h1>
              <p className="text-gray-600">
                Track your physics study time and access formulas.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <SubjectTimerDashboard initialSubject="Physics" />
              <FormulaRepository initialSubject="physics" />
            </div>
          </main>
        );
      case "chemistry":
        return (
          <main className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-green-600">Chemistry</h1>
              <p className="text-gray-600">
                Track your chemistry study time and access formulas.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <SubjectTimerDashboard initialSubject="Chemistry" />
              <FormulaRepository initialSubject="chemistry" />
            </div>
          </main>
        );
      case "mathematics":
        return (
          <main className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-red-600">Mathematics</h1>
              <p className="text-gray-600">
                Track your mathematics study time and access formulas.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <SubjectTimerDashboard initialSubject="Mathematics" />
              <FormulaRepository initialSubject="mathematics" />
            </div>
          </main>
        );
      default:
        return (
          <main className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome to Your Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your projects and tasks efficiently.
              </p>
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />

      <div className="flex pt-16">
        <Sidebar
          onItemClick={handleSidebarItemClick}
          activeItem={
            activeSection === "dashboard"
              ? "Dashboard"
              : activeSection === "study"
                ? "Study"
                : activeSection === "home"
                  ? "Home"
                  : activeSection === "projects"
                    ? "Projects"
                    : activeSection === "team"
                      ? "Team"
                      : "Dashboard"
          }
        />

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
