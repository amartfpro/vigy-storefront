"use client"

import Link from "next/link"
import Image from "next/image"
import ProductPreview from "@modules/products/components/product-preview"
import { Carousel } from "@modules/common/components/carousel"

type CollectionSectionProps = {
  id: string
  title: string
  handle: string
  imageUrl: string
  products: any[]
}

export default function CollectionSection({
  id,
  title,
  handle,
  imageUrl,
  products
}: CollectionSectionProps) {
  return (
    <section className="mb-16">
      {/* Imagen de cabecera de colección */}
      <div className="relative w-full h-[400px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        {/* Overlay con título y botón */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-6 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <Link
            href={`/collections/${handle}`}
            className="bg-white text-black px-6 py-2 font-semibold hover:bg-gray-200 transition"
          >
            View
          </Link>
        </div>
      </div>

      {/* Carrusel de productos */}
      <div className="mt-6 px-4">
        <Carousel>
          {products.map((p) => (
            <div key={p.id} className="min-w-[200px]">
              <ProductPreview {...p} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}
