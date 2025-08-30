"use client"

import React, { useEffect, useState } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import { isManual, isStripe } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (session) => session.provider_id === "pp_stripe_stripe"
  )

  switch (true) {
    case isStripe(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )
    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      )
    default:
      return <Button disabled>Select a payment method</Button>
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const stripe = useStripe()
  const elements = useElements()
  const { countryCode } = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.provider_id === "pp_stripe_stripe"
  )
  const clientSecret = paymentSession?.data?.client_secret as string | undefined

  const disabled = !stripe || !elements || !clientSecret || notReady

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setSubmitting(false))
  }

  const handlePayment = async () => {
    if (!stripe || !elements || !clientSecret) return
    setSubmitting(true)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message || null)
      setSubmitting(false)
      return
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/api/capture-payment/${cart.id}?country_code=${countryCode}`,
        payment_method_data: {
          billing_details: {
            name: `${cart.billing_address?.first_name ?? ""} ${cart.billing_address?.last_name ?? ""}`.trim(),
            address: {
              city: cart.billing_address?.city ?? undefined,
              country: cart.billing_address?.country_code ?? undefined,
              line1: cart.billing_address?.address_1 ?? undefined,
              line2: cart.billing_address?.address_2 ?? undefined,
              postal_code: cart.billing_address?.postal_code ?? undefined,
              state: cart.billing_address?.province ?? undefined,
            },
            email: cart.email,
            phone: cart.billing_address?.phone ?? undefined,
          },
        },
      },
      redirect: "if_required",
    })

    if (error) {
      const pi = (error as any).payment_intent
      if (pi && (pi.status === "requires_capture" || pi.status === "succeeded")) {
        onPaymentCompleted()
      } else {
        setErrorMessage(error.message || null)
        setSubmitting(false)
      }
      return
    }

    if (paymentIntent && (paymentIntent.status === "requires_capture" || paymentIntent.status === "succeeded")) {
      onPaymentCompleted()
    } else {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (cart.payment_collection?.status === "authorized") {
      onPaymentCompleted()
    }
  }, [cart.payment_collection?.status])

  useEffect(() => {
    elements?.getElement("payment")?.on("change", (e: any) => {
      if (!e.complete) {
        router.push(pathname + "?step=payment", { scroll: false })
      }
    })
  }, [elements, router, pathname])

  return (
    <>
      <Button
        disabled={disabled}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
        className="mt-6 btn-orange"
      >
        Place order
      </Button>
      <ErrorMessage error={errorMessage} data-testid="stripe-payment-error-message" />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady, "data-testid": dataTestId }: { notReady: boolean; "data-testid"?: string }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setSubmitting(false))
  }

  const handlePayment = () => {
    setSubmitting(true)
    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid={dataTestId ?? "submit-order-button"}
        className="mt-6 btn-orange"
      >
        Place order
      </Button>
      <ErrorMessage error={errorMessage} data-testid="manual-payment-error-message" />
    </>
  )
}

export default PaymentButton
