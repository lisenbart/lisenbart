import { getStore } from "@netlify/blobs";

export type StoredTestimonial = {
  id: string;
  quote: string;
  name: string;
  company: string;
  rating: number;
  status: "pending" | "approved";
  token: string;
  createdAt: string;
  approvedAt?: string;
};

const STORE_NAME = "testimonials";
const MAX_APPROVED = 10;

export function getTestimonialsStore() {
  return getStore(STORE_NAME);
}

export async function savePendingTestimonial(record: StoredTestimonial): Promise<void> {
  const store = getTestimonialsStore();
  await store.setJSON(record.id, record);
}

export async function getTestimonialById(id: string): Promise<StoredTestimonial | null> {
  const store = getTestimonialsStore();
  return store.get(id, { type: "json" });
}

export async function listApprovedTestimonials(): Promise<StoredTestimonial[]> {
  const store = getTestimonialsStore();
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

export async function approveTestimonial(id: string, token: string): Promise<StoredTestimonial | "invalid" | "already"> {
  const record = await getTestimonialById(id);
  if (!record || record.token !== token) return "invalid";
  if (record.status === "approved") return "already";

  const approved: StoredTestimonial = {
    ...record,
    status: "approved",
    approvedAt: new Date().toISOString(),
  };

  await savePendingTestimonial(approved);
  return approved;
}

export async function removeTestimonial(id: string, token: string): Promise<"removed" | "invalid"> {
  const record = await getTestimonialById(id);
  if (!record || record.token !== token) return "invalid";

  const store = getTestimonialsStore();
  await store.delete(id);
  return "removed";
}
