import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchModal from "@modules/search/components/modal"

import { ShoppingBag, User } from "@medusajs/icons"

export default async function Nav() {
  const regions = await listRegions().then((r: StoreRegion[]) => r)

  return (
    <div className="nav absolute top-0 inset-x-0 z-50">
      <header className="nav-header group relative h-16 mx-auto bg-white transition-colors duration-300">
        <nav
          className="
            nav-content
            content-container flex items-center justify-between w-full h-full
            text-neutral-900
            text-sm font-medium
            [&_a]:text-inherit [&_a]:text-sm [&_a]:font-medium [&_a]:transition-colors [&_a]:duration-300 [&_a:hover]:opacity-80
            [&_button]:text-inherit [&_button]:text-sm [&_button]:font-medium [&_button]:transition-colors [&_button]:duration-300 [&_button:hover]:opacity-80
          "
        >
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <LocalizedClientLink href="/" className="flex items-center" data-testid="nav-store-link">
            <svg
              className="h-8 w-auto"
              viewBox="0 0 2916.4 946.21"
              role="img"
              aria-label="VIGY"
            >
              <path fill="currentColor" d="M338.79,918.38h238.56L851.51,196.72v721.66h276.76v-267.09c62.53,163,209.31,294.92,418.58,294.92,91.26,0,171.55-20.06,230.77-55.93l1.43,28.09h242.01V398.18h-464v222.49h190.52c-23.25,55.59-89.23,95.79-166.8,95.79-162.28,0-205.57-149.54-205.57-237.9,0-159.64,75.42-251.22,206.94-251.22,88.24,0,153.86,50.16,159.79,97l4.88,38.54h276.77l-4.03-47.78c-.06-.72-.23-1.41-.3-2.12l168.69,270.19v335.22h276.77v-333.24L2799.67,26.63h-321.33l-150.22,280.43-163.02-280.43h-324.66l35.61,57.02C1799.22,31.14,1697.11,0,1582.14,0c-220.35,0-385.94,108.13-453.87,282.47V26.63h-502.8l-164.16,473.8L296.03,26.63H0l338.79,891.75Z"/>
              <rect fill="currentColor" x="2599.12" y="601.54" width="317.28" height="317.28"/>
            </svg>
          </LocalizedClientLink>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <SearchModal />
              <LocalizedClientLink className="hover:opacity-80" href="/account" data-testid="nav-account-link">
                <User />
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink className="flex gap-2 hover:opacity-80" href="/cart" data-testid="nav-cart-link">
                  <ShoppingBag /> 0
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
