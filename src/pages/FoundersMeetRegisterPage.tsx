import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Clock,
  Crown,
  Sparkles,
  Ticket,
  Timer,
} from "lucide-react";
import { toast } from "sonner";
import { foundersMeetEvent } from "@/data/foundersMeetEvents";
import { getSupabaseClient } from "@/lib/supabase";
import "./founders-meet-register.css";

type PassType = "normal" | "premium";

type RegistrationFormData = {
  event_slug: string;
  event_name: string;
  pass_type: PassType;
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
  payment_transaction_id: string;
  payment_amount: number;
};

type RegistrationResponse = {
  registrationId: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadCollege: string;
  designation?: string;
  paymentTransactionId?: string;
  paymentAmount?: number;
  passType?: PassType;
  status?: "pending" | "approved" | "rejected";
};

type SuccessMeta = {
  city: string;
  role: string;
  org: string;
  linkedin: string;
  passType: PassType;
};

const WHATSAPP_COMMUNITY_URL =
  "https://chat.whatsapp.com/JbT6E5ut12YDlzsOapRvNY";

const TICKET_PARTNERS = [
  {
    name: "Startups India",
    kind: "image" as const,
    imageUrl:
      "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1770106897/Startups_India_Logo_ba8vml.png",
  },
  {
    name: "DevUp Society",
    kind: "image" as const,
    imageUrl:
      "https://res.cloudinary.com/dmrp1d1tv/image/upload/q_auto/f_auto/v1776086729/favicon_sox9m8.png",
  },
  { name: "I&E", kind: "text" as const },
  { name: "ISI", kind: "text" as const },
  {
    name: "T-Hub",
    kind: "image" as const,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/T-Hub_Logo-PNG.png",
  },
];

const logger = {
  info: (msg: string, data: Record<string, unknown> = {}) =>
    console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, data),
  error: (msg: string, err: unknown = {}) =>
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, err),
  debug: (msg: string, data: Record<string, unknown> = {}) =>
    console.log(`[DEBUG] ${new Date().toISOString()} - ${msg}`, data),
};

type RegistrationInsert = {
  name: string;
  email: string;
  phone: string;
  pass_type: PassType;
  amount: number;
  transaction_id: string;
  status: "pending";
  created_at: string;
  event_slug: string;
  event_name: string;
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

type RegistrationRow = RegistrationInsert & {
  id: string;
};

async function submitRegistration(
  formData: RegistrationFormData,
): Promise<RegistrationResponse> {
  const supabase = getSupabaseClient();

  const insertPayload: RegistrationInsert = {
    name: formData.lead_name.trim(),
    email: formData.lead_email.trim().toLowerCase(),
    phone: formData.lead_phone.trim(),
    pass_type: formData.pass_type,
    amount: formData.payment_amount,
    transaction_id: formData.payment_transaction_id.trim(),
    status: "pending",
    created_at: new Date().toISOString(),
    event_slug: formData.event_slug,
    event_name: formData.event_name,
    lead_college: formData.lead_college,
    designation: formData.designation,
    city: formData.city,
    linkedin: formData.linkedin,
    current_role: formData.current_role,
    college_name: formData.college_name,
    student_year: formData.student_year,
    company_name: formData.company_name,
    role_title: formData.role_title,
  };

  console.log("FORM:", insertPayload);

  const { data, error } = await supabase
    .from("registrations")
    .insert([insertPayload])
    .select(
      "id,name,email,phone,pass_type,amount,transaction_id,status,event_slug,event_name,lead_college,designation,city,linkedin,current_role,college_name,student_year,company_name,role_title,created_at",
    )
    .single<RegistrationRow>();

  console.log("INSERT RESULT:", data, error);

  if (error || !data) {
    throw new Error(error?.message || "Registration insert failed.");
  }

  return {
    registrationId: data.id,
    leadName: data.name,
    leadEmail: data.email,
    leadPhone: data.phone,
    leadCollege: data.lead_college,
    designation: data.designation,
    paymentTransactionId: data.transaction_id,
    paymentAmount: data.amount,
    passType: data.pass_type,
    status: data.status,
  };
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  const clean = phone.replace(/[\s\-\(\)]/g, "");
  return /^[0-9]{10}$/.test(clean);
}

function validateTransactionId(transactionId: string): boolean {
  return /^[a-zA-Z0-9\-]{8,40}$/.test(transactionId.trim());
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapSvgText(value: string, maxLength = 28): string[] {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxLength) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
    }
    current = word;
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 2);
}

