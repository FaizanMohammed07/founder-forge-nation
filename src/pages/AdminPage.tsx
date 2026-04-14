import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Download, LogOut, MessageCircle, Search, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type PaymentStatus = "approved" | "rejected" | "pending";

type AdminRegistration = {
  id: string;
  eventSlug: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  status: string;
  transactionId: string;
  amount: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T = Record<string, unknown>> = {
  success: boolean;
  message: string;
  data?: T;
};

function safeParseApiResponse<T>(raw: string): ApiResponse<T> | null {
  if (!raw.trim()) {
    return null;
  }

  try {
    return JSON.parse(raw) as ApiResponse<T>;
  } catch {
    return null;
  }
}

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<AdminRegistration[]>([]);
  const [filterStatus, setFilterStatus] = useState<"all" | PaymentStatus>("all");
  const [search, setSearch] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);

    const response = await fetch("/api/admin/get-registrations", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const raw = await response.text();
    const parsed = safeParseApiResponse<{ registrations: AdminRegistration[] }>(raw);

    if (response.status === 401) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    if (!response.ok || !parsed?.success) {
      throw new Error(parsed?.message || "Failed to fetch registrations.");
    }

    setAuthenticated(true);
    setRegistrations(parsed.data?.registrations || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRegistrations().catch((error) => {
      setLoading(false);
      toast.error(error instanceof Error ? error.message : "Failed to fetch registrations.");
    });
  }, [fetchRegistrations]);

  const filteredRows = useMemo(() => {
    return registrations.filter((item) => {
      const statusMatch = filterStatus === "all" || item.paymentStatus === filterStatus;
      const query = search.trim().toLowerCase();
      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query);

      return statusMatch && searchMatch;
    });
  }, [registrations, filterStatus, search]);

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

      const raw = await response.text();
      const parsed = safeParseApiResponse(raw);

      if (!response.ok || !parsed?.success) {
        throw new Error(parsed?.message || "Login failed.");
      }

      toast.success("Admin login successful.");
      setPassword("");
      await fetchRegistrations();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });

    setAuthenticated(false);
    setRegistrations([]);
    toast.success("Logged out.");
  };

  const updateStatus = async (registrationId: string, paymentStatus: PaymentStatus) => {
    setActionLoadingId(registrationId);

    try {
      const response = await fetch("/api/admin/update-status", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationId, paymentStatus }),
      });

      const raw = await response.text();
      const parsed = safeParseApiResponse<{ registration: AdminRegistration }>(raw);

      if (!response.ok || !parsed?.success || !parsed.data?.registration) {
        throw new Error(parsed?.message || "Status update failed.");
      }

      setRegistrations((current) =>
        current.map((item) =>
          item.id === registrationId ? parsed.data!.registration : item,
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
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
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
    const popup = window.open("", "_blank", "width=700,height=900");
    if (!popup) {
      toast.error("Popup blocked. Please allow popups to download ticket.");
      return;
    }

    popup.document.write(`
      <html>
        <head>
          <title>Registration Ticket</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
            .card { border: 2px solid #111; border-radius: 12px; padding: 20px; max-width: 640px; }
            h1 { margin: 0 0 12px; font-size: 24px; }
            p { margin: 8px 0; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Registration Ticket</h1>
            <p><strong>Registration ID:</strong> ${item.id}</p>
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Email:</strong> ${item.email}</p>
            <p><strong>Phone:</strong> ${item.phone}</p>
            <p><strong>Transaction ID:</strong> ${item.transactionId}</p>
            <p><strong>Amount:</strong> INR ${item.amount}</p>
            <p><strong>Status:</strong> ${item.paymentStatus}</p>
            <p><strong>Created At:</strong> ${new Date(item.createdAt).toLocaleString("en-IN")}</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    popup.document.close();
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
    const phoneDigits = item.phone.replace(/\D/g, "");
    const message = encodeURIComponent(
      `Hi ${item.name}, your registration is confirmed. Registration ID: ${item.id}`,
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-20 w-full bg-zinc-800/60" />
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
                          <span className={`px-2 py-1 rounded-full border text-xs ${getStatusBadgeClass(item.paymentStatus)}`}>
                            {item.paymentStatus}
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
                              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                            </a>
                            <button
                              onClick={() => handleDownloadTicketPdf(item)}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-zinc-700 text-zinc-200 hover:bg-zinc-600"
                            >
                              <Download className="w-3.5 h-3.5" /> Ticket
                            </button>
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
