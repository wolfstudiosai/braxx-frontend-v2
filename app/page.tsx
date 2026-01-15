import { getProducts } from "@/lib/api";
import { Suspense } from "react";
import { HomePageContainer } from "@/components/HomePageContainer";
import { Product } from "@/types";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="w-full min-h-screen flex items-center justify-center text-black text-5xl">Loading...</div>}>
        <HomePageContent />
      </Suspense>
    </>
  );
}

const HomePageContent = async () => {
  const products: Product[] = await getProducts();

  return <HomePageContainer products={products} />;
}