function formatTicketId(registrationId: string): string {
  return registrationId.slice(0, 8).toUpperCase();
}

function buildTicketMarkup({
  attendeeName,
  attendeeEmail,
  passName,
  ticketId,
  qrCodeUrl,
}: {
  attendeeName: string;
  attendeeEmail: string;
  passName: string;
  ticketId: string;
  qrCodeUrl: string;
}): string {
  const attendeeLines = wrapSvgText(attendeeName, 24);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720" role="img" aria-label="Founders Meet ticket">
      <defs>
        <linearGradient id="ticketBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#060606" />
          <stop offset="50%" stop-color="#141414" />
          <stop offset="100%" stop-color="#080808" />
        </linearGradient>
        <linearGradient id="ticketAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ef4444" />
          <stop offset="100%" stop-color="#ccff00" />
        </linearGradient>
        <filter id="ticketGlow">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>
      <rect width="1200" height="720" rx="36" fill="url(#ticketBg)" />
      <circle cx="1010" cy="120" r="140" fill="#ef4444" opacity="0.18" filter="url(#ticketGlow)" />
      <circle cx="260" cy="640" r="180" fill="#ccff00" opacity="0.1" filter="url(#ticketGlow)" />
      <rect x="40" y="40" width="1120" height="640" rx="28" fill="none" stroke="rgba(255,255,255,0.12)" />
      <rect x="64" y="64" width="730" height="592" rx="24" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
      <rect x="820" y="64" width="316" height="592" rx="24" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
      <rect x="64" y="64" width="730" height="10" rx="5" fill="url(#ticketAccent)" />
      <text x="110" y="128" fill="#f87171" font-size="20" font-family="Arial, Helvetica, sans-serif" letter-spacing="5">FOUNDERS MEET</text>
      <text x="110" y="182" fill="#ffffff" font-size="52" font-weight="700" font-family="Arial, Helvetica, sans-serif">Congratulations, You&apos;re Registered</text>
      <text x="110" y="222" fill="#b3b3b3" font-size="22" font-family="Arial, Helvetica, sans-serif">Your event pass is confirmed for April 18 at T-Hub, 4:00 PM.</text>
      <rect x="110" y="270" width="248" height="66" rx="16" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.28)" />
      <text x="134" y="297" fill="#fca5a5" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">PASS TYPE</text>
      <text x="134" y="323" fill="#ffffff" font-size="28" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(passName)}</text>
      <text x="110" y="394" fill="#8f8f8f" font-size="16" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">ATTENDEE</text>
      ${attendeeLines
        .map(
          (line, index) =>
            `<text x="110" y="${438 + index * 42}" fill="#ffffff" font-size="34" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(line)}</text>`,
        )
        .join("")}
      <text x="110" y="520" fill="#b3b3b3" font-size="20" font-family="Arial, Helvetica, sans-serif">${escapeXml(attendeeEmail)}</text>
      <line x1="110" y1="560" x2="748" y2="560" stroke="rgba(255,255,255,0.1)" />
      <text x="110" y="604" fill="#8f8f8f" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">EVENT</text>
      <text x="110" y="632" fill="#ffffff" font-size="22" font-family="Arial, Helvetica, sans-serif">Founders Meet</text>
      <text x="286" y="604" fill="#8f8f8f" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">VENUE</text>
      <text x="286" y="632" fill="#ffffff" font-size="22" font-family="Arial, Helvetica, sans-serif">T-Hub</text>
      <text x="440" y="604" fill="#8f8f8f" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">DATE</text>
      <text x="440" y="632" fill="#ffffff" font-size="22" font-family="Arial, Helvetica, sans-serif">April 18</text>
      <text x="586" y="604" fill="#8f8f8f" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">TIME</text>
      <text x="586" y="632" fill="#ffffff" font-size="22" font-family="Arial, Helvetica, sans-serif">4:00 PM</text>
      <text x="858" y="122" fill="#8f8f8f" font-size="15" font-family="Arial, Helvetica, sans-serif" letter-spacing="4">TICKET ID</text>
      <text x="858" y="154" fill="#ffffff" font-size="34" font-weight="700" font-family="Arial, Helvetica, sans-serif">${escapeXml(ticketId)}</text>
      <image href="${qrCodeUrl}" x="872" y="200" width="212" height="212" preserveAspectRatio="xMidYMid meet" />
      <text x="978" y="442" fill="#b3b3b3" font-size="16" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">Scan for verification</text>
      <rect x="858" y="486" width="240" height="106" rx="18" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
      <text x="882" y="520" fill="#8f8f8f" font-size="14" font-family="Arial, Helvetica, sans-serif" letter-spacing="3">ACCESS NOTE</text>
      <text x="882" y="548" fill="#ffffff" font-size="19" font-family="Arial, Helvetica, sans-serif">Carry this pass at check-in</text>
      <text x="882" y="576" fill="#b3b3b3" font-size="17" font-family="Arial, Helvetica, sans-serif">Present on phone or print.</text>
      <g transform="translate(110 92)">
        <rect x="0" y="0" width="132" height="54" rx="14" fill="rgba(255,255,255,0.92)" />
        <image href="${TICKET_PARTNERS[0].imageUrl}" x="14" y="10" width="104" height="34" preserveAspectRatio="xMidYMid meet" />
      </g>
      <g transform="translate(254 92)">
        <rect x="0" y="0" width="132" height="54" rx="14" fill="rgba(255,255,255,0.92)" />
        <image href="${TICKET_PARTNERS[1].imageUrl}" x="38" y="11" width="56" height="32" preserveAspectRatio="xMidYMid meet" />
      </g>
      <g transform="translate(398 92)">
        <rect x="0" y="0" width="96" height="54" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.08)" />
        <text x="48" y="34" fill="#ffffff" font-size="22" font-weight="700" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">I&amp;E</text>
      </g>
      <g transform="translate(506 92)">
        <rect x="0" y="0" width="96" height="54" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.08)" />
        <text x="48" y="34" fill="#ffffff" font-size="22" font-weight="700" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">ISI</text>
      </g>
      <g transform="translate(614 92)">
        <rect x="0" y="0" width="120" height="54" rx="14" fill="rgba(255,255,255,0.92)" />
        <image href="${TICKET_PARTNERS[4].imageUrl}" x="16" y="12" width="88" height="30" preserveAspectRatio="xMidYMid meet" />
      </g>
    </svg>
  `.trim();
}

function validateFormData(data: RegistrationFormData): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.pass_type) errors.push("Pass type is required");
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
  const passOptions = event.passes ?? [];
  const defaultPass = passOptions[0]?.id ?? "normal";
  const [selectedPass, setSelectedPass] = useState<PassType>(defaultPass);
  const selectedPassDetails = useMemo(
    () => passOptions.find((item) => item.id === selectedPass) ?? passOptions[0],
    [passOptions, selectedPass],
  );

  const registrationDeadline = useMemo(() => {
    if (!event.registrationDeadlineAt) return null;
    const parsed = new Date(event.registrationDeadlineAt);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }, [event.registrationDeadlineAt]);

  const isRegistrationOpen =
    event.status === "upcoming" &&
    (!registrationDeadline || Date.now() < registrationDeadline.getTime());

  const [currentRole, setCurrentRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessLoading, setIsSuccessLoading] = useState(false);
  const [showPaymentStep, setShowPaymentStep] = useState(false);
  const [countdown, setCountdown] = useState("Loading...");
  const [formHidden, setFormHidden] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [successData, setSuccessData] = useState<RegistrationResponse | null>(null);
  const pendingSuccessTimerRef = useRef<number | null>(null);
  const [successMeta, setSuccessMeta] = useState<SuccessMeta>({
    city: "",
    role: "",
    org: "",
    linkedin: "",
    passType: defaultPass,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    return () => {
      if (pendingSuccessTimerRef.current !== null) {
        window.clearTimeout(pendingSuccessTimerRef.current);
      }

    };
  }, []);

  useEffect(() => {
    if (!registrationDeadline || !isRegistrationOpen) return;

    const tick = () => {
      const diff = registrationDeadline.getTime() - Date.now();
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
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [isRegistrationOpen, registrationDeadline]);

  const paymentAmount = selectedPassDetails?.price ?? event.fee ?? 1000;
  const receiverUpiId =
    import.meta.env.VITE_FOUNDERS_MEET_UPI_ID || "devupsociety@upi";
  const receiverName = "DevUp Society";
  const upiNote = `${event.slug} ${selectedPassDetails?.name ?? "Pass"}`;
  const upiPaymentLink = `upi://pay?pa=${encodeURIComponent(receiverUpiId)}&pn=${encodeURIComponent(receiverName)}&am=${paymentAmount}&cu=INR&tn=${encodeURIComponent(upiNote)}`;
  const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(upiPaymentLink)}&size=320`;

  const ticketPayload = useMemo(() => {
    if (!successData || successData.status !== "approved") return null;

    const passName =
      passOptions.find((item) => item.id === successMeta.passType)?.name ??
      "Normal Pass";
    const ticketId = formatTicketId(successData.registrationId);
    const qrPayload = `FOUNDERS-MEET|${ticketId}|${successData.leadName}|${passName}`;
    const ticketQrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(qrPayload)}&size=280`;
    const markup = buildTicketMarkup({
      attendeeName: successData.leadName,
      attendeeEmail: successData.leadEmail,
      passName,
      ticketId,
      qrCodeUrl: ticketQrCodeUrl,
    });
    const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;

    return { markup, src, ticketId, passName };
  }, [passOptions, successData, successMeta.passType]);

  const buildPayload = (formData: FormData): RegistrationFormData => {
    const participantName = (formData.get("lead_name") || "").toString();
    const role = (formData.get("current_role") || "").toString();
    const city = (formData.get("city") || "").toString();
    const linkedin = (formData.get("linkedin") || "").toString();
    const collegeName = (formData.get("college_name") || "").toString();
    const studentYear = (formData.get("student_year") || "").toString();
    const companyName = (formData.get("company_name") || "").toString();
    const roleTitle = (formData.get("role_title") || "").toString();
    const paymentTransactionId =
      (formData.get("payment_transaction_id") || "").toString();

    const leadCollege = role === "Student" ? collegeName : companyName;
    const designation = role === "Student" ? `Student - ${studentYear}` : roleTitle;

    return {
      event_slug: event.slug,
      event_name: event.title,
      pass_type: selectedPass,
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
      payment_transaction_id: paymentTransactionId,
      payment_amount: paymentAmount,
    };
  };

  const handleContinueToPayment = () => {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const payload = buildPayload(formData);
    const validation = validateFormData(payload);

    if (!validation.valid) {
      toast.error("Please complete all required fields before proceeding.");
      return;
    }

    setShowPaymentStep(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = buildPayload(formData);

    const validation = validateFormData(payload);
    if (!validation.valid) {
      setIsSubmitting(false);
      toast.error("Please fix the highlighted details and try again.");
      return;
    }

    if (!showPaymentStep) {
      setIsSubmitting(false);
      handleContinueToPayment();
      return;
    }

    if (!validateTransactionId(payload.payment_transaction_id)) {
      setIsSubmitting(false);
      toast.error("Please enter a valid transaction ID.");
      return;
    }

    try {
      logger.info("Submitting registration", {
        leadName: payload.lead_name,
        leadEmail: payload.lead_email,
        paymentTransactionId: payload.payment_transaction_id,
        passType: payload.pass_type,
      });

      const result = await submitRegistration(payload);
      setFormHidden(true);
      setIsSuccessLoading(true);
      pendingSuccessTimerRef.current = window.setTimeout(() => {
        setSuccessData(result);
        setIsSuccessLoading(false);
        pendingSuccessTimerRef.current = null;
      }, 1400);
      setSuccessMeta({
        city: payload.city,
        role: payload.current_role,
        org: payload.lead_college,
        linkedin: payload.linkedin,
        passType: result.passType ?? payload.pass_type,
      });
  toast.success("Registration Submitted Successfully. Awaiting Confirmation.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      logger.error("Registration failed", error);
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Registration failed: ${message}`);
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

        <div className="relative z-10 w-full max-w-6xl">
          <div className="text-center mb-8 md:mb-10">
            <Link
              to="/events/founders-meet-2026"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-white font-mono text-[11px] md:text-xs uppercase tracking-widest transition-colors mb-4 md:mb-6"
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
              Choose your pass, complete your details, and finish payment to confirm your seat.
            </p>

            {event.registrationNotice && (
              <div className="mt-4 founders-meet-subtle-notice">
                <Sparkles className="w-4 h-4 text-red-300" />
                <span>{event.registrationNotice}</span>
              </div>
            )}

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

          <div className="glass-panel p-5 md:p-12 clip-corner relative overflow-hidden">
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
                  Return to HomePage
                </Link>
              </div>
            )}

            {isSuccessLoading && !successData && (
              <div className="min-h-[520px] flex items-center justify-center text-center py-14 px-4">
                <div className="max-w-md w-full">
                  <div className="mx-auto mb-6 h-20 w-20 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center">
                    <svg
                      className="h-9 w-9 animate-spin text-red-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-20"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-100"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                  <p className="font-mono text-[11px] text-red-300 uppercase tracking-[0.35em] mb-3">
                    Submitting Registration
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                    Registration received
                  </h2>
                  <p className="font-mono text-sm md:text-base text-zinc-400 leading-relaxed">
                    We are verifying your payment details and pass selection.
                  </p>
                </div>
              </div>
            )}

            {successData && (
              <div className="py-4 md:py-6">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <Check className="text-4xl text-red-300" />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                    Registration Submitted Successfully. Awaiting Confirmation.
                  </h2>
                  <p className="font-mono text-zinc-400 text-sm max-w-2xl mx-auto">
                    Your registration is now <span className="text-amber-300">awaiting admin confirmation</span>.
                    We will verify payment details and send your ticket only after approval.
                  </p>
                  {ticketPayload && (
                    <p className="font-mono text-emerald-300 text-xs mt-3">
                      Ticket ready: {ticketPayload.ticketId}
                    </p>
                  )}
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="glass-panel p-5 clip-corner text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-400">
                        <div>
                          <div className="text-zinc-500 uppercase tracking-widest">Registration ID</div>
                          <div className="text-white text-sm break-all">
                            {successData.registrationId}
                          </div>
                        </div>
                        <div>
                          <div className="text-zinc-500 uppercase tracking-widest">Pass</div>
                          <div className="text-white text-sm">
                            {successData.passType === "premium" ? "Premium Pass" : "Normal Pass"}
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
                          <div className="text-zinc-500 uppercase tracking-widest">Venue</div>
                          <div className="text-white text-sm">T-Hub</div>
                        </div>
                        <div>
                          <div className="text-zinc-500 uppercase tracking-widest">Time</div>
                          <div className="text-white text-sm">April 18, 4:00 PM</div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="text-zinc-500 uppercase tracking-widest">Email</div>
                          <div className="text-white text-sm break-all">
                            {successData.leadEmail}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-panel p-5 clip-corner text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-400">
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
                          <div className="text-zinc-500 uppercase tracking-widest">Status</div>
                          <div className="text-amber-300 text-sm">Pending admin confirmation</div>
                        </div>
                        <div className="sm:col-span-2">
                          <div className="text-zinc-500 uppercase tracking-widest">LinkedIn</div>
                          <div className="text-white text-sm break-all">
                            {successMeta.linkedin}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/10">
                        <p className="font-mono text-xs text-zinc-400 leading-relaxed">
                          Ticket generation is approval-based. Once approved, your ticket will be
                          sent through email/WhatsApp by the admin team.
                        </p>
                      </div>
                    </div>
                </div>
              </div>
            )}

            {isRegistrationOpen && !successData && !formHidden && (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="event_slug" value={event.slug} />
                <input type="hidden" name="event_name" value={event.title} />
                <input type="hidden" name="pass_type" value={selectedPass} />

                <section className="space-y-5">
                  <div className="flex items-center gap-3 border-b border-zinc-800 pb-2">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h3 className="font-display text-xl text-white">Choose Your Pass</h3>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    {passOptions.map((pass) => {
                      const isSelected = pass.id === selectedPass;
                      const isPremium = pass.id === "premium";

                      return (
                        <button
                          key={pass.id}
                          type="button"
                          onClick={() => setSelectedPass(pass.id)}
                          className={`founders-pass-card ${isSelected ? "is-selected" : ""} ${isPremium ? "is-premium" : ""}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                {isPremium ? (
                                  <Crown className="w-4 h-4 text-[#ccff00]" />
                                ) : (
                                  <Ticket className="w-4 h-4 text-red-300" />
                                )}
                                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                                  {pass.shortLabel}
                                </span>
                              </div>
                              <h4 className="font-display text-2xl text-white">{pass.name}</h4>
                            </div>

                            {pass.badge && (
                              <span className="founders-pass-badge">{pass.badge}</span>
                            )}
                          </div>

                          <div className="mt-6 flex items-end gap-2">
                            <span className="font-display text-4xl text-white">
                              Rs. {pass.price}
                            </span>
                            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 pb-1">
                              per attendee
                            </span>
                          </div>

                          <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                            {pass.description}
                          </p>

                          <div className="mt-6 space-y-3">
                            {pass.benefits.map((benefit) => (
                              <div
                                key={benefit}
                                className="flex items-start gap-3 text-sm text-zinc-200"
                              >
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-red-400" />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-zinc-800 pb-2">
                    <span className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h3 className="font-display text-xl text-white">
                      Section 2: Basic Details
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

                    <div className="space-y-2 md:col-span-2">
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
                      3
                    </span>
                    <h3 className="font-display text-xl text-white">
                      Section 3: Profile & Background
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

                  {showPaymentStep && (
                    <div className="border border-red-500/30 bg-red-500/5 rounded-2xl p-4 md:p-6 space-y-4">
                      <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                        <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-300 flex items-center justify-center font-bold text-xs">
                          4
                        </span>
                        <h3 className="font-display text-xl text-white">
                          Section 4: UPI Payment
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                          Selected Pass
                        </span>
                        <span className="px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-200 text-xs font-mono uppercase tracking-widest">
                          {selectedPassDetails?.name}
                        </span>
                        <span className="font-display text-2xl text-white">
                          Rs. {paymentAmount}
                        </span>
                      </div>

                      <p className="font-mono text-xs text-zinc-300 leading-relaxed">
                        Follow these steps:
                        <br />1. Pay{" "}
                        <span className="text-red-300 font-bold">INR {paymentAmount}</span>{" "}
                        using UPI.
                        <br />2. Copy your transaction ID from the payment app.
                        <br />3. Paste it below and submit to generate your event ticket.
                      </p>

                      <div className="border border-amber-400/40 bg-amber-500/10 text-amber-200 rounded-sm px-3 py-2 text-xs font-mono">
                        Only INR {paymentAmount} payments will be accepted for this pass.
                      </div>

                      <div className="rounded-2xl bg-black/40 border border-zinc-700 p-4 flex flex-col items-center gap-3">
                        <div className="w-full grid grid-cols-2 gap-2 text-[11px] font-mono">
                          <div className="border border-zinc-700 rounded-sm p-2 text-zinc-300">
                            UPI ID: <span className="text-white">{receiverUpiId}</span>
                          </div>
                          <div className="border border-zinc-700 rounded-sm p-2 text-zinc-300 text-right">
                            Amount: <span className="text-white">INR {paymentAmount}</span>
                          </div>
                        </div>
                        <img
                          src={qrCodeUrl}
                          alt="UPI payment QR code"
                          className="w-56 h-56 md:w-64 md:h-64 rounded-md border border-zinc-700 bg-white p-2"
                          loading="lazy"
                        />
                        <a
                          href={upiPaymentLink}
                          className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-3 bg-red-500 text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-red-400 transition-colors rounded-sm"
                        >
                          Pay Now
                        </a>
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-xs text-zinc-500 uppercase">
                          Transaction ID
                        </label>
                        <input
                          type="text"
                          name="payment_transaction_id"
                          required
                          placeholder="Enter UPI transaction ID"
                          className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {!showPaymentStep && (
                  <button
                    type="button"
                    onClick={handleContinueToPayment}
                    className="w-full py-4 bg-red-500 text-black font-mono font-bold uppercase tracking-widest hover:bg-red-400 transition-colors btn-glitch rounded-sm"
                  >
                    Next: Payment
                  </button>
                )}

                {showPaymentStep && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-red-500 text-black font-mono font-bold uppercase tracking-widest hover:bg-red-400 transition-colors btn-glitch disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-500 relative overflow-hidden rounded-sm"
                  >
                    {!isSubmitting && <span>Submit Payment & Generate Ticket</span>}
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
                )}
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
