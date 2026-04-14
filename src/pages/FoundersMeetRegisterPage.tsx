import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Clock, ExternalLink, Timer } from "lucide-react";
import { foundersMeetEvent } from "@/data/foundersMeetEvents";
import "./founders-meet-register.css";

type RegistrationFormData = {
  event_slug: string;
  event_name: string;
  lead_name: string;
  lead_email: string;
  lead_phone: string;
  lead_college: string;
  designation: string;
  city: string;
  linkedin: string;
  current_role: string;
  college_name: string;
  student_year: string;
  company_name: string;
  role_title: string;
};

type RegistrationResponse = {
  success: boolean;
  registrationId: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadCollege: string;
  designation?: string;
  message?: string;
};

type RegistrationErrorResponse = {
  error?: string;
  message?: string;
};

const logger = {
  info: (msg: string, data: Record<string, unknown> = {}) =>
    console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, data),
  error: (msg: string, err: unknown = {}) =>
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, err),
  debug: (msg: string, data: Record<string, unknown> = {}) =>
    console.log(`[DEBUG] ${new Date().toISOString()} - ${msg}`, data),
};

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 3,
): Promise<Response> {
  for (let i = 0; i < retries; i += 1) {
    try {
      logger.debug(`Fetch attempt ${i + 1}/${retries}`, { url });
      return await fetch(url, options);
    } catch (error) {
      logger.error(`Fetch attempt ${i + 1} failed`, { url, error });
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }

  throw new Error("Unexpected fetch failure");
}

async function submitRegistration(
  formData: RegistrationFormData,
): Promise<RegistrationResponse> {
  const response = await fetchWithRetry("/api/registrations/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const raw = await response.text();
  let data: RegistrationResponse | RegistrationErrorResponse | null = null;

  if (raw.trim()) {
    try {
      data = JSON.parse(raw) as RegistrationResponse | RegistrationErrorResponse;
    } catch (error) {
      logger.error("Registration API returned invalid JSON", {
        status: response.status,
        statusText: response.statusText,
        raw,
        error,
      });

      if (!response.ok) {
        throw new Error(`Registration failed with status ${response.status}.`);
      }

      throw new Error(
        "Registration service returned an invalid response. Please try again.",
      );
    }
  }

  if (!response.ok) {
    const errorResponse = data as RegistrationErrorResponse | null;
    throw new Error(
      errorResponse?.error ||
        errorResponse?.message ||
        `Registration failed with status ${response.status}`,
    );
  }

  if (!data) {
    throw new Error(
      "Registration service returned an empty response. Please restart the dev server and try again.",
    );
  }

  return data as RegistrationResponse;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  const clean = phone.replace(/[\s\-\(\)]/g, "");
  return /^[0-9]{10}$/.test(clean);
}

function validateFormData(data: RegistrationFormData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.lead_name.trim()) errors.push("Name is required");
  if (!data.lead_email.trim()) errors.push("Email is required");
  else if (!validateEmail(data.lead_email)) errors.push("Email is invalid");

  if (!data.lead_phone.trim()) errors.push("Phone number is required");
  else if (!validatePhone(data.lead_phone)) {
    errors.push("Phone number must be 10 digits");
  }

  if (!data.city.trim()) errors.push("City is required");
  if (!data.linkedin.trim()) errors.push("LinkedIn profile is required");
  if (!data.current_role.trim()) errors.push("Current role is required");

  if (data.current_role === "Student") {
    if (!data.college_name.trim()) {
      errors.push("College name is required for students");
    }
    if (!data.student_year.trim()) {
      errors.push("Year is required for students");
    }
  } else {
    if (!data.company_name.trim()) {
      errors.push("Company / startup name is required");
    }
    if (!data.role_title.trim()) errors.push("Role is required");
  }

  return { valid: errors.length === 0, errors };
}

const FoundersMeetRegisterPage = () => {
  const event = foundersMeetEvent;
  const isRegistrationOpen = event.status === "upcoming";

  const registrationDeadline = useMemo(
    () =>
      event.timeline?.find((item) =>
        /(registration\s*close|registrations\s*close|registration\s*closes|registrations\s*closes)/.test(
          item.title.toLowerCase(),
        ),
      ),
    [event.timeline],
  );

  const [currentRole, setCurrentRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState("Loading...");
  const [formHidden, setFormHidden] = useState(false);
  const [successData, setSuccessData] = useState<RegistrationResponse | null>(
    null,
  );
  const [successMeta, setSuccessMeta] = useState({
    city: "",
    role: "",
    org: "",
    linkedin: "",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (!registrationDeadline?.date || !isRegistrationOpen) return;

    const deadlineStr = registrationDeadline.date;
    const normalizedDeadline = /\b\d{4}\b/.test(deadlineStr)
      ? `${deadlineStr} 23:59:59`
      : `${deadlineStr}, ${new Date().getFullYear()} 23:59:59`;

    const deadline = new Date(normalizedDeadline);
    if (Number.isNaN(deadline.getTime())) {
      setCountdown("Invalid date");
      return;
    }

    const tick = () => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();
      if (diff <= 0) {
        setCountdown("Registration Closed");
        setFormHidden(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [registrationDeadline?.date, isRegistrationOpen]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const participantName = (formData.get("lead_name") || "").toString();
    const role = (formData.get("current_role") || "").toString();
    const city = (formData.get("city") || "").toString();
    const linkedin = (formData.get("linkedin") || "").toString();
    const collegeName = (formData.get("college_name") || "").toString();
    const studentYear = (formData.get("student_year") || "").toString();
    const companyName = (formData.get("company_name") || "").toString();
    const roleTitle = (formData.get("role_title") || "").toString();

    const leadCollege = role === "Student" ? collegeName : companyName;
    const designation = role === "Student" ? `Student - ${studentYear}` : roleTitle;

    const payload: RegistrationFormData = {
      event_slug: event.slug,
      event_name: event.title,
      lead_name: participantName,
      lead_email: (formData.get("lead_email") || "").toString(),
      lead_phone: (formData.get("lead_phone") || "").toString(),
      lead_college: leadCollege,
      designation,
      city,
      linkedin,
      current_role: role,
      college_name: collegeName,
      student_year: studentYear,
      company_name: companyName,
      role_title: roleTitle,
    };

    const validation = validateFormData(payload);
    if (!validation.valid) {
      setIsSubmitting(false);
      alert([
        "Please fix the following errors:",
        "",
        ...validation.errors.map((line) => `- ${line}`),
      ].join("\n"));
      return;
    }

    try {
      logger.info("Submitting registration", {
        leadName: payload.lead_name,
        leadEmail: payload.lead_email,
      });

      const result = await submitRegistration(payload);
      setSuccessData(result);
      setSuccessMeta({
        city,
        role,
        org: leadCollege,
        linkedin,
      });
      setFormHidden(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      logger.error("Registration failed", error);
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      alert(`Registration failed: ${message}\n\nCheck console (F12) for details.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="founders-meet-page">
      <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 pt-32 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.12),transparent_70%)]" />
          <div className="grid-floor opacity-20" />
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="text-center mb-10">
            <Link
              to="/events/founders-meet-2026"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Event details</span>
            </Link>

            <h1 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
              REGISTER NOW
            </h1>

            <p className="font-mono text-zinc-400 text-sm">
              Event: <span className="text-red-300">{event.title}</span>
            </p>

            <p className="mt-3 font-mono text-xs text-zinc-500 uppercase tracking-wider">
              Registration is free for all. Selected participants proceed to payment after interviews.
            </p>

            {isRegistrationOpen && registrationDeadline && (
              <div className="mt-6">
                <div className="inline-block px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-sm">
                  <div className="flex items-center gap-3">
                    <Timer className="text-red-300 w-5 h-5" />
                    <div className="text-left">
                      <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                        Registration Closes In
                      </div>
                      <div
                        className={`font-mono text-xl font-bold ${
                          countdown === "Registration Closed"
                            ? "text-red-500"
                            : "text-red-300"
                        }`}
                      >
                        {countdown}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="glass-panel p-8 md:p-12 clip-corner relative overflow-hidden">
            {!isRegistrationOpen && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
                  <Clock className="text-4xl text-yellow-500" />
                </div>
                <h2 className="font-display text-3xl text-white mb-4">
                  REGISTRATIONS PAUSED
                </h2>
                <p className="font-mono text-zinc-400 text-sm mb-8">
                  Registrations are currently unavailable. Please try again shortly.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase tracking-widest transition-colors"
                >
                  Return to Events
                </Link>
              </div>
            )}

            {successData && (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                  <Check className="text-4xl text-red-300" />
                </div>
                <h2 className="font-display text-3xl text-white mb-4">
                  REGISTRATION RECEIVED
                </h2>
                <p className="font-mono text-zinc-400 text-sm mb-8">
                  Your free registration is recorded. We will send updates to{" "}
                  <span className="text-white">{successData.leadEmail}</span>. For
                  queries, reach us at{" "}
                  <a
                    href="mailto:devupsociety@vjit.ac.in"
                    className="text-red-300 hover:underline"
                  >
                    devupsociety@vjit.ac.in
                  </a>
                  .
                </p>

                <div className="max-w-xl mx-auto mb-8 border-2 border-red-500/30 bg-red-500/10 p-5 text-left">
                  <p className="font-mono text-[11px] text-red-300 uppercase tracking-widest mb-2">
                    Mandatory Step
                  </p>
                  <p className="font-mono text-sm text-white leading-relaxed mb-4">
                    Join the official WhatsApp group now. Detailed registration
                    and next-step instructions will be shared there.
                  </p>
                  <a
                    href="https://chat.whatsapp.com/JbT6E5ut12YDlzsOapRvNY"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-red-400 transition-colors"
                  >
                    Join WhatsApp Group
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="glass-panel p-6 clip-corner text-left max-w-xl mx-auto mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-zinc-400">
                    <div>
                      <div className="text-zinc-500 uppercase tracking-widest">
                        Registration ID
                      </div>
                      <div className="text-white text-sm">
                        {successData.registrationId}
                      </div>
                    </div>
                    <div>
                      <div className="text-zinc-500 uppercase tracking-widest">Name</div>
                      <div className="text-white text-sm">{successData.leadName}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 uppercase tracking-widest">Phone</div>
                      <div className="text-white text-sm">{successData.leadPhone}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 uppercase tracking-widest">City</div>
                      <div className="text-white text-sm">{successMeta.city}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 uppercase tracking-widest">
                        Current Role
                      </div>
                      <div className="text-white text-sm">{successMeta.role}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 uppercase tracking-widest">
                        Organization / College
                      </div>
                      <div className="text-white text-sm">{successMeta.org}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 uppercase tracking-widest">LinkedIn</div>
                      <div className="text-white text-sm break-all">
                        {successMeta.linkedin}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                    Status: Free registration submitted
                  </div>
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase tracking-widest transition-colors"
                >
                  Return to Events
                </Link>
              </div>
            )}

            {isRegistrationOpen && !successData && !formHidden && (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="event_slug" value={event.slug} />
                <input type="hidden" name="event_name" value={event.title} />

                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-zinc-800 pb-2">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h3 className="font-display text-xl text-white">
                      Section 1: Basic Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-zinc-500 uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="lead_name"
                        required
                        className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-zinc-500 uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        name="lead_email"
                        required
                        className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-zinc-500 uppercase">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="lead_phone"
                        required
                        className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-zinc-500 uppercase">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="Hyderabad"
                        className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-xs text-zinc-500 uppercase">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        required
                        placeholder="https://linkedin.com/in/your-profile"
                        className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-b border-zinc-800 pb-2 pt-4">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h3 className="font-display text-xl text-white">
                      Section 2: Profile & Background
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs text-zinc-500 uppercase">
                      Current Role
                    </label>
                    <select
                      name="current_role"
                      required
                      value={currentRole}
                      onChange={(eventChange) => setCurrentRole(eventChange.target.value)}
                      className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                    >
                      <option value="">Select role</option>
                      <option value="Student">Student</option>
                      <option value="Founder">Founder</option>
                      <option value="Working Professional">Working Professional</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {currentRole === "Student" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-xs text-zinc-500 uppercase">
                          College Name
                        </label>
                        <input
                          type="text"
                          name="college_name"
                          className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-xs text-zinc-500 uppercase">
                          Year
                        </label>
                        <input
                          type="text"
                          name="student_year"
                          placeholder="1st / 2nd / 3rd / 4th"
                          className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {currentRole !== "Student" && currentRole !== "" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-mono text-xs text-zinc-500 uppercase">
                          Company / Startup Name
                        </label>
                        <input
                          type="text"
                          name="company_name"
                          className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-mono text-xs text-zinc-500 uppercase">
                          Role
                        </label>
                        <input
                          type="text"
                          name="role_title"
                          placeholder="Founder / Product Manager / Engineer"
                          className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-red-500 text-black font-mono font-bold uppercase tracking-widest hover:bg-red-400 transition-colors btn-glitch disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500 relative overflow-hidden"
                >
                  {!isSubmitting && <span>Submit Registration</span>}
                  {isSubmitting && (
                    <span className="absolute inset-0 flex items-center justify-center gap-3">
                      <svg
                        className="animate-spin h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Processing...</span>
                    </span>
                  )}
                </button>
              </form>
            )}

            {isRegistrationOpen && formHidden && !successData && (
              <div className="text-center py-10">
                <p className="font-mono text-red-500 text-sm">Registration has closed.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundersMeetRegisterPage;
