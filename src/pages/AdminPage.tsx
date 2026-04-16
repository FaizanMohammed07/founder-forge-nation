import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Download, LogOut, MessageCircle, Search, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSupabaseClient } from "@/lib/supabase";

type PaymentStatus = "approved" | "rejected" | "pending";

type AdminRegistration = {
  id: string;
  eventSlug: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  status: PaymentStatus;
  transactionId: string;
  amount: number;
  paymentStatus: PaymentStatus;
  passType: "normal" | "premium";
  ticketUrl: string;
  createdAt: string;
  updatedAt: string;
};

type SupabaseRegistration = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  pass_type: string | null;
  amount: number | null;
  transaction_id: string | null;
  status: PaymentStatus | null;
  ticket_url: string | null;
  created_at: string | null;
};

function normalizeRegistrations(data: SupabaseRegistration[]): AdminRegistration[] {
  return data.map((row) => {
    const status = row.status || "pending";
    const passType = row.pass_type === "premium" ? "premium" : "normal";

    return {
      id: row.id,
      eventSlug: "founders-meet-2026",
      name: row.name || "",
      email: row.email || "",
      phone: row.phone || "",
      organization: row.pass_type || "",
      designation: row.pass_type || "",
      status,
      transactionId: row.transaction_id || "",
      amount: Number(row.amount || 0),
      paymentStatus: status,
      passType,
      ticketUrl: row.ticket_url || "",
      createdAt: row.created_at || "",
      updatedAt: row.created_at || "",
    };
  });
}

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | PaymentStatus>("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "custom">("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    const supabase = getSupabaseClient();
    setLoading(true);

    const { data, error } = await supabase
      .from("registrations")
      .select("id,name,email,phone,pass_type,amount,transaction_id,status,ticket_url,created_at")
      .order("created_at", { ascending: false });

    console.log("ADMIN DATA:", data);
    console.log("FETCH:", data);

    if (error) {
      throw new Error(error.message || "Failed to fetch registrations.");
    }

    const normalized = normalizeRegistrations((data || []) as SupabaseRegistration[]);
    setAuthenticated(true);
    setRegistrations(normalized);
    setLoading(false);
  }, []);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    fetchRegistrations().catch((error) => {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : "Failed to fetch registrations.");
    });
  }, [fetchRegistrations]);

  const filteredRows = useMemo(() => {
    const todayKey = new Date().toISOString().slice(0, 10);

    return registrations.filter((item) => {
      const statusMatch = filterStatus === "all" || item.status === filterStatus;

      const itemDateKey = item.createdAt ? new Date(item.createdAt).toISOString().slice(0, 10) : "";
      const dateMatch =
        dateFilter === "all" ||
        (dateFilter === "today" && itemDateKey === todayKey) ||
        (dateFilter === "custom" && selectedDate && itemDateKey === selectedDate);

      const query = search.trim().toLowerCase();
      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query);

      return statusMatch && dateMatch && searchMatch;
    });
  }, [registrations, filterStatus, search, dateFilter, selectedDate]);

  const todayCount = useMemo(() => {
    const todayKey = new Date().toISOString().slice(0, 10);
    return registrations.filter((item) => {
      if (!item.createdAt) return false;
      return new Date(item.createdAt).toISOString().slice(0, 10) === todayKey;
    }).length;
  }, [registrations]);

  const handleLogin = async () => {
    if (!password.trim()) {
      toast.error("Please enter admin password.");
      return;
    }

    setAuthLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const raw = await response.text();
        throw new Error(raw || "Login failed.");
      }

      toast.success("Admin login successful.");
      localStorage.setItem("adminAuth", "true");
      setPassword("");
      await fetchRegistrations();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("adminAuth");
    setAuthenticated(false);
    setRegistrations([]);
    toast.success("Logged out.");
  };

  const updateStatus = async (registrationId: string, status: PaymentStatus) => {
    setActionLoadingId(registrationId);

    try {
      const response = await fetch("/api/admin/update-status", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationId, status }),
      });

      const raw = await response.text();
      const parsed = raw.trim()
        ? (JSON.parse(raw) as {
            success: boolean;
            message: string;
            data?: { registration?: AdminRegistration };
          })
        : null;

      if (!response.ok || !parsed?.success || !parsed.data?.registration) {
        throw new Error(parsed?.message || "Status update failed.");
      }

      setRegistrations((current) =>
        current.map((item) =>
          item.id === registrationId ? parsed.data!.registration! : item,
        ),
      );
      toast.success(parsed.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Status update failed.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCopyTransactionId = async (transactionId: string) => {
    try {
      await navigator.clipboard.writeText(transactionId);
      toast.success("Transaction ID copied.");
    } catch {
      toast.error("Failed to copy transaction ID.");
    }
  };

  const handleExportCsv = () => {
    const headers = [
      "Registration ID",
      "Name",
      "Email",
      "Phone",
      "Transaction ID",
      "Amount",
      "Payment Status",
      "Created At",
    ];

    const rows = filteredRows.map((item) => [
      item.id,
      item.name,
      item.email,
      item.phone,
      item.transactionId,
      String(item.amount),
      item.paymentStatus,
      item.createdAt,
    ]);

    const csv = [headers, ...rows]
  .map((row) => row.map((cell) => `"${String(cell).split('"').join('""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadTicketPdf = (item: AdminRegistration) => {
    if (!item.ticketUrl) {
      toast.error("Ticket URL is not available yet.");
      return;
    }

    window.open(item.ticketUrl, "_blank", "noopener,noreferrer");
  };

  const getStatusBadgeClass = (status: PaymentStatus) => {
    if (status === "approved") {
      return "bg-emerald-500/20 text-emerald-300 border-emerald-400/30";
    }
    if (status === "rejected") {
      return "bg-red-500/20 text-red-300 border-red-400/30";
    }
    return "bg-amber-500/20 text-amber-300 border-amber-400/30";
  };

  const makeWhatsAppLink = (item: AdminRegistration) => {
    const phoneDigits = Array.from(item.phone)
      .filter((char) => /\d/.test(char))
      .join("");
    const ticketLink = item.ticketUrl || `https://founder-forge-nation.vercel.app/api/tickets/get?id=${encodeURIComponent(item.id)}`;
    const message = encodeURIComponent(
      `Your registration for Founders Meet at T-Hub is confirmed. Here is your ticket: ${ticketLink}`,
    );
    return `https://wa.me/91${phoneDigits}?text=${message}`;
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white px-4 md:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl">Admin Dashboard</h1>
            <p className="text-zinc-400 text-sm mt-1">Manage event registrations and payment statuses.</p>
            <p className="text-zinc-500 text-xs mt-2">Today: {todayCount} registrations</p>
          </div>

          {authenticated && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-700 rounded-sm text-sm hover:bg-zinc-900"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}
        </div>

        {!authenticated && (
          <div className="max-w-md border border-zinc-700 bg-black/50 p-6 rounded-lg">
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">Admin Access</p>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-black/50 border border-zinc-800 focus:border-red-400 text-white px-4 py-3 outline-none transition-colors rounded-sm"
            />
            <button
              onClick={handleLogin}
              disabled={authLoading}
              className="w-full mt-4 py-3 bg-red-500 text-black font-semibold rounded-sm hover:bg-red-400 disabled:opacity-60"
            >
              {authLoading ? "Signing in..." : "Login"}
            </button>
          </div>
        )}

        {authenticated && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3">
              <label className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name or email"
                  className="w-full bg-black/50 border border-zinc-700 pl-9 pr-3 py-2.5 rounded-sm text-sm"
                />
              </label>

              <button
                onClick={() => setFilterStatus("pending")}
                className={`px-4 py-2.5 rounded-sm border text-sm ${filterStatus === "pending" ? "border-amber-400 text-amber-300" : "border-zinc-700"}`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus("approved")}
                className={`px-4 py-2.5 rounded-sm border text-sm ${filterStatus === "approved" ? "border-emerald-400 text-emerald-300" : "border-zinc-700"}`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilterStatus("rejected")}
                className={`px-4 py-2.5 rounded-sm border text-sm ${filterStatus === "rejected" ? "border-red-400 text-red-300" : "border-zinc-700"}`}
              >
                Rejected
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr] gap-3">
              <button
                onClick={() => {
                  setDateFilter("today");
                  setSelectedDate("");
                }}
                className={`px-4 py-2.5 rounded-sm border text-sm ${dateFilter === "today" ? "border-red-400 text-red-300" : "border-zinc-700"}`}
              >
                Today&apos;s registrations
              </button>
              <button
                onClick={() => {
                  setDateFilter("all");
                  setSelectedDate("");
                }}
                className={`px-4 py-2.5 rounded-sm border text-sm ${dateFilter === "all" ? "border-zinc-300 text-white" : "border-zinc-700"}`}
              >
                All dates
              </button>
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => {
                  setSelectedDate(event.target.value);
                  setDateFilter(event.target.value ? "custom" : "all");
                }}
                className="bg-black/50 border border-zinc-700 px-3 py-2.5 rounded-sm text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setFilterStatus("all")}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Show all
              </button>
              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-sm text-sm"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {loading && (
              <div className="space-y-3">
                {["a", "b", "c", "d", "e"].map((id) => (
                  <Skeleton key={`admin-skeleton-${id}`} className="h-20 w-full bg-zinc-800/60" />
                ))}
              </div>
            )}

            {!loading && (
              <div className="overflow-x-auto border border-zinc-800 rounded-lg">
                <table className="min-w-[1200px] w-full text-sm">
                  <thead className="bg-zinc-900/80 text-zinc-300">
                    <tr>
                      <th className="text-left p-3">Name</th>
                      <th className="text-left p-3">Email</th>
                      <th className="text-left p-3">Phone</th>
                      <th className="text-left p-3">Pass Type</th>
                      <th className="text-left p-3">Transaction ID</th>
                      <th className="text-left p-3">Amount</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((item) => (
                      <tr key={item.id} className="border-t border-zinc-800 align-top">
                        <td className="p-3">
                          <div className="font-medium text-white">{item.name}</div>
                          <div className="text-xs text-zinc-500">{item.id}</div>
                        </td>
                        <td className="p-3 text-zinc-300">{item.email}</td>
                        <td className="p-3 text-zinc-300">{item.phone}</td>
                        <td className="p-3 text-zinc-300 capitalize">{item.passType}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-300">{item.transactionId || "-"}</span>
                            {!!item.transactionId && (
                              <button
                                onClick={() => handleCopyTransactionId(item.transactionId)}
                                className="p-1 rounded hover:bg-zinc-800"
                                title="Copy transaction ID"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-zinc-300">INR {item.amount || 0}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full border text-xs ${getStatusBadgeClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-zinc-400">{item.createdAt ? new Date(item.createdAt).toLocaleString("en-IN") : "-"}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-2">
                            <button
                              disabled={actionLoadingId === item.id}
                              onClick={() => updateStatus(item.id, "approved")}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-50"
                            >
                              <Check className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button
                              disabled={actionLoadingId === item.id}
                              onClick={() => updateStatus(item.id, "rejected")}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 disabled:opacity-50"
                            >
                              <X className="w-3.5 h-3.5" /> Reject
                            </button>
                            <a
                              href={makeWhatsAppLink(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/20 text-green-300 hover:bg-green-500/30"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Ticket
                            </a>
                            {item.status === "approved" && (
                              <button
                                onClick={() => handleDownloadTicketPdf(item)}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-700 text-zinc-200 hover:bg-zinc-600"
                              >
                                <Download className="w-3.5 h-3.5" /> Ticket
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {!filteredRows.length && (
                  <div className="p-6 text-center text-zinc-500">No registrations found.</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
