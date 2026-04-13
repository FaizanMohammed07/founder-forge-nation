import { useState } from "react";
import {
  GraduationCap,
  Beaker,
  Building,
  Rocket,
  Banknote,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    icon: GraduationCap,
    label: "Student",
    tagline: "Ideation Phase",
    description: "Transform raw ideas into validated concepts through intensive research and market analysis.",
    metrics: "0-3 Months",
    color: "from-purple-500 to-indigo-600",
    bgGlow: "bg-purple-500/20",
  },
  {
    icon: Beaker,
    label: "Pre-Incubation",
    tagline: "Validation Sprint",
    description: "Rigorous hypothesis testing, customer discovery, and problem-solution fit validation.",
    metrics: "3-6 Months",
    color: "from-blue-500 to-cyan-600",
    bgGlow: "bg-blue-500/20",
  },
  {
    icon: Building,
    label: "Incubation",
    tagline: "MVP Development",
    description: "Build your minimum viable product, achieve product-market fit, and secure early users.",
    metrics: "6-12 Months",
    color: "from-cyan-500 to-teal-600",
    bgGlow: "bg-cyan-500/20",
  },
  {
    icon: Rocket,
    label: "Accelerator",
    tagline: "Growth Engine",
    description: "High-velocity scaling, user acquisition optimization, and metrics-driven expansion.",
    metrics: "12-18 Months",
    color: "from-orange-500 to-red-600",
    bgGlow: "bg-orange-500/20",
  },
  {
    icon: Banknote,
    label: "Funding",
    tagline: "Capital Raise",
    description: "Pitch to investors, negotiate term sheets, and secure venture capital for exponential growth.",
    metrics: "18-24 Months",
    color: "from-green-500 to-emerald-600",
    bgGlow: "bg-green-500/20",
  },
  {
    icon: TrendingUp,
    label: "Startup Growth",
    tagline: "Scale & Dominate",
    description: "Market leadership, team expansion, enterprise partnerships, and sustainable profitability.",
    metrics: "24+ Months",
    color: "from-rose-500 to-pink-600",
    bgGlow: "bg-rose-500/20",
  },
];

const EcosystemSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-40 bg-white relative overflow-hidden">

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 mb-6">
            <Sparkles className="w-4 h-4 text-[#E50914]" />
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-[#E50914]">
              The Evolution Path
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight mb-6">
            Your Startup{" "}
            <span className="text-[#E50914]">
              Journey
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            A comprehensive, battle-tested framework designed to transform ambitious students into{" "}
            <span className="font-semibold text-[#E50914]">venture-backed founders</span>
          </p>
        </div>

        {/* Desktop Journey Timeline */}
        <div className="hidden lg:block relative max-w-[1400px] mx-auto mb-24">
          {/* Connection Line */}
          <div className="absolute top-[100px] left-[8%] right-[8%] h-1 bg-gray-200 rounded-full" />
          
          {/* Active Progress Line */}
          <div 
            className="absolute top-[100px] left-[8%] h-1 bg-[#E50914] rounded-full transition-all duration-700 ease-out"
            style={{ 
              width: selectedIndex !== null ? `${(selectedIndex / (steps.length - 1)) * 84}%` : '0%',
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#E50914]" />
          </div>

          {/* Stage Cards */}
          <div className="flex justify-between relative">
            {steps.map((step, i) => {
              const isHovered = hoveredIndex === i;
              const isSelected = selectedIndex === i;
              const isActive = selectedIndex !== null && i <= selectedIndex;

              return (
                <div
                  key={step.label}
                  className="relative flex flex-col items-center w-[14%] cursor-pointer group"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedIndex(i)}
                >
                  {/* Node Circle */}
                  <div
                    className={`relative z-10 w-[200px] h-[200px] rounded-2xl mb-6 flex flex-col items-center justify-center transition-all duration-500 border-2 ${
                      isActive
                        ? "border-[#E50914] bg-red-50 shadow-lg"
                        : "border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg"
                    } ${
                      isHovered || isSelected
                        ? "scale-110 -translate-y-4"
                        : "scale-100"
                    }`}
                  >
                    {/* Glow Effect */}
                    {/* Icon */}
                    <div className={`mb-4 transition-all duration-500 ${isActive ? "text-[#E50914]" : "text-gray-700"}`}>
                      <step.icon className="w-12 h-12" strokeWidth={1.5} />
                    </div>

                    {/* Stage Number */}
                    <div className={`text-[10px] font-black tracking-[0.2em] uppercase mb-2 ${isActive ? "text-[#E50914]/80" : "text-gray-400"}`}>
                      Stage {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Label */}
                    <h3 className={`font-black text-lg text-center mb-1 ${isActive ? "text-[#111111]" : "text-gray-900"}`}>
                      {step.label}
                    </h3>

                    {/* Tagline */}
                    <p className={`text-xs font-medium text-center ${isActive ? "text-gray-600" : "text-gray-500"}`}>
                      {step.tagline}
                    </p>

                    {/* Metrics Badge */}
                    <div className={`mt-4 px-3 py-1 rounded-full text-[10px] font-bold ${isActive ? "bg-white text-[#E50914] border border-red-100" : "bg-gray-100 text-gray-600"}`}>
                      {step.metrics}
                    </div>

                    {/* Expand Indicator */}
                    {(isHovered || isSelected) && (
                      <div className="absolute bottom-3 right-3">
                        <ChevronRight className="w-5 h-5 text-[#E50914] animate-bounce" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Journey (Vertical) */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, i) => {
            const isSelected = selectedIndex === i;

            return (
              <div
                key={step.label}
                className="relative"
                onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
              >
                <div
                  className={`relative rounded-2xl p-6 transition-all duration-500 cursor-pointer border-2 ${
                    isSelected
                      ? "border-[#E50914] bg-red-50 shadow-lg"
                      : "border-gray-200 bg-white shadow-lg"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${isSelected ? "bg-white" : "bg-gray-100"}`}>
                      <step.icon className={`w-8 h-8 ${isSelected ? "text-[#E50914]" : "text-gray-700"}`} strokeWidth={1.5} />
                    </div>

                    <div className="flex-1">
                      <div className={`text-[10px] font-black tracking-[0.2em] uppercase mb-1 ${isSelected ? "text-[#E50914]/80" : "text-gray-400"}`}>
                        Stage {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className={`font-black text-xl mb-1 ${isSelected ? "text-[#111111]" : "text-gray-900"}`}>
                        {step.label}
                      </h3>
                      <p className={`text-sm font-medium mb-2 ${isSelected ? "text-gray-600" : "text-gray-500"}`}>
                        {step.tagline}
                      </p>
                      <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${isSelected ? "bg-white text-[#E50914] border border-red-100" : "bg-gray-100 text-gray-600"}`}>
                        {step.metrics}
                      </div>
                    </div>

                    <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${isSelected ? "rotate-90 text-[#E50914]" : "text-gray-400"}`} />
                  </div>

                  {isSelected && (
                    <div className="mt-6 pt-6 border-t border-red-100">
                      <p className="text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Details (Desktop) */}
        {selectedIndex !== null && (() => {
          const SelectedIcon = steps[selectedIndex].icon;
          return (
            <div className="hidden lg:block">
              <div className="max-w-4xl mx-auto">
                <div className="relative rounded-3xl p-12 bg-white border-2 border-red-100 shadow-xl">
                  
                  <div className="flex items-start gap-8">
                    <div className="shrink-0 w-24 h-24 rounded-2xl bg-red-50 flex items-center justify-center">
                      <SelectedIcon className="w-12 h-12 text-[#E50914]" strokeWidth={1.5} />
                    </div>

                    <div className="flex-1">
                      <div className="text-[11px] font-black tracking-[0.2em] uppercase text-[#E50914]/80 mb-2">
                        Stage {String(selectedIndex + 1).padStart(2, "0")} • {steps[selectedIndex].metrics}
                      </div>
                      <h3 className="text-4xl font-black text-[#111111] mb-3">
                        {steps[selectedIndex].label}
                      </h3>
                      <p className="text-lg text-gray-700 font-light leading-relaxed mb-6">
                        {steps[selectedIndex].description}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-50 border border-red-100 text-[#E50914] font-bold hover:bg-red-100 transition-all cursor-pointer group">
                        Learn More
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
};

export default EcosystemSection;
