import { sanityClient, sanityConfigured } from "./client";
import { urlForImage } from "./image";

const PRODUCT_PROJECTION = `{
  _id,
  name,
  "sku": sku.current,
  line,
  price,
  unit,
  weight,
  age,
  note,
  "inStock": inStock != false,
  featured,
  order,
  image
}`;

function shapeProduct(doc) {
  if (!doc) return null;
  const img = urlForImage(doc.image);
  return {
    id: doc._id,
    sku: doc.sku,
    name: doc.name,
    line: doc.line,
    price: doc.price,
    unit: doc.unit,
    weight: doc.weight,
    age: doc.age,
    note: doc.note,
    inStock: doc.inStock !== false,
    featured: Boolean(doc.featured),
    imageUrl: img ? img.width(800).height(800).fit("max").url() : null,
    imageUrlSmall: img ? img.width(160).height(160).fit("max").url() : null,
  };
}

// next: { revalidate } lets pages control ISR; tag-based revalidation is
// triggered on-demand from the Sanity webhook (see app/api/revalidate).
const FETCH_OPTIONS = { next: { tags: ["product"], revalidate: 60 } };

export async function getAllProducts() {
  if (!sanityConfigured) return [];
  const docs = await sanityClient.fetch(
    `*[_type == "product"] | order(coalesce(order, 999) asc, name asc) ${PRODUCT_PROJECTION}`,
    {},
    FETCH_OPTIONS
  );
  return docs.map(shapeProduct);
}

export async function getProductBySku(sku) {
  if (!sanityConfigured || !sku) return null;
  const doc = await sanityClient.fetch(
    `*[_type == "product" && sku.current == $sku][0] ${PRODUCT_PROJECTION}`,
    { sku },
    FETCH_OPTIONS
  );
  return shapeProduct(doc);
}

export async function getFeaturedProducts(limit = 4) {
  if (!sanityConfigured) return [];
  const docs = await sanityClient.fetch(
    `*[_type == "product" && featured == true] | order(coalesce(order, 999) asc) [0...$limit] ${PRODUCT_PROJECTION}`,
    { limit },
    FETCH_OPTIONS
  );
  return docs.map(shapeProduct);
}

export async function getRelatedProducts(line, excludeSku, limit = 3) {
  if (!sanityConfigured) return [];
  const docs = await sanityClient.fetch(
    `*[_type == "product" && line == $line && sku.current != $excludeSku] | order(coalesce(order, 999) asc) [0...$limit] ${PRODUCT_PROJECTION}`,
    { line, excludeSku, limit },
    FETCH_OPTIONS
  );
  return docs.map(shapeProduct);
}

export async function getAllProductSkus() {
  if (!sanityConfigured) return [];
  return sanityClient.fetch(`*[_type == "product"].sku.current`);
}
