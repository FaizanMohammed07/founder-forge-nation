import type { DashboardRegistration } from "./googleSheets.js";
import { getSupabaseAdminClient } from "./supabaseAdmin.js";

export type RegistrationStatus = "pending" | "approved" | "rejected";

type RegistrationRow = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  pass_type: string | null;
  amount: number | null;
  transaction_id: string | null;
  status: RegistrationStatus | null;
  ticket_url: string | null;
  created_at: string | null;
};

function mapRow(row: RegistrationRow): DashboardRegistration {
  const status: RegistrationStatus = row.status || "pending";
  const passType = row.pass_type === "premium" ? "premium" : "normal";

  return {
    id: row.id,
    eventSlug: "founders-meet-2026",
    name: row.name || "",
    email: row.email || "",
    phone: row.phone || "",
    organization: passType,
    designation: passType,
    status,
    transactionId: row.transaction_id || "",
    amount: Number(row.amount || 0),
    paymentStatus: status,
    createdAt: row.created_at || "",
    updatedAt: row.created_at || "",
    passType,
    ticketUrl: row.ticket_url || "",
  };
}

export async function getRegistrationByIdFromSupabase(
  registrationId: string,
): Promise<DashboardRegistration | null> {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("registrations")
    .select("id,name,email,phone,pass_type,amount,transaction_id,status,ticket_url,created_at")
    .eq("id", registrationId)
    .single<RegistrationRow>();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message || "Failed to fetch registration.");
  }

  return mapRow(data);
}

export async function updateRegistrationStatusInSupabase(
  registrationId: string,
  status: RegistrationStatus,
  ticketUrl?: string,
): Promise<DashboardRegistration> {
  const supabase = getSupabaseAdminClient();

  const updatePayload: { status: RegistrationStatus; ticket_url?: string } = {
    status,
  };

  if (status === "approved") {
    updatePayload.ticket_url = ticketUrl || "";
  }

  if (status !== "approved") {
    updatePayload.ticket_url = "";
  }

  const { data, error } = await supabase
    .from("registrations")
    .update(updatePayload)
    .eq("id", registrationId)
    .select("id,name,email,phone,pass_type,amount,transaction_id,status,ticket_url,created_at")
    .single<RegistrationRow>();

  if (error || !data) {
    throw new Error(error?.message || "Failed to update registration status.");
  }

  return mapRow(data);
}
