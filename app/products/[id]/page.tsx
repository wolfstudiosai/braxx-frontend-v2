import { getProducts, getSingleProduct } from "@/lib/api";
import { ProductVariant } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { variantName } = await searchParams;
  const product = await getSingleProduct(id);
  const products = await getProducts()
  const variant = product?.variants.find((v: ProductVariant) => v.name === variantName?.replace("-", " "));

  console.log(variant);

  return (
    <main className="bg-black px-2 pb-10">

    </main>
  );
}