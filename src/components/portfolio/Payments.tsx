import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CreditCard, ShieldCheck, CheckCircle2, XCircle, Download, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { getPaystackPublicKey, verifyPaystackPayment } from "@/lib/paystack.functions";
import { SectionLabel } from "./About";

type PaystackPop = {
  setup: (opts: {
    key: string;
    email: string;
    amount: number; // kobo
    currency?: string;
    ref?: string;
    firstname?: string;
    lastname?: string;
    metadata?: Record<string, unknown>;
    channels?: string[];
    callback: (res: { reference: string }) => void;
    onClose: () => void;
  }) => { openIframe: () => void };
};

declare global {
  interface Window {
    PaystackPop?: PaystackPop;
  }
}

const PAYSTACK_SCRIPT = "https://js.paystack.co/v1/inline.js";

function loadPaystack(): Promise<PaystackPop> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("SSR"));
    if (window.PaystackPop) return resolve(window.PaystackPop);
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${PAYSTACK_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener("load", () => {
        window.PaystackPop ? resolve(window.PaystackPop) : reject(new Error("Paystack not available"));
      });
      existing.addEventListener("error", () => reject(new Error("Failed to load Paystack")));
      return;
    }
    const s = document.createElement("script");
    s.src = PAYSTACK_SCRIPT;
    s.async = true;
    s.onload = () =>
      window.PaystackPop ? resolve(window.PaystackPop) : reject(new Error("Paystack not available"));
    s.onerror = () => reject(new Error("Failed to load Paystack"));
    document.body.appendChild(s);
  });
}

type Receipt = {
  reference: string;
  amount: number;
  currency: string;
  channel: string;
  paidAt: string | null;
  email: string;
  customerName: string | null;
};

