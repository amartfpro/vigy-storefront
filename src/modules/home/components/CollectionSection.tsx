import Link from "next/link"
import Image from "next/image"
import ProductPreview from "@modules/products/components/product-preview"
import { Carousel } from "@modules/common/components/carousel"

type Props = {
  id: string
  title: string
  handle?: string
  imageUrl: string
  products?: any[]
  isFirstCollection?: boolean
}

export default function CollectionSection({
  id,
  title,
  handle,
  imageUrl,
  products = [],
  isFirstCollection = false,
}: Props) {
  const safeProducts = Array.isArray(products) ? products : []
  const href = handle ? `/collections/${handle}` : `/collections/id/${id}`
  const img = imageUrl || "/placeholder.jpg"

  return (
    <section>
      <div className="relative w-full h-[100dvh] overflow-hidden hero--cover">
        <Image src={img} alt={title} fill priority className="object-cover" sizes="100vw" />

        {/* Condicional para aplicar el gradiente solo en la primera colección */}
        {isFirstCollection && (
          <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-black to-transparent z-10"></div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold text-white mb-2">{title.toLocaleUpperCase()}</h2>
          <Link href={href} className="text-white hover:text-white/80 transition">
            View collection
          </Link>
        </div>
      </div>

      {safeProducts.length > 0 && (
        <div className="m-6">
          <Carousel >
            {safeProducts.filter(Boolean).map((p: any) => (
              <div
                key={p.id}
                className="
                  snap-start
                  m-0.5
                  min-w-[200px] 
                  sm:min-w-[250px] 
                  md:min-w-[300px]
                  lg:min-w-[350px]
                  xl:min-w-[400px]
                "
              >
                <ProductPreview product={p} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </section>
  )
}
