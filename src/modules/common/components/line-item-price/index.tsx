import { getPercentageDiff } from "@lib/util/get-precentage-diff"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"

type LineItemPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
}

const LineItemPrice = ({
  item,
  style = "default",
  currencyCode,
}: LineItemPriceProps) => {
  // Valores base y fallbacks seguros
  const qty =
    typeof item.quantity === "number" && item.quantity > 0 ? item.quantity : 1

  const total =
    typeof (item as any).total === "number" ? (item as any).total : undefined

  const subtotal =
    typeof (item as any).subtotal === "number"
      ? (item as any).subtotal
      : undefined

  const unit_price =
    typeof (item as any).unit_price === "number"
      ? (item as any).unit_price
      : undefined

  const original_total =
    typeof (item as any).original_total === "number"
      ? (item as any).original_total
      : undefined

  const original_unit_price =
    typeof (item as any).original_unit_price === "number"
      ? (item as any).original_unit_price
      : undefined

  // Total de línea que mostraremos
  const currentPrice =
    total ??
    subtotal ??
    (typeof unit_price === "number" ? unit_price * qty : 0)

  // Precio original para mostrar descuento (si existe)
  const originalPrice =
    original_total ??
    (typeof original_unit_price === "number"
      ? original_unit_price * qty
      : currentPrice)

  const hasReducedPrice =
    typeof originalPrice === "number" &&
    typeof currentPrice === "number" &&
    originalPrice > currentPrice

  const percentageDiff = hasReducedPrice
    ? getPercentageDiff(originalPrice, currentPrice)
    : 0

  return (
    // Mismo “look” que el unitario: texto tenue y centrado vertical
    <div className="flex flex-col text-ui-fg-muted justify-center h-full">
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-ui-fg-muted">Original: </span>
            )}
            <span
              className="line-through"
              data-testid="product-original-price"
            >
              {convertToLocale({
                amount: originalPrice,
                currency_code: currencyCode,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-ui-fg-interactive">-{percentageDiff}%</span>
          )}
        </>
      )}

      <span
        className={clx("text-base-regular", {
          "text-ui-fg-interactive": hasReducedPrice,
        })}
        data-testid="product-price"
      >
        {convertToLocale({
          amount: currentPrice,
          currency_code: currencyCode,
        })}
      </span>
    </div>
  )
}

export default LineItemPrice
