import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";

// True once the project has real Sanity credentials configured.
export const sanityConfigured = Boolean(projectId);

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
});

// Client with write access — only used server-side by the seed script.
export function getWriteClient() {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) throw new Error("SANITY_API_TOKEN chưa được cấu hình trong .env.local");
  return createClient({
    projectId: projectId || "placeholder",
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });
}
