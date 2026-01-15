import { getSingleProduct } from "@/lib/api";
import { Product, ProductVariant } from "@/types";
import { notFound } from "next/navigation";
import { ProductPageClient } from "./ProductPageClient";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { variantName } = await searchParams;
  const product: Product = await getSingleProduct(id);

  if (!product || !product.uuid) {
    notFound();
  }

  // Find the variant index based on variantName query param
  const decodedVariantName = variantName?.replace(/-/g, " ");
  const selectedVariantIndex = product.variants.findIndex(
    (v: ProductVariant) => v.name.toLowerCase() === decodedVariantName?.toLowerCase()
  );

  return (
    <ProductPageClient
      product={product}
      initialVariantIndex={selectedVariantIndex >= 0 ? selectedVariantIndex : 0}
    />
  );
}