"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { site } from "@/lib/site";

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      ref={form}
      className="grid gap-4"
      onSubmit={async (event) => {
        event.preventDefault();
        if (!form.current) {
          return;
        }
        setBusy(true);
        setStatus("");
        try {
          await emailjs.sendForm(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
            form.current,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
          );
          form.current.reset();
          setStatus("Sent. I will reply by email.");
        } catch {
          window.location.href = `mailto:${site.email}`;
        }
        setBusy(false);
      }}
    >
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-ink">Name</span>
        <input
          required
          name="from_name"
          className="h-11 rounded-sm border border-line bg-white px-3 text-ink outline-none focus:border-accent"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-ink">Email</span>
        <input
          required
          type="email"
          name="from_email"
          className="h-11 rounded-sm border border-line bg-white px-3 text-ink outline-none focus:border-accent"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-ink">Subject</span>
        <input
          required
          name="subject"
          className="h-11 rounded-sm border border-line bg-white px-3 text-ink outline-none focus:border-accent"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-ink">Message</span>
        <textarea
          required
          name="message"
          rows={6}
          className="rounded-sm border border-line bg-white px-3 py-3 text-ink outline-none focus:border-accent"
        />
      </label>
      {status ? <p className="text-sm text-accent">{status}</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="h-12 rounded-sm bg-accent px-5 text-sm font-medium text-white transition hover:bg-accent-dim sm:h-11"
      >
        {busy ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
