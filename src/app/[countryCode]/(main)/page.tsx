import { Metadata } from "next"
import { listCollectionsWithProducts } from "@lib/data/collections"
import CollectionSection from "@modules/home/components/CollectionSection"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "VIGY",
  description: "",
}

export default async function Home() {
  const { collections } = await listCollectionsWithProducts()

  if (!collections || collections.length === 0) {
    return <p className="text-center py-12 mt-12">No hay colecciones disponibles.</p>
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
