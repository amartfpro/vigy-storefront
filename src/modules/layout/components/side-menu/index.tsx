"use client"

import { Popover, PopoverPanel, Transition } from "@headlessui/react"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { Fragment } from "react"

import { BarsThree } from "@medusajs/icons"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

import SearchModal from "@modules/search/components/modal"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const toggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center rounded-full px-4 py-2 text-sm tracking-tight transition-all hover:bg-white/5 hover:text-ui-fg-base focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  <BarsThree/>
                </Popover.Button>
              </div>

              <Transition show={open} as={Fragment}>
                <div className="fixed inset-0 z-50">
                  {/* Overlay con la misma animación del carrito */}
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
                  </Transition.Child>

                  {/* Panel con la misma curva/tiempos, entrando desde la izquierda */}
                  <div className="absolute inset-0 flex justify-start">
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-out duration-300"
                      enterFrom="-translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in duration-200"
                      leaveFrom="translate-x-0"
                      leaveTo="-translate-x-full"
                    >
                      <PopoverPanel className="absolute left-2 top-2 bottom-2 z-[60] w-[85vw] sm:w-[360px] rounded-2xl bg-[rgba(3,7,18,0.55)] ring-1 ring-white/10 shadow-2xl backdrop-blur-2xl text-ui-fg-on-color overflow-visible">
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between px-5 py-4">
                            <span className="text-sm uppercase tracking-widest text-white/70">Menu</span>
                            <button data-testid="close-menu-button" onClick={close} className="p-2 rounded-xl hover:bg-white/10">
                              <XMark />
                            </button>
                          </div>

                          <ul className="flex flex-col gap-1 p-2">
                            {Object.entries(SideMenuItems).map(([name, href]) => (
                              <li key={name} className={name === "Search" ? "small:hidden" : ""}>
                                <LocalizedClientLink
                                  href={href}
                                  className="group block text-xl leading-8 tracking-tight text-white/90 hover:text-white hover:font-semibold transition-all duration-200 hover:bg-white/5 px-2 py-1 rounded-lg"
                                  onClick={close}
                                  data-testid={`${name.toLowerCase()}-link`}
                                >
                                  {name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                            {/* <li  className="px-2">
                              <SearchModal />
                            </li> */}
                          </ul>

                          <div className="mt-auto p-2">
                            <div
                              className="relative flex items-center justify-between gap-x-2 rounded-xl px-3 py-2 hover:bg-white/5 transition min-h-[48px] min-w-[320px] w-full"
                              onMouseEnter={toggleState.open}
                              onMouseLeave={toggleState.close}
                            >
                              {regions && (
                                <div className="flex-1 min-w-0 relative">
                                  <CountrySelect toggleState={toggleState} regions={regions} />
                                </div>
                              )}
                              <ArrowRightMini
                                className={clx(
                                  "shrink-0 transition-transform duration-200",
                                  toggleState.state ? "-rotate-90" : ""
                                )}
                              />
                            </div>
                            <div className="flex justify-between items-center pt-3">
                              <Text className="txt-compact-small text-white/60">
                                © {new Date().getFullYear()} VIGY. All rights reserved.
                              </Text>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Transition.Child>
                  </div>
                </div>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
