import { Metadata } from "next"
import { listCollectionsWithProducts } from "@lib/data/collections"
import CollectionSection from "@modules/home/components/CollectionSection"
import Image from "next/image"
import cover0 from "@/public/covers/cover0.png"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "VIGY",
  description: "",
}

export default async function Home() {
  const { collections } = await listCollectionsWithProducts()

if (!collections || collections.length === 0) {
  return (
    <section className="relative w-full">
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={cover0}
          alt="WORKING ON NEXT COLLECTIONS"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 z-[1]" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <p className="text-center text-white text-m sm:text-2xl md:text-3xl font-semibold tracking-tight">
            Working on next collections.
          </p>
        </div>
      </div>
    </section>
  )
}
  return (
    <div className="flex flex-col gap-16">
      {collections.map((collection: any) => {
        const imageUrl =
        collection?.metadata?.cover_image ||
          collection?.products?.[0]?.thumbnail ||
          "/placeholder.jpg"

        return (
          <CollectionSection
            key={collection.id}
            id={collection.id}
            title={collection.title}
            handle={collection.handle}
            imageUrl={imageUrl}
            products={collection.products ?? []}
          />
        )
      })}
    </div>
  )
}
