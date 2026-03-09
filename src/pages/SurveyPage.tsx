import { useState } from "react";
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
        <div className="pt-28 pb-20">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="section-card p-8 md:p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-7 h-7 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Founder Score
              </h2>
              <div className="text-5xl font-bold text-primary my-5">
                {score}<span className="text-lg text-muted-foreground font-normal">/100</span>
              </div>

              <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: `${score}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                {Object.entries(insights).map(([key, value]) => (
                  <div key={key} className="bg-muted rounded-lg p-3">
                    <div className="text-xs text-muted-foreground capitalize mb-0.5">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div className="font-semibold text-foreground text-sm">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/apply" className="btn-primary text-sm">
                  Apply for Pre-Incubation
                </Link>
                <Link to="/" className="btn-outline text-sm">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Startup Readiness Survey
            </h1>
            <p className="text-sm text-muted-foreground">Discover your founder potential</p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>{section.title}</span>
              <span>{currentSection + 1}/{sections.length}</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="section-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-5">{section.title}</h2>

            <div className="space-y-5">
              {section.questions.map((q) => (
                <div key={q.id}>
                  <label className="text-sm font-medium text-foreground block mb-2">{q.label}</label>

                  {q.type === "text" && (
                    <input
                      type="text"
                      value={(answers[q.id] as string) || ""}
                      onChange={(e) => updateAnswer(q.id, e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                      placeholder={`Enter your ${q.label.toLowerCase()}`}
                    />
                  )}

                  {q.type === "textarea" && (
                    <textarea
                      value={(answers[q.id] as string) || ""}
                      onChange={(e) => updateAnswer(q.id, e.target.value)}
                      rows={3}
                      className="w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                      placeholder="Share your thoughts..."
                    />
                  )}

                  {q.type === "select" && q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => updateAnswer(q.id, opt)}
                          className={`text-left px-3.5 py-2.5 rounded-lg text-sm transition-all border ${
                            answers[q.id] === opt
                              ? "bg-primary/8 border-primary/40 text-foreground font-medium"
                              : "bg-background border-border hover:border-primary/20 text-muted-foreground"
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
                            className={`px-3.5 py-2 rounded-lg text-sm transition-all border ${
                              selected
                                ? "bg-primary/8 border-primary/40 text-foreground font-medium"
                                : "bg-background border-border hover:border-primary/20 text-muted-foreground"
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

            <div className="flex justify-between mt-6 pt-5 border-t border-border">
              <button
                onClick={prev}
                disabled={currentSection === 0}
                className="btn-outline !px-5 !py-2 text-sm flex items-center gap-2 disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={next}
                className="btn-primary !px-5 !py-2 text-sm flex items-center gap-2"
              >
                {currentSection === sections.length - 1 ? "Get Score" : "Next"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyPage;
