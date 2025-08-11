"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export const retrieveCollection = async (id: string) => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  return sdk.client
    .fetch<{ collection: HttpTypes.StoreCollection }>(
      `/store/collections/${id}`,
      {
        next,
        cache: "force-cache",
      }
    )
    .then(({ collection }) => collection)
}

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  queryParams.limit = queryParams.limit || "100"
  queryParams.offset = queryParams.offset || "0"

  return sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
      "/store/collections",
      {
        query: queryParams,
        next,
        cache: "force-cache",
      }
    )
    .then(({ collections }) => ({ collections, count: collections.length }))
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection> => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
      query: { handle, fields: "*products" },
      next,
      cache: "force-cache",
    })
    .then(({ collections }) => collections[0])
}

export const listCollectionsWithProducts = async () => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  const { collections } = await sdk.client.fetch<{
    collections: HttpTypes.StoreCollection[]
  }>("/store/collections", {
    query: {
      fields: "id,title,handle",
    },
    next,
    cache: "force-cache",
  })

  // obtener productos de cada colección
  const collectionsWithProducts = await Promise.all(
    collections.map(async (col) => {
      const { products } = await sdk.client.fetch<{
        products: HttpTypes.StoreProduct[]
      }>(`/store/products`, {
        query: {
          collection_id: col.id,
          fields: "id,title,handle,thumbnail,variants.prices",
        },
        next,
        cache: "force-cache",
      })
      return { ...col, products }
    })
  )

  return collectionsWithProducts
}
