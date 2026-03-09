import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SurveyAnswer {
  [key: string]: string | string[];
}

const sections = [
  {
    id: "basic",
    title: "Basic Information",
    questions: [
      { id: "name", label: "Full Name", type: "text" as const },
      { id: "email", label: "Email Address", type: "text" as const },
      { id: "college", label: "College / University", type: "text" as const },
      { id: "year", label: "Year of Study", type: "select" as const, options: ["1st Year", "2nd Year", "3rd Year", "4th Year", "Post-Graduate"] },
    ],
  },
  {
    id: "exposure",
    title: "Startup Exposure",
    questions: [
      { id: "startup_exp", label: "Have you worked on a startup idea before?", type: "select" as const, options: ["Yes, actively", "Yes, briefly", "No, but interested", "No"] },
      { id: "hackathon", label: "Have you participated in hackathons?", type: "select" as const, options: ["Multiple times", "Once or twice", "Never"] },
      { id: "courses", label: "Have you taken entrepreneurship courses?", type: "select" as const, options: ["Yes, multiple", "One course", "No, self-taught", "No"] },
    ],
  },
  {
    id: "idea",
    title: "Idea Stage",
    questions: [
      { id: "has_idea", label: "Do you currently have a startup idea?", type: "select" as const, options: ["Yes, well-defined", "Yes, rough concept", "Exploring options", "No idea yet"] },
      { id: "problem", label: "Can you describe the problem you want to solve?", type: "textarea" as const },
      { id: "uniqueness", label: "What makes your approach unique?", type: "textarea" as const },
    ],
  },
  {
    id: "validation",
    title: "Problem Validation",
    questions: [
      { id: "talked_users", label: "Have you talked to potential users?", type: "select" as const, options: ["Yes, 10+ people", "Yes, a few", "Not yet", "Don't know how"] },
      { id: "market_research", label: "Have you done market research?", type: "select" as const, options: ["Extensive research", "Some research", "Basic googling", "Not yet"] },
    ],
  },
  {
    id: "skills",
    title: "Technical Skills",
    questions: [
      { id: "tech_skills", label: "Your technical skills", type: "multi" as const, options: ["Coding", "Design", "Data Analysis", "Marketing", "Sales", "Product Management", "None yet"] },
      { id: "can_build", label: "Can you build a basic prototype?", type: "select" as const, options: ["Yes, independently", "With some help", "Need significant help", "Cannot build"] },
    ],
  },
  {
    id: "mindset",
    title: "Entrepreneurial Mindset",
    questions: [
      { id: "risk", label: "How comfortable are you with risk?", type: "select" as const, options: ["Very comfortable", "Somewhat comfortable", "Cautious", "Risk-averse"] },
      { id: "failure", label: "How do you view failure?", type: "select" as const, options: ["Learning opportunity", "Temporary setback", "Something to avoid", "Very scary"] },
    ],
  },
  {
    id: "commitment",
    title: "Commitment Level",
    questions: [
      { id: "hours", label: "Hours per week you can dedicate", type: "select" as const, options: ["20+ hours", "10-20 hours", "5-10 hours", "Less than 5 hours"] },
      { id: "timeline", label: "When do you want to launch?", type: "select" as const, options: ["Within 3 months", "Within 6 months", "Within 1 year", "Not sure"] },
    ],
  },
  {
    id: "mentorship",
    title: "Mentorship Requirements",
    questions: [
      { id: "mentor_need", label: "Areas where you need mentorship", type: "multi" as const, options: ["Idea Validation", "Product Building", "Business Strategy", "Fundraising", "Marketing", "Technical Development", "Team Building"] },
      { id: "mentor_style", label: "Preferred mentorship style", type: "select" as const, options: ["Regular 1-on-1", "Group sessions", "On-demand advice", "Self-paced with check-ins"] },
    ],
  },
];

const scoreWeights: Record<string, Record<string, number>> = {
  startup_exp: { "Yes, actively": 15, "Yes, briefly": 10, "No, but interested": 5, "No": 0 },
  has_idea: { "Yes, well-defined": 15, "Yes, rough concept": 10, "Exploring options": 5, "No idea yet": 0 },
  talked_users: { "Yes, 10+ people": 15, "Yes, a few": 10, "Not yet": 3, "Don't know how": 0 },
  market_research: { "Extensive research": 10, "Some research": 7, "Basic googling": 3, "Not yet": 0 },
  can_build: { "Yes, independently": 15, "With some help": 10, "Need significant help": 5, "Cannot build": 0 },
  risk: { "Very comfortable": 10, "Somewhat comfortable": 7, "Cautious": 3, "Risk-averse": 0 },
  failure: { "Learning opportunity": 10, "Temporary setback": 7, "Something to avoid": 3, "Very scary": 0 },
  hours: { "20+ hours": 10, "10-20 hours": 7, "5-10 hours": 3, "Less than 5 hours": 0 },
};

