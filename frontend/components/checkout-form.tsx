"use client";

import Image from "next/image";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products";
import { createOrder } from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    items,
    subtotal,
    delivery,
    total,
    hydrated,
    clearCart,
  } = useCart();

  const [deliveryTime, setDeliveryTime] = useState(
    "8:00 AM – 10:00 AM"
  );



  const [paymentMethod, setPaymentMethod] = useState("card");

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
  });

  

  /*
   * Update form field
   */
  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateCard = (
    field: keyof typeof card,
    value: string
  ) => {
    setCard((current) => ({
      ...current,
      [field]: value,
    }));

    setPaymentError(null);
    setError(null);
  };

  /*
   * Don't render checkout until localStorage
   * has been loaded.
   */
  if (!hydrated) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Loading your basket...
          </p>
        </div>
      </main>
    );
  }

  /*
   * Empty basket
   */
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <h1 className="font-serif text-4xl text-primary">
            Your basket is empty
          </h1>

          <p className="mt-4 text-muted-foreground">
            Add something fresh before checking out.
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-8 rounded-full bg-primary px-8 py-3.5 text-sm text-primary-foreground transition-opacity hover:opacity-90"
          >
            Continue shopping
          </button>
        </div>
      </main>
    );
  }

  const remaining = Math.max(
    0,
    45 - subtotal
  );

  const progress = Math.min(
    100,
    (subtotal / 45) * 100
  );

  /*
   * Place order
   */
  const handlePlaceOrder = async () => {
    setError(null);
    setPaymentError(null);

    if (items.length === 0) {
      setError("Your basket is empty.");
      return;
    }

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim()
    ) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    if (paymentMethod === "card") {
      const cardNumber = card.number.replace(/\s/g, "");

      if (
        !card.name.trim() ||
        cardNumber.length !== 16 ||
        card.expiry.length !== 5 ||
        card.cvv.length !== 3
      ) {
        setPaymentError("Please complete your card details.");
        return;
      }

      if (cardNumber !== "4242424242424242") {
        setPaymentError(
          "This is a demo checkout. Use 4242 4242 4242 4242."
        );
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
        setPaymentError("Please enter a valid expiry date.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (paymentMethod === "card") {
        // Fake payment processing — no real payment is made.
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      const order = await createOrder({
        customer: {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        },

        deliveryAddress: {
          address: form.address.trim(),
          city: form.city.trim(),
          postalCode: form.postcode.trim(),
        },

        deliverySlot: deliveryTime,

        items: items.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
      });

      /*
       * Clear cart only after the order
       * has successfully been created.
       */
      clearCart();

      router.push(`/order-success/${order._id}`);
    } catch (err) {
      console.error("Checkout error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to shopping
          </button>

          <div className="font-serif text-2xl font-medium text-primary">
            Grove
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5" />
            Secure checkout
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          {/* LEFT */}
          <section className="max-w-3xl">
            <div className="mb-10">
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Checkout
              </p>

              <h1 className="font-serif text-4xl font-normal text-primary sm:text-5xl">
                Nearly there.
              </h1>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Tell us where you'd like your
                morning-picked groceries delivered.
              </p>
            </div>

            {/* Contact */}
            <div className="border-t border-border pt-7">
              <div className="mb-5">
                <h2 className="font-serif text-2xl text-primary">
                  Contact details
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  We'll use these details to keep you updated.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="First name"
                  value={form.firstName}
                  onChange={(value) =>
                    updateField("firstName", value)
                  }
                />

                <Input
                  label="Last name"
                  value={form.lastName}
                  onChange={(value) =>
                    updateField("lastName", value)
                  }
                />

                <Input
                  label="Email address"
                  type="email"
                  value={form.email}
                  onChange={(value) =>
                    updateField("email", value)
                  }
                />

                <Input
                  label="Phone number"
                  type="tel"
                  value={form.phone}
                  onChange={(value) =>
                    updateField("phone", value)
                  }
                />
              </div>
            </div>

            {/* Delivery address */}
            <div className="mt-12 border-t border-border pt-7">
              <div className="mb-5">
                <h2 className="font-serif text-2xl text-primary">
                  Delivery address
                </h2>
              </div>

              <div className="space-y-4">
                <Input
                  label="Address"
                  value={form.address}
                  onChange={(value) =>
                    updateField("address", value)
                  }
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="City"
                    value={form.city}
                    onChange={(value) =>
                      updateField("city", value)
                    }
                  />

                  <Input
                    label="Postcode"
                    value={form.postcode}
                    onChange={(value) =>
                      updateField("postcode", value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Delivery time */}
            <div className="mt-12 border-t border-border pt-7">
              <div className="mb-5">
                <h2 className="font-serif text-2xl text-primary">
                  Choose your morning
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your groceries will arrive fresh from
                  the producer.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "8:00 AM – 10:00 AM",
                  "10:00 AM – 12:00 PM",
                  "12:00 PM – 2:00 PM",
                ].map((time) => {
                  const selected =
                    deliveryTime === time;

                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() =>
                        setDeliveryTime(time)
                      }
                      className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {time}
                        </span>

                        {selected && (
                          <Check className="size-4" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment */}
            <div className="mt-12 border-t border-border pt-7">
              <div className="mb-5">
                <h2 className="font-serif text-2xl text-primary">
                  Payment
                </h2>
              </div>

              <div className="space-y-3">
                <PaymentOption
                  selected={paymentMethod === "card"}
                  onClick={() => {
                    setPaymentMethod("card");
                    setPaymentError(null);
                  }}
                  title="Visa card"
                  description="Pay securely with your Visa card"
                />

                {paymentMethod === "card" && (
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="mb-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-medium">
                          Card details
                        </p>
                        <span className="rounded-md border border-border px-2 py-1 text-[10px] font-semibold tracking-wider">
                          VISA
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Demo payment — no real money will be charged.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Input
                        label="Cardholder name"
                        value={card.name}
                        onChange={(value) =>
                          updateCard("name", value)
                        }
                        placeholder="John Smith"
                        autoComplete="cc-name"
                      />

                      <Input
                        label="Card number"
                        value={card.number}
                        onChange={(value) => {
                          const digits = value
                            .replace(/\D/g, "")
                            .slice(0, 16);

                          const formatted = digits.replace(
                            /(\d{4})(?=\d)/g,
                            "$1 "
                          );

                          updateCard("number", formatted);
                        }}
                        placeholder="4242 4242 4242 4242"
                        inputMode="numeric"
                        autoComplete="cc-number"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry date"
                          value={card.expiry}
                          onChange={(value) => {
                            const digits = value
                              .replace(/\D/g, "")
                              .slice(0, 4);

                            const formatted =
                              digits.length > 2
                                ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                                : digits;

                            updateCard("expiry", formatted);
                          }}
                          placeholder="MM/YY"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                        />

                        <Input
                          label="CVV"
                          value={card.cvv}
                          onChange={(value) =>
                            updateCard(
                              "cvv",
                              value.replace(/\D/g, "").slice(0, 3)
                            )
                          }
                          placeholder="123"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                        />
                      </div>
                    </div>

                    {paymentError && (
                      <p className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-xs text-destructive">
                        {paymentError}
                      </p>
                    )}

                    <div className="mt-5 rounded-xl bg-muted/50 px-4 py-3">
                      <p className="text-xs text-muted-foreground">
                        Demo card
                      </p>
                      <p className="mt-1 text-xs font-medium">
                        4242 4242 4242 4242 · 12/30 · 123
                      </p>
                    </div>
                  </div>
                )}

                <PaymentOption
                  selected={paymentMethod === "cash"}
                  onClick={() => {
                    setPaymentMethod("cash");
                    setPaymentError(null);
                  }}
                  title="Cash on delivery"
                  description="Pay when your groceries arrive"
                />
              </div>
            </div>

            <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" />
              Your information is securely protected.
            </p>
          </section>

          {/* RIGHT */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-normal text-primary">
                  Your order
                </h2>

                <span className="text-xs text-muted-foreground">
                  {items.length} item
                  {items.length === 1 ? "" : "s"}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 py-4 first:pt-0"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={
                          item.product.image ||
                          "/placeholder.svg"
                        }
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-3">
                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>

                        <p className="shrink-0 text-sm">
                          {formatPrice(
                            item.product.price *
                              item.quantity
                          )}
                        </p>
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.quantity} ×{" "}
                        {item.product.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Free delivery */}
              <div className="mt-5 border-t border-border pt-5">
                <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                  <span>
                    {remaining === 0
                      ? "Free delivery unlocked"
                      : `${formatPrice(
                          remaining
                        )} away from free delivery`}
                  </span>

                  <span>
                    {Math.round(progress)}%
                  </span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal
                  </span>

                  <span>
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Delivery
                  </span>

                  <span>
                    {delivery === 0
                      ? "Free"
                      : formatPrice(delivery)}
                  </span>
                </div>

                <div className="flex justify-between border-t border-border pt-4 text-base font-medium">
                  <span>Total</span>

                  <span>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {error}
                </p>
              )}

              {/* Place order */}
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handlePlaceOrder}
                className="mt-6 w-full rounded-full bg-primary px-6 py-4 text-sm text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? "Placing order..."
                  : "Place order"}
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                By placing your order, you agree to our
                terms and delivery policy.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------- */
/* Input */
/* -------------------------------- */

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  inputMode,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email" | "url" | "search" | "none";
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-foreground/80">
        {label}
      </span>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
      />
    </label>
  );
}

/* -------------------------------- */
/* Payment option */
/* -------------------------------- */

function PaymentOption({
  selected,
  onClick,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
        selected
          ? "border-primary bg-primary/[0.04]"
          : "border-border hover:border-primary/40"
      }`}
    >
      <span
        className={`flex size-5 items-center justify-center rounded-full border ${
          selected
            ? "border-primary"
            : "border-border"
        }`}
      >
        {selected && (
          <span className="size-2.5 rounded-full bg-primary" />
        )}
      </span>

      <span>
        <span className="block text-sm font-medium">
          {title}
        </span>

        <span className="mt-1 block text-xs text-muted-foreground">
          {description}
        </span>
      </span>
    </button>
  );
}