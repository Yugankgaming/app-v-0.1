import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BarChart2, PieChart } from "lucide-react";

interface TestScore {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  date: string;
  notes?: string;
}

interface StudySession {
  subject: string;
  time: number;
  date: string;
}

const PerformanceTracking = () => {
  const [scores, setScores] = useState<TestScore[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [newScore, setNewScore] = useState<Partial<TestScore>>({
    subject: "Physics",
    score: 0,
    maxScore: 100,
    notes: "",
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedScores = localStorage.getItem("testScores");
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }

    const savedSessions = localStorage.getItem("studySessions");
    if (savedSessions) {
      setStudySessions(JSON.parse(savedSessions));
    }
  }, []);

  // Save scores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("testScores", JSON.stringify(scores));
  }, [scores]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewScore((prev) => ({
      ...prev,
      [name]: name === "score" || name === "maxScore" ? Number(value) : value,
    }));
  };

  const handleSubjectChange = (value: string) => {
    setNewScore((prev) => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newScore.subject ||
      newScore.score === undefined ||
      newScore.maxScore === undefined
    ) {
      return;
    }

    const scoreEntry: TestScore = {
      id: Date.now().toString(),
      subject: newScore.subject,
      score: newScore.score,
      maxScore: newScore.maxScore,
      date: new Date().toISOString(),
      notes: newScore.notes,
    };

    setScores((prev) => [...prev, scoreEntry]);
    setNewScore({
      subject: "Physics",
      score: 0,
      maxScore: 100,
      notes: "",
    });
  };

  // Calculate average score for a subject
  const calculateAverageScore = (subject: string) => {
    const subjectScores = scores.filter((score) => score.subject === subject);
    if (subjectScores.length === 0) return 0;

    const totalPercentage = subjectScores.reduce(
      (acc, score) => acc + (score.score / score.maxScore) * 100,
      0,
    );
    return totalPercentage / subjectScores.length;
  };

  // Calculate total study time for a subject (in hours)
  const calculateStudyTime = (subject: string) => {
    const subjectSessions = studySessions.filter(
      (session) => session.subject === subject,
    );
    const totalSeconds = subjectSessions.reduce(
      (acc, session) => acc + session.time,
      0,
    );
    return totalSeconds / 3600; // Convert seconds to hours
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get scores for a specific subject
  const getSubjectScores = (subject: string) => {
    return scores
      .filter((score) => score.subject === subject)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // Generate correlation data points for visualization
  const generateCorrelationData = (subject: string) => {
    const subjectScores = scores.filter((score) => score.subject === subject);
    const subjectSessions = studySessions.filter(
      (session) => session.subject === subject,
    );

    // Group study sessions by day
    const studyTimeByDay = subjectSessions.reduce(
      (acc, session) => {
        const day = new Date(session.date).toLocaleDateString();
        acc[day] = (acc[day] || 0) + session.time / 3600; // Convert to hours
        return acc;
      },
      {} as Record<string, number>,
    );

    // Map scores to study time
    return subjectScores.map((score) => {
      const scoreDay = new Date(score.date).toLocaleDateString();
      const studyTime = studyTimeByDay[scoreDay] || 0;
      return {
        date: scoreDay,
        score: (score.score / score.maxScore) * 100,
        studyTime,
      };
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Performance Tracking</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-blue-600">
              <BarChart2 className="h-5 w-5 mr-2" />
              Physics Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {calculateAverageScore("Physics").toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">
              {getSubjectScores("Physics").length} tests recorded
            </div>
            <div className="text-sm text-gray-500">
              {calculateStudyTime("Physics").toFixed(1)} hours studied
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-600">
              <BarChart2 className="h-5 w-5 mr-2" />
              Chemistry Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {calculateAverageScore("Chemistry").toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">
              {getSubjectScores("Chemistry").length} tests recorded
            </div>
            <div className="text-sm text-gray-500">
              {calculateStudyTime("Chemistry").toFixed(1)} hours studied
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-red-600">
              <BarChart2 className="h-5 w-5 mr-2" />
              Mathematics Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {calculateAverageScore("Mathematics").toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">
              {getSubjectScores("Mathematics").length} tests recorded
            </div>
            <div className="text-sm text-gray-500">
              {calculateStudyTime("Mathematics").toFixed(1)} hours studied
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="physics">
                <TabsList className="mb-4">
                  <TabsTrigger value="physics" className="text-blue-600">
                    Physics
                  </TabsTrigger>
                  <TabsTrigger value="chemistry" className="text-green-600">
                    Chemistry
                  </TabsTrigger>
                  <TabsTrigger value="mathematics" className="text-red-600">
                    Mathematics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="physics">
                  <div className="h-64 flex items-center justify-center">
                    {getSubjectScores("Physics").length > 0 ? (
                      <div className="w-full h-full relative">
                        {/* Placeholder for chart - in a real app, use a charting library */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <PieChart className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                            <p>Physics performance visualization</p>
                            <p className="text-sm">
                              {getSubjectScores("Physics").length} data points
                              available
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        No test scores recorded for Physics yet.
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="chemistry">
                  <div className="h-64 flex items-center justify-center">
                    {getSubjectScores("Chemistry").length > 0 ? (
                      <div className="w-full h-full relative">
                        {/* Placeholder for chart */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <PieChart className="h-12 w-12 mx-auto mb-2 text-green-500" />
                            <p>Chemistry performance visualization</p>
                            <p className="text-sm">
                              {getSubjectScores("Chemistry").length} data points
                              available
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        No test scores recorded for Chemistry yet.
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="mathematics">
                  <div className="h-64 flex items-center justify-center">
                    {getSubjectScores("Mathematics").length > 0 ? (
                      <div className="w-full h-full relative">
                        {/* Placeholder for chart */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <PieChart className="h-12 w-12 mx-auto mb-2 text-red-500" />
                            <p>Mathematics performance visualization</p>
                            <p className="text-sm">
                              {getSubjectScores("Mathematics").length} data
                              points available
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        No test scores recorded for Mathematics yet.
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add Test Score</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={newScore.subject}
                    onValueChange={handleSubjectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="score">Score</Label>
                  <Input
                    id="score"
                    name="score"
                    type="number"
                    min="0"
                    value={newScore.score}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxScore">Maximum Score</Label>
                  <Input
                    id="maxScore"
                    name="maxScore"
                    type="number"
                    min="1"
                    value={newScore.maxScore}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={newScore.notes}
                    onChange={handleInputChange}
                    placeholder="Any notes about this test"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Save Score
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Test Scores</CardTitle>
        </CardHeader>
        <CardContent>
          {scores.length > 0 ? (
            <div className="space-y-2">
              {scores
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                .slice(0, 5)
                .map((score) => (
                  <div
                    key={score.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          score.subject === "Physics"
                            ? "bg-blue-500"
                            : score.subject === "Chemistry"
                              ? "bg-green-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <span className="font-medium">{score.subject}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600">
                        {formatDate(score.date)}
                      </span>
                      <span className="font-bold">
                        {score.score}/{score.maxScore} (
                        {((score.score / score.maxScore) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No test scores recorded yet. Add your first test score above!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTracking;
