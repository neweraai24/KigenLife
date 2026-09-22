import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./client";

const builder = createImageUrlBuilder({ projectId: projectId || "placeholder", dataset });

export function urlForImage(source) {
  if (!source) return null;
  return builder.image(source);
}
