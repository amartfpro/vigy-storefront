import { Metadata } from "next"
import { listCollectionsWithProducts } from "@lib/data/collections"
import CollectionSection from "@modules/home/components/CollectionSection"
import { Carousel } from "@modules/common/components/carousel"

export const metadata: Metadata = {
  title: "Vigy Sport",
  description: "Colecciones de ropa de Vigy Sport",
}

export default async function Home() {
  const { collections } = await listCollectionsWithProducts()
  console.log("Collections fetched:", collections)

  if (!collections || collections.length === 0) {
    return <p className="text-center py-12">No hay colecciones disponibles.</p>
  }

  return (
    <div className="flex flex-col gap-16">
      {collections.map((collection) => {
        const imageUrl =
          (collection as any)?.image?.url ||
          collection.products?.[0]?.thumbnail ||
          "/placeholder.jpg"

        return (
          <div key={collection.id} className="w-full">
            <CollectionSection
              title={collection.title}
              imageUrl={imageUrl}
              link={`/collections/${collection.handle}`}
            />
            {collection.products && collection.products.length > 0 && (
              <div className="mt-6">
                <Carousel products={collection.products} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}