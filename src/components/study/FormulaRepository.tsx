import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Plus, Atom, Calculator } from "lucide-react";
import { Beaker } from "lucide-react";

interface Formula {
  id: string;
  subject: string;
  title: string;
  latex: string;
  description: string;
  category: string;
}

interface FormulaRepositoryProps {
  initialSubject?: string;
}

const FormulaRepository = ({ initialSubject }: FormulaRepositoryProps = {}) => {
  const [formulas, setFormulas] = useState<Formula[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState(
    initialSubject || "physics",
  );

  // Sample formulas data
  const sampleFormulas: Formula[] = [
    {
      id: "p1",
      subject: "physics",
      title: "Newton's Second Law",
      latex: "F = ma",
      description:
        "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
      category: "Mechanics",
    },
    {
      id: "p2",
      subject: "physics",
      title: "Kinetic Energy",
      latex: "E_k = \\frac{1}{2}mv^2",
      description: "The energy possessed by an object due to its motion.",
      category: "Mechanics",
    },
    {
      id: "p3",
      subject: "physics",
      title: "Gravitational Potential Energy",
      latex: "E_p = mgh",
      description:
        "The energy possessed by an object due to its position in a gravitational field.",
      category: "Mechanics",
    },
    // Oscillations - Simple Harmonic Motion
    {
      id: "p4",
      subject: "physics",
      title: "Restoring Force (SHM)",
      latex: "F = -kx",
      description:
        "The restoring force in simple harmonic motion is proportional to displacement and in the opposite direction.",
      category: "Oscillations",
    },
    {
      id: "p5",
      subject: "physics",
      title: "SHM Differential Equation",
      latex: "\\frac{d^2x}{dt^2} + \\frac{k}{m}x = 0",
      description:
        "The differential equation that describes simple harmonic motion.",
      category: "Oscillations",
    },
    {
      id: "p6",
      subject: "physics",
      title: "SHM Displacement",
      latex: "x(t) = A \\cos(\\omega t + \\phi)",
      description:
        "The displacement as a function of time in simple harmonic motion.",
      category: "Oscillations",
    },
    {
      id: "p7",
      subject: "physics",
      title: "SHM Angular Frequency",
      latex: "\\omega = \\sqrt{\\frac{k}{m}}",
      description:
        "The angular frequency of oscillation in simple harmonic motion.",
      category: "Oscillations",
    },
    {
      id: "p8",
      subject: "physics",
      title: "SHM Period",
      latex: "T = 2\\pi \\sqrt{\\frac{m}{k}}",
      description:
        "The time taken for one complete oscillation in simple harmonic motion.",
      category: "Oscillations",
    },
    {
      id: "p9",
      subject: "physics",
      title: "SHM Frequency",
      latex: "f = \\frac{1}{T} = \\frac{\\omega}{2\\pi}",
      description:
        "The number of oscillations per unit time in simple harmonic motion.",
      category: "Oscillations",
    },
    {
      id: "p10",
      subject: "physics",
      title: "SHM Velocity",
      latex: "v(t) = -A\\omega \\sin(\\omega t + \\phi)",
      description:
        "The velocity as a function of time in simple harmonic motion.",
      category: "Oscillations",
    },
    {
      id: "p11",
      subject: "physics",
      title: "SHM Acceleration",
      latex: "a(t) = -A\\omega^2 \\cos(\\omega t + \\phi)",
      description:
        "The acceleration as a function of time in simple harmonic motion.",
      category: "Oscillations",
    },
    {
      id: "p12",
      subject: "physics",
      title: "SHM Energy",
      latex: "E = \\frac{1}{2}kA^2",
      description:
        "The total energy in simple harmonic motion, which is constant.",
      category: "Oscillations",
    },
    // Pendulums
    {
      id: "p13",
      subject: "physics",
      title: "Simple Pendulum Period",
      latex: "T = 2\\pi \\sqrt{\\frac{L}{g}}",
      description:
        "The period of a simple pendulum, where L is the length and g is the acceleration due to gravity.",
      category: "Oscillations",
    },
    {
      id: "p14",
      subject: "physics",
      title: "Physical Pendulum Period",
      latex: "T = 2\\pi \\sqrt{\\frac{I}{mgh}}",
      description:
        "The period of a physical pendulum, where I is the moment of inertia and h is the distance to the center of mass.",
      category: "Oscillations",
    },
    {
      id: "p15",
      subject: "physics",
      title: "Torsional Pendulum Period",
      latex: "T = 2\\pi \\sqrt{\\frac{I}{\\kappa}}",
      description:
        "The period of a torsional pendulum, where I is the moment of inertia and κ is the torsion constant.",
      category: "Oscillations",
    },
    // Damped Oscillations
    {
      id: "p16",
      subject: "physics",
      title: "Damped Oscillation Equation",
      latex: "m\\frac{d^2x}{dt^2} + b\\frac{dx}{dt} + kx = 0",
      description:
        "The differential equation for damped oscillations, where b is the damping coefficient.",
      category: "Oscillations",
    },
    {
      id: "p17",
      subject: "physics",
      title: "Underdamped Solution",
      latex: "x(t) = Ae^{-\\frac{bt}{2m}}\\cos(\\omega' t + \\phi)",
      description:
        "The solution for underdamped oscillations, where the system still oscillates but with decreasing amplitude.",
      category: "Oscillations",
    },
    {
      id: "p18",
      subject: "physics",
      title: "Damped Angular Frequency",
      latex: "\\omega' = \\sqrt{\\omega_0^2 - \\left(\\frac{b}{2m}\\right)^2}",
      description:
        "The angular frequency in damped oscillations, which is less than the natural frequency.",
      category: "Oscillations",
    },
    // Forced Oscillations
    {
      id: "p19",
      subject: "physics",
      title: "Forced Oscillation Equation",
      latex: "m\\frac{d^2x}{dt^2} + b\\frac{dx}{dt} + kx = F_0\\cos(\\omega t)",
      description:
        "The differential equation for forced oscillations with an external driving force.",
      category: "Oscillations",
    },
    {
      id: "p20",
      subject: "physics",
      title: "Forced Oscillation Amplitude",
      latex:
        "A = \\frac{F_0}{\\sqrt{m^2(\\omega^2 - \\omega_0^2)^2 + b^2\\omega^2}}",
      description: "The amplitude of steady-state forced oscillations.",
      category: "Oscillations",
    },
    {
      id: "p21",
      subject: "physics",
      title: "Resonance Frequency",
      latex: "\\omega_r = \\sqrt{\\omega_0^2 - \\frac{b^2}{2m^2}}",
      description:
        "The frequency at which the amplitude of forced oscillations is maximum.",
      category: "Oscillations",
    },
    // Spring Combinations
    {
      id: "p22",
      subject: "physics",
      title: "Parallel Springs",
      latex: "k_{\\text{eff}} = k_1 + k_2 + \\ldots",
      description:
        "The effective spring constant for springs connected in parallel.",
      category: "Oscillations",
    },
    {
      id: "p23",
      subject: "physics",
      title: "Series Springs",
      latex:
        "\\frac{1}{k_{\\text{eff}}} = \\frac{1}{k_1} + \\frac{1}{k_2} + \\ldots",
      description:
        "The effective spring constant for springs connected in series.",
      category: "Oscillations",
    },
    // LC Oscillations
    {
      id: "p24",
      subject: "physics",
      title: "LC Circuit Frequency",
      latex: "\\omega = \\frac{1}{\\sqrt{LC}}",
      description: "The angular frequency of oscillations in an LC circuit.",
      category: "Oscillations",
    },
    {
      id: "p25",
      subject: "physics",
      title: "LC Circuit Charge",
      latex: "q(t) = Q\\cos(\\omega t + \\phi)",
      description:
        "The charge on the capacitor as a function of time in an LC circuit.",
      category: "Oscillations",
    },
    // Key Relationships
    {
      id: "p26",
      subject: "physics",
      title: "SHM Key Relationships",
      latex:
        "\\omega = 2\\pi f = \\frac{2\\pi}{T}, \\quad v = \\pm\\omega\\sqrt{A^2 - x^2}, \\quad a = -\\omega^2 x",
      description:
        "Important relationships between parameters in simple harmonic motion.",
      category: "Oscillations",
    },
    {
      id: "p27",
      subject: "physics",
      title: "SHM Initial Conditions",
      latex:
        "A = \\sqrt{x(0)^2 + \\left(\\frac{v(0)}{\\omega}\\right)^2}, \\quad \\phi = \\arctan\\left(-\\frac{v(0)}{\\omega x(0)}\\right)",
      description:
        "Formulas to determine amplitude and phase from initial conditions in simple harmonic motion.",
      category: "Oscillations",
    },
    {
      id: "c1",
      subject: "chemistry",
      title: "Ideal Gas Law",
      latex: "PV = nRT",
      description:
        "Describes the behavior of a hypothetical ideal gas, relating pressure, volume, amount of substance, and temperature.",
      category: "Thermodynamics",
    },
    {
      id: "c2",
      subject: "chemistry",
      title: "pH Calculation",
      latex: "pH = -\\log[H^+]",
      description: "Measures the acidity or basicity of an aqueous solution.",
      category: "Acids and Bases",
    },
    {
      id: "c3",
      subject: "chemistry",
      title: "Gibbs Free Energy",
      latex: "\\Delta G = \\Delta H - T\\Delta S",
      description:
        "Thermodynamic potential that measures the maximum reversible work that may be performed by a thermodynamic system at constant temperature and pressure.",
      category: "Thermodynamics",
    },
    {
      id: "m1",
      subject: "mathematics",
      title: "Quadratic Formula",
      latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      description: "Solves quadratic equations of the form ax² + bx + c = 0.",
      category: "Algebra",
    },
    {
      id: "m2",
      subject: "mathematics",
      title: "Pythagorean Theorem",
      latex: "a^2 + b^2 = c^2",
      description:
        "In a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides.",
      category: "Geometry",
    },
    {
      id: "m3",
      subject: "mathematics",
      title: "Derivative of a Function",
      latex: "\\frac{d}{dx}[f(x)] = \\lim_{h \\to 0}\\frac{f(x+h) - f(x)}{h}",
      description:
        "Measures the rate at which a function changes at a particular input value.",
      category: "Calculus",
    },
  ];

  // Load formulas from localStorage on component mount
  useEffect(() => {
    const savedFormulas = localStorage.getItem("formulas");
    if (savedFormulas) {
      setFormulas(JSON.parse(savedFormulas));
    } else {
      // Initialize with sample formulas if none exist
      setFormulas(sampleFormulas);
      localStorage.setItem("formulas", JSON.stringify(sampleFormulas));
    }
  }, []);

  // Set active subject based on initialSubject prop
  useEffect(() => {
    if (initialSubject) {
      setActiveSubject(initialSubject);
    }
  }, [initialSubject]);

  // Save formulas to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("formulas", JSON.stringify(formulas));
  }, [formulas]);

  // Filter formulas based on search query and active subject
  const filteredFormulas = formulas.filter(
    (formula) =>
      formula.subject === activeSubject &&
      (searchQuery === "" ||
        formula.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.category.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Group formulas by category
  const groupedFormulas = filteredFormulas.reduce(
    (acc, formula) => {
      if (!acc[formula.category]) {
        acc[formula.category] = [];
      }
      acc[formula.category].push(formula);
      return acc;
    },
    {} as Record<string, Formula[]>,
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Formula Repository</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search formulas..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="physics"
        value={activeSubject}
        onValueChange={setActiveSubject}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="physics" className="flex items-center">
            <Atom className="h-4 w-4 mr-2 text-blue-600" />
            <span className="text-blue-600">Physics</span>
          </TabsTrigger>
          <TabsTrigger value="chemistry" className="flex items-center">
            <Beaker className="h-4 w-4 mr-2 text-green-600" />
            <span className="text-green-600">Chemistry</span>
          </TabsTrigger>
          <TabsTrigger value="mathematics" className="flex items-center">
            <Calculator className="h-4 w-4 mr-2 text-red-600" />
            <span className="text-red-600">Mathematics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="physics">
          <div className="space-y-6">
            {Object.keys(groupedFormulas).length > 0 ? (
              Object.entries(groupedFormulas).map(([category, formulas]) => (
                <Card key={category} className="border-blue-100">
                  <CardHeader className="pb-2 bg-blue-50">
                    <CardTitle className="text-blue-700">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {formulas.map((formula) => (
                        <div
                          key={formula.id}
                          className="p-4 border border-blue-100 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          <h3 className="font-bold text-blue-700 mb-2">
                            {formula.title}
                          </h3>
                          <div className="bg-white p-3 rounded border border-blue-100 mb-2 font-mono text-lg">
                            {formula.latex}
                          </div>
                          <p className="text-gray-600">{formula.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No physics formulas found matching your search.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="chemistry">
          <div className="space-y-6">
            {Object.keys(groupedFormulas).length > 0 ? (
              Object.entries(groupedFormulas).map(([category, formulas]) => (
                <Card key={category} className="border-green-100">
                  <CardHeader className="pb-2 bg-green-50">
                    <CardTitle className="text-green-700">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {formulas.map((formula) => (
                        <div
                          key={formula.id}
                          className="p-4 border border-green-100 rounded-md hover:bg-green-50 transition-colors"
                        >
                          <h3 className="font-bold text-green-700 mb-2">
                            {formula.title}
                          </h3>
                          <div className="bg-white p-3 rounded border border-green-100 mb-2 font-mono text-lg">
                            {formula.latex}
                          </div>
                          <p className="text-gray-600">{formula.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No chemistry formulas found matching your search.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="mathematics">
          <div className="space-y-6">
            {Object.keys(groupedFormulas).length > 0 ? (
              Object.entries(groupedFormulas).map(([category, formulas]) => (
                <Card key={category} className="border-red-100">
                  <CardHeader className="pb-2 bg-red-50">
                    <CardTitle className="text-red-700">{category}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {formulas.map((formula) => (
                        <div
                          key={formula.id}
                          className="p-4 border border-red-100 rounded-md hover:bg-red-50 transition-colors"
                        >
                          <h3 className="font-bold text-red-700 mb-2">
                            {formula.title}
                          </h3>
                          <div className="bg-white p-3 rounded border border-red-100 mb-2 font-mono text-lg">
                            {formula.latex}
                          </div>
                          <p className="text-gray-600">{formula.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No mathematics formulas found matching your search.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormulaRepository;