export function Payments() {
  const getKey = useServerFn(getPaystackPublicKey);
  const verify = useServerFn(verifyPaystackPayment);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("50000");
  const [status, setStatus] = useState<"idle" | "loading" | "verifying" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    let cancelled = false;
    getKey()
      .then((r) => !cancelled && setPublicKey(r.publicKey))
      .catch((e) => console.error("[paystack] key fetch failed", e));
    // Preload script
    loadPaystack().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [getKey]);

  const handlePay = async () => {
    setErrorMsg(null);
    const amountNum = Number(amount);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!amountNum || amountNum < 100) {
      setErrorMsg("Please enter an amount of at least ₦100.");
      return;
    }
    if (!publicKey) {
      setErrorMsg("Payment gateway is initializing. Please try again in a moment.");
      return;
    }

    try {
      setStatus("loading");
      const Paystack = await loadPaystack();
      const handler = Paystack.setup({
        key: publicKey,
        email,
        amount: Math.round(amountNum * 100), // NGN → kobo
        currency: "NGN",
        firstname: name || undefined,
        metadata: { source: "Nova Studio Portfolio", customer_name: name || null },
        callback: (res) => {
          void (async () => {
            try {
              setStatus("verifying");
              const result = await verify({ data: { reference: res.reference } });
              if (result.success) {
                setReceipt({
                  reference: result.reference,
                  amount: result.amount,
                  currency: result.currency,
                  channel: result.channel,
                  paidAt: result.paidAt,
                  email: result.email,
                  customerName: result.customerName,
                });
                setStatus("success");
              } else {
                setErrorMsg(result.message || "Payment could not be verified.");
                setStatus("error");
              }
            } catch (e) {
              console.error(e);
              setErrorMsg("We could not verify your payment. Please contact support with your reference.");
              setStatus("error");
            }
          })();
        },
        onClose: () => {
          setStatus((s) => (s === "loading" ? "idle" : s));
        },
      });
      handler.openIframe();
    } catch (e) {
      console.error(e);
      setErrorMsg("Unable to open the payment window. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrorMsg(null);
    setReceipt(null);
  };

  const downloadReceipt = () => {
    if (!receipt) return;
    const dt = receipt.paidAt ? new Date(receipt.paidAt) : new Date();
    const lines = [
      "NOVA STUDIO — Payment Receipt",
      "================================",
      `Reference:      ${receipt.reference}`,
      `Receipt No.:    NS-${receipt.reference.slice(-8).toUpperCase()}`,
      `Name:           ${receipt.customerName || "—"}`,
      `Email:          ${receipt.email}`,
      `Amount Paid:    ${(receipt.amount / 100).toLocaleString("en-NG", { style: "currency", currency: receipt.currency || "NGN" })}`,
      `Payment Method: ${receipt.channel}`,
      `Date & Time:    ${dt.toLocaleString()}`,
      `Status:         SUCCESS`,
      "",
      "Thank you for choosing Nova Studio.",
    ].join("\n");
    const blob = new Blob([lines], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nova-studio-receipt-${receipt.reference}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="payments" className="relative py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-gold/5 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <SectionLabel>Payments</SectionLabel>
          <h2 className="mt-5 font-display text-[3.4rem] font-semibold leading-[1.05] tracking-tight text-white md:text-[4.6rem] lg:text-[5.4rem]">
            Secure <span className="text-gold-gradient italic">Payments</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/80">
            Pay securely with cards, bank transfer, USSD, and mobile money — powered by Paystack.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-3xl glass-panel p-8 md:p-10"
        >
          {status === "success" && receipt ? (
            <SuccessView receipt={receipt} onDownload={downloadReceipt} onReset={reset} />
          ) : (
            <div className="grid gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <TextField label="Full Name" placeholder="Jane Doe" value={name} onChange={setName} />
                <TextField
                  label="Email"
                  type="email"
                  placeholder="jane@email.com"
                  value={email}
                  onChange={setEmail}
                />
              </div>
              <TextField
                label="Amount (₦ NGN)"
                type="number"
                placeholder="50000"
                value={amount}
                onChange={setAmount}
              />

              <div className="flex items-center gap-2 rounded-2xl border border-border/60 bg-surface/40 px-4 py-3 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-gold" />
                256-bit SSL encryption. Your card details are handled by Paystack — never by us.
              </div>

              {errorMsg && (
                <div className="flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handlePay}
                disabled={status === "loading" || status === "verifying"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ffe9a0] via-gold to-[#b8860b] px-8 py-4 text-sm font-semibold text-primary-foreground gold-glow transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Opening secure checkout…
                  </>
                )}
                {status === "verifying" && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Verifying payment…
                  </>
                )}
                {(status === "idle" || status === "error") && (
                  <>
                    <CreditCard className="h-4 w-4" /> Pay Now
                  </>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Supports Cards, Bank Transfer, USSD, Mobile Money & more.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function SuccessView({
  receipt,
  onDownload,
  onReset,
}: {
  receipt: Receipt;
  onDownload: () => void;
  onReset: () => void;
}) {
  const dt = receipt.paidAt ? new Date(receipt.paidAt) : new Date();
  const receiptNo = `NS-${receipt.reference.slice(-8).toUpperCase()}`;
  return (
    <div className="text-center">
      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h3 className="mt-5 font-display text-3xl font-semibold text-white md:text-4xl">
        Payment Successful
      </h3>
      <p className="mt-2 text-sm text-foreground/80">
        Your payment has been received successfully. Thank you for choosing Nova Studio.
      </p>

      <div className="mx-auto mt-8 max-w-md divide-y divide-white/10 rounded-2xl border border-border/60 bg-surface/40 text-left">
        <Row k="Reference" v={receipt.reference} />
        <Row k="Receipt No." v={receiptNo} />
        <Row
          k="Amount Paid"
          v={(receipt.amount / 100).toLocaleString("en-NG", {
            style: "currency",
            currency: receipt.currency || "NGN",
          })}
        />
        <Row k="Payment Method" v={receipt.channel} />
        <Row k="Date & Time" v={dt.toLocaleString()} />
        <Row k="Status" v="SUCCESS" accent />
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={onDownload}
          className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-primary-foreground"
        >
          <Download className="h-4 w-4" /> Download Receipt
        </button>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-elevated"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

function Row({ k, v, accent }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span
        className={`text-right font-medium ${accent ? "text-emerald-400" : "text-foreground"}`}
      >
        {v}
      </span>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60"
      />
    </div>
  );
}
