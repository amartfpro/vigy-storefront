"use client"

import { Dialog, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

export default function CartDropdown({ cart: cartState }: { cart?: HttpTypes.StoreCart | null }) {
  const [open, setOpen] = useState(false)
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined)

  const totalItems = cartState?.items?.reduce((acc, i) => acc + i.quantity, 0) || 0
  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)
  const pathname = usePathname()
  const prevItemsRef = useRef(totalItems)

  const openAndCancel = () => {
    if (activeTimer) clearTimeout(activeTimer)
    setOpen(true)
  }

  const timedOpen = () => {
    setOpen(true)
    const t = setTimeout(() => setOpen(false), 5000)
    setActiveTimer(t)
  }

  useEffect(() => {
    return () => {
      if (activeTimer) clearTimeout(activeTimer)
    }
  }, [activeTimer])

  useEffect(() => {
    if (prevItemsRef.current !== totalItems) {
      timedOpen()
      prevItemsRef.current = totalItems
    }
  }, [totalItems])

  return (
    <div className="h-full">
      <button
        onClick={openAndCancel}
        className="relative h-full flex items-center rounded-full px-4 py-2 text-sm tracking-tight transition-all hover:bg-white/5 hover:text-ui-fg-base"
        data-testid="nav-cart-link"
      >
        {`Cart (${totalItems})`}
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog onClose={setOpen} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 flex justify-end">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="absolute right-2 top-2 bottom-2 z-50 w-[85vw] sm:w-[360px] rounded-2xl bg-[rgba(3,7,18,0.55)] ring-1 ring-white/10 shadow-2xl backdrop-blur-2xl text-ui-fg-on-color overflow-hidden">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-5 py-4">
                      <span className="text-sm uppercase tracking-widest text-white/70">Cart</span>
                      <button onClick={() => setOpen(false)} className="p-2 rounded-xl hover:bg-white/10">
                        <XMark />
                      </button>
                    </div>

                    {cartState && cartState.items?.length ? (
                      <>
                        <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-y-6">
                          {cartState.items
                          .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
                          .map((item) => (
                            <div
                              key={item.id}
                              data-testid="cart-item"
                              className="grid grid-cols-[88px_1fr] gap-x-4 rounded-xl px-2 py-2 hover:bg-white/5 transition-colors"
                            >
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                className="block"
                                aria-label={item.title}
                              >
                                <div className="w-22 h-22 rounded-xl overflow-hidden ring-1 ring-white/10">
                                  <Thumbnail
                                    thumbnail={item.thumbnail}
                                    images={item.variant?.product?.images}
                                    size="square"
                                  />
                                </div>
                              </LocalizedClientLink>

                              <div className="flex flex-col gap-2 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <h3 className="text-white/90 text-base font-medium leading-tight truncate">
                                      <LocalizedClientLink
                                        href={`/products/${item.product_handle}`}
                                        className="hover:text-white"
                                        data-testid="product-link"
                                        title={item.title}
                                      >
                                        {item.title}
                                      </LocalizedClientLink>
                                    </h3>

                                    {/* Opciones / variante */}
                                    <div className="text-white text-xs mt-1">
                                      <LineItemOptions variant={item.variant} />
                                    </div>

                                    {/* Cantidad */}
                                    <div className="mt-1 inline-flex items-center gap-2">
                                      <span
                                        className="text-white/70 text-xs px-2 py-0.5 rounded-lg ring-1 ring-white/10"
                                        data-testid="cart-item-quantity"
                                        data-value={item.quantity}
                                      >
                                        Quantity: {item.quantity}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Precio */}
                                  <div className="shrink-0 text-right">
                                    <div className="text-white text-sm font-semibold leading-none">
                                      <LineItemPrice
                                        item={item}
                                        style="tight"
                                        currencyCode={cartState.currency_code}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Acciones */}
                                <div className="flex justify-between items-center">
                                  <DeleteButton
                                    id={item.id}
                                    className="text-white hover:text-white text-xs"
                                    data-testid="cart-item-remove-button"
                                  >
                                    Remove
                                  </DeleteButton>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 border-t border-white/10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-white font-semibold">
                              Subtotal <span className="font-normal text-white/70">(excl. taxes)</span>
                            </span>
                            <span className="text-large-semi text-white">
                              {convertToLocale({ amount: subtotal, currency_code: cartState.currency_code })}
                            </span>
                          </div>

                          <LocalizedClientLink href="/cart" passHref>
                            <Button className="w-full btn-orange" size="large" onClick={() => setOpen(false)}>
                              Go to cart
                            </Button>
                          </LocalizedClientLink>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center gap-y-4 p-4 text-white/80">
                        <div className="bg-white/10 flex items-center justify-center w-6 h-6 rounded-full text-white">
                          <span>0</span>
                        </div>
                        <span>Your shopping bag is empty.</span>
                        <LocalizedClientLink href="/store">
                          <Button onClick={() => setOpen(false)}>Explore products</Button>
                        </LocalizedClientLink>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
