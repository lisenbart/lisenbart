import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export type StoredTestimonial = {
  id: string;
  quote: string;
  name: string;
  company: string;
  rating: number;
  status: "pending" | "approved" | "removed";
  token: string;
  createdAt: string;
  approvedAt?: string;
  removedAt?: string;
};

const STORE_NAME = "testimonials";
const MAX_APPROVED = 10;

export function getTestimonialsStore(context?: Context) {
  if (context?.site?.id) {
    return getStore({
      name: STORE_NAME,
      siteID: context.site.id,
      token: process.env.NETLIFY_BLOB_READ_WRITE_TOKEN,
    });
  }

  return getStore(STORE_NAME);
}

export async function savePendingTestimonial(
  record: StoredTestimonial,
  context?: Context,
): Promise<void> {
  const store = getTestimonialsStore(context);
  await store.setJSON(record.id, record);
}

export async function getTestimonialById(
  id: string,
  context?: Context,
): Promise<StoredTestimonial | null> {
  const store = getTestimonialsStore(context);
  return store.get(id, { type: "json" });
}

export async function listApprovedTestimonials(context?: Context): Promise<StoredTestimonial[]> {
  const store = getTestimonialsStore(context);
  const { blobs } = await store.list();

  const records = await Promise.all(
    blobs.map(async ({ key }) => {
      const item = await store.get(key, { type: "json" });
      return item as StoredTestimonial | null;
    }),
  );

  return records
    .filter((item): item is StoredTestimonial => item?.status === "approved")
    .sort((a, b) => {
      const aTime = Date.parse(a.approvedAt ?? a.createdAt);
      const bTime = Date.parse(b.approvedAt ?? b.createdAt);
      return bTime - aTime;
    })
    .slice(0, MAX_APPROVED);
}

export async function approveTestimonial(
  id: string,
  token: string,
  context?: Context,
): Promise<StoredTestimonial | "invalid" | "already"> {
  const record = await getTestimonialById(id, context);
  if (!record || record.token !== token || record.status === "removed") return "invalid";
  if (record.status === "approved") return "already";

  const approved: StoredTestimonial = {
    ...record,
    status: "approved",
    approvedAt: new Date().toISOString(),
    removedAt: undefined,
  };

  await savePendingTestimonial(approved, context);
  return approved;
}

export async function removeTestimonial(
  id: string,
  token: string,
  context?: Context,
): Promise<"removed" | "invalid"> {
  const record = await getTestimonialById(id, context);
  if (!record || record.token !== token) return "invalid";

  const removed: StoredTestimonial = {
    ...record,
    status: "removed",
    removedAt: new Date().toISOString(),
  };

  await savePendingTestimonial(removed, context);
  return "removed";
}
