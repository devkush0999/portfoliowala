"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buttonClass, inputClass, labelClass } from "@/components/admin/fields";
import { Container } from "@/components/ui";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <Container className="flex min-h-[70vh] items-center py-16">
      <form
        className="mx-auto grid w-full max-w-md gap-5 rounded-md border border-line bg-surface p-7"
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError("");
          const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
          });
          setBusy(false);
          if (!response.ok) {
            setError("Wrong password");
            return;
          }
          router.push("/admin");
          router.refresh();
        }}
      >
        <h1 className="font-display text-3xl text-ink">CMS login</h1>
        <label className={labelClass}>
          Password
          <input
            type="password"
            required
            className={inputClass}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <button type="submit" className={buttonClass} disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </Container>
  );
}