function calculateScore(answers: SurveyAnswer): number {
  let total = 0;
  for (const [key, weights] of Object.entries(scoreWeights)) {
    const answer = answers[key];
    if (typeof answer === "string" && weights[answer] !== undefined) {
      total += weights[answer];
    }
  }
  return total;
}

function getInsights(score: number) {
  return {
    ideaClarity: score >= 60 ? "Strong" : score >= 30 ? "Moderate" : "Needs Work",
    executionCapability: score >= 50 ? "High" : score >= 25 ? "Medium" : "Developing",
    commitmentLevel: score >= 40 ? "High" : score >= 20 ? "Moderate" : "Low",
    startupReadiness: score >= 70 ? "Ready" : score >= 40 ? "Almost There" : "Early Stage",
  };
}

const SurveyPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswer>({});
  const [submitted, setSubmitted] = useState(false);

  const section = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  const updateAnswer = (id: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const toggleMulti = (id: string, option: string) => {
    const current = (answers[id] as string[]) || [];
    const updated = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    updateAnswer(id, updated);
  };

  const next = () => {
    if (currentSection < sections.length - 1) setCurrentSection((s) => s + 1);
    else setSubmitted(true);
  };

  const prev = () => {
    if (currentSection > 0) setCurrentSection((s) => s - 1);
  };

  const score = calculateScore(answers);
  const insights = getInsights(score);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 md:p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold glow-text mb-2">
                Founder Score
              </h2>
              <div className="text-6xl md:text-7xl font-display font-bold glow-blue my-6">
                {score}<span className="text-2xl text-muted-foreground">/100</span>
              </div>

              {/* Score bar */}
              <div className="w-full h-3 bg-secondary rounded-full mb-8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full"
                  style={{ boxShadow: "0 0 12px hsl(var(--electric) / 0.5)" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                {Object.entries(insights).map(([key, value]) => (
                  <div key={key} className="glass-card p-4">
                    <div className="text-xs text-muted-foreground capitalize mb-1">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div className="font-display font-semibold text-foreground">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/apply" className="btn-primary-glow text-sm">
                  Apply for Pre-Incubation
                </Link>
                <Link to="/" className="btn-outline-glow text-sm">
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold glow-text mb-2">
              Startup Readiness Survey
            </h1>
            <p className="text-muted-foreground">Discover your founder potential</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{section.title}</span>
              <span>{currentSection + 1}/{sections.length}</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary rounded-full"
                style={{ boxShadow: "0 0 8px hsl(var(--electric) / 0.4)" }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card p-6 md:p-8"
            >
              <h2 className="text-xl font-display font-bold text-foreground mb-6">{section.title}</h2>

              <div className="space-y-6">
                {section.questions.map((q) => (
                  <div key={q.id}>
                    <label className="text-sm font-medium text-foreground block mb-2">{q.label}</label>

                    {q.type === "text" && (
                      <input
                        type="text"
                        value={(answers[q.id] as string) || ""}
                        onChange={(e) => updateAnswer(q.id, e.target.value)}
                        className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder={`Enter your ${q.label.toLowerCase()}`}
                      />
                    )}

                    {q.type === "textarea" && (
                      <textarea
                        value={(answers[q.id] as string) || ""}
                        onChange={(e) => updateAnswer(q.id, e.target.value)}
                        rows={3}
                        className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                        placeholder="Share your thoughts..."
                      />
                    )}

                    {q.type === "select" && q.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => updateAnswer(q.id, opt)}
                            className={`text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                              answers[q.id] === opt
                                ? "bg-primary/20 border-primary/50 text-foreground"
                                : "bg-secondary/30 border-border hover:border-primary/30 text-muted-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}

                    {q.type === "multi" && q.options && (
                      <div className="flex flex-wrap gap-2">
                        {q.options.map((opt) => {
                          const selected = ((answers[q.id] as string[]) || []).includes(opt);
                          return (
                            <button
                              key={opt}
                              onClick={() => toggleMulti(q.id, opt)}
                              className={`px-4 py-2 rounded-full text-sm transition-all border ${
                                selected
                                  ? "bg-primary/20 border-primary/50 text-foreground"
                                  : "bg-secondary/30 border-border hover:border-primary/30 text-muted-foreground"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prev}
                  disabled={currentSection === 0}
                  className="btn-outline-glow !px-6 !py-2.5 text-sm flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={next}
                  className="btn-primary-glow !px-6 !py-2.5 text-sm flex items-center gap-2"
                >
                  {currentSection === sections.length - 1 ? "Get Score" : "Next"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyPage;
