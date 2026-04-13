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
    description:
      "Transform raw ideas into validated concepts through intensive research and market analysis.",
    metrics: "0-3 Days",
    color: "from-purple-500 to-indigo-600",
    bgGlow: "bg-purple-500/20",
  },
  {
    icon: Beaker,
    label: "Pre-Incubation",
    tagline: "Validation Sprint",
    description:
      "Rigorous hypothesis testing, customer discovery, and problem-solution fit validation.",
    metrics: "3-6 Days",
    color: "from-blue-500 to-cyan-600",
    bgGlow: "bg-blue-500/20",
  },
  {
    icon: Building,
    label: "Incubation",
    tagline: "MVP Development",
    description:
      "Build your minimum viable product, achieve product-market fit, and secure early users.",
    metrics: "6-12 Days",
    color: "from-cyan-500 to-teal-600",
    bgGlow: "bg-cyan-500/20",
  },
  {
    icon: Rocket,
    label: "Accelerator",
    tagline: "Growth Engine",
    description:
      "High-velocity scaling, user acquisition optimization, and metrics-driven expansion.",
    metrics: "12-18 Days",
    color: "from-orange-500 to-red-600",
    bgGlow: "bg-orange-500/20",
  },
  {
    icon: Banknote,
    label: "Funding",
    tagline: "Capital Raise",
    description:
      "Pitch to investors, negotiate term sheets, and secure venture capital for exponential growth.",
    metrics: "18-24 Days",
    color: "from-green-500 to-emerald-600",
    bgGlow: "bg-green-500/20",
  },
  {
    icon: TrendingUp,
    label: "Startup Growth",
    tagline: "Scale & Dominate",
    description:
      "Market leadership, team expansion, enterprise partnerships, and sustainable profitability.",
    metrics: "24+ Days",
    color: "from-rose-500 to-pink-600",
    bgGlow: "bg-rose-500/20",
  },
];

const EcosystemSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-40 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E50914]/10 to-purple-500/10 border border-[#E50914]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#E50914]" />
            <span className="text-[11px] font-black tracking-[0.2em] uppercase bg-gradient-to-r from-[#E50914] to-purple-600 bg-clip-text text-transparent">
              The Evolution Path
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight mb-6">
            Your Startup{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E50914] via-purple-600 to-blue-600">
              Journey
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
            A comprehensive, battle-tested framework designed to transform
            ambitious students into{" "}
            <span className="font-semibold text-[#E50914]">
              venture-backed founders
            </span>
          </p>
        </div>

        {/* Desktop Journey Timeline */}
        <div className="hidden lg:block relative max-w-[1400px] mx-auto mb-24">
          {/* Connection Line */}
          <div className="absolute top-[100px] left-[8%] right-[8%] h-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full" />

          {/* Active Progress Line */}
          <div
            className="absolute top-[100px] left-[8%] h-1 bg-gradient-to-r from-[#E50914] via-purple-500 to-blue-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(229,9,20,0.6)]"
            style={{
              width:
                selectedIndex !== null
                  ? `${(selectedIndex / (steps.length - 1)) * 84}%`
                  : "0%",
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.8)] animate-pulse" />
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
                        ? `border-[#E50914] bg-gradient-to-br ${step.color} shadow-[0_20px_60px_rgba(0,0,0,0.3)]`
                        : "border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg"
                    } ${
                      isHovered || isSelected
                        ? "scale-110 -translate-y-4"
                        : "scale-100"
                    }`}
                  >
                    {/* Glow Effect */}
                    {isActive && (
                      <div
                        className={`absolute inset-0 ${step.bgGlow} blur-2xl rounded-2xl -z-10 animate-pulse`}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`mb-4 transition-all duration-500 ${isActive ? "text-white" : "text-gray-700"}`}
                    >
                      <step.icon className="w-12 h-12" strokeWidth={1.5} />
                    </div>

                    {/* Stage Number */}
                    <div
                      className={`text-[10px] font-black tracking-[0.2em] uppercase mb-2 ${isActive ? "text-white/80" : "text-gray-400"}`}
                    >
                      Stage {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Label */}
                    <h3
                      className={`font-black text-lg text-center mb-1 ${isActive ? "text-white" : "text-gray-900"}`}
                    >
                      {step.label}
                    </h3>

                    {/* Tagline */}
                    <p
                      className={`text-xs font-medium text-center ${isActive ? "text-white/90" : "text-gray-500"}`}
                    >
                      {step.tagline}
                    </p>

                    {/* Metrics Badge */}
                    <div
                      className={`mt-4 px-3 py-1 rounded-full text-[10px] font-bold ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}
                    >
                      {step.metrics}
                    </div>

                    {/* Expand Indicator */}
                    {(isHovered || isSelected) && (
                      <div className="absolute bottom-3 right-3">
                        <ChevronRight
                          className={`w-5 h-5 ${isActive ? "text-white" : "text-[#E50914]"} animate-bounce`}
                        />
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
                      ? `border-[#E50914] bg-gradient-to-br ${step.color} shadow-[0_20px_60px_rgba(0,0,0,0.3)]`
                      : "border-gray-200 bg-white shadow-lg"
                  }`}
                >
                  {isSelected && (
                    <div
                      className={`absolute inset-0 ${step.bgGlow} blur-2xl rounded-2xl -z-10 animate-pulse`}
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${isSelected ? "bg-white/20" : "bg-gray-100"}`}
                    >
                      <step.icon
                        className={`w-8 h-8 ${isSelected ? "text-white" : "text-gray-700"}`}
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="flex-1">
                      <div
                        className={`text-[10px] font-black tracking-[0.2em] uppercase mb-1 ${isSelected ? "text-white/80" : "text-gray-400"}`}
                      >
                        Stage {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3
                        className={`font-black text-xl mb-1 ${isSelected ? "text-white" : "text-gray-900"}`}
                      >
                        {step.label}
                      </h3>
                      <p
                        className={`text-sm font-medium mb-2 ${isSelected ? "text-white/90" : "text-gray-500"}`}
                      >
                        {step.tagline}
                      </p>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${isSelected ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}
                      >
                        {step.metrics}
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 shrink-0 transition-transform ${isSelected ? "rotate-90 text-white" : "text-gray-400"}`}
                    />
                  </div>

                  {isSelected && (
                    <div className="mt-6 pt-6 border-t border-white/20">
                      <p className="text-white/90 leading-relaxed">
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
        {selectedIndex !== null &&
          (() => {
            const SelectedIcon = steps[selectedIndex].icon;
            return (
              <div className="hidden lg:block">
                <div className="max-w-4xl mx-auto">
                  <div
                    className={`relative rounded-3xl p-12 bg-gradient-to-br ${steps[selectedIndex].color} border-2 border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.3)]`}
                  >
                    <div
                      className={`absolute inset-0 ${steps[selectedIndex].bgGlow} blur-3xl rounded-3xl -z-10 animate-pulse`}
                    />

                    <div className="flex items-start gap-8">
                      <div className="shrink-0 w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <SelectedIcon
                          className="w-12 h-12 text-white"
                          strokeWidth={1.5}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="text-[11px] font-black tracking-[0.2em] uppercase text-white/80 mb-2">
                          Stage {String(selectedIndex + 1).padStart(2, "0")} •{" "}
                          {steps[selectedIndex].metrics}
                        </div>
                        <h3 className="text-4xl font-black text-white mb-3">
                          {steps[selectedIndex].label}
                        </h3>
                        <p className="text-lg text-white/90 font-light leading-relaxed mb-6">
                          {steps[selectedIndex].description}
                        </p>

                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold hover:bg-white/30 transition-all cursor-pointer group">
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
