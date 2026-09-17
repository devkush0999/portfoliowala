"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const subject = encodeURIComponent(`Message from ${name}`);
        const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      }}
    >
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-ink">Name</span>
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-11 rounded-sm border border-line bg-white px-3 text-ink outline-none focus:border-accent"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-ink">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 rounded-sm border border-line bg-white px-3 text-ink outline-none focus:border-accent"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span className="font-medium text-ink">Message</span>
        <textarea
          required
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded-sm border border-line bg-white px-3 py-3 text-ink outline-none focus:border-accent"
        />
      </label>
      <button
        type="submit"
        className="h-11 rounded-sm bg-accent px-5 text-sm font-medium text-white transition hover:bg-accent-dim"
      >
        Send message
      </button>
    </form>
  );
}
