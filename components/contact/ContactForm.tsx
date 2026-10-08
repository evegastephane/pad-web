"use client";

import { useActionState, type ReactNode } from "react";
import { sendContact, type ContactState } from "@/app/contact/actions";

const fieldClass =
  "mt-2 block w-full border border-[#8a93a6] bg-paper px-3 py-2.5 text-ink transition-colors focus:border-navy aria-[invalid=true]:border-error";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const errors = state.status === "invalid" ? state.errors : {};
  const values = state.status === "invalid" ? state.values : {};

  if (state.status === "sent") {
    return (
      <div role="status" className="border border-line bg-alt p-6">
        <p className="text-lg font-bold text-ink">Message envoyé</p>
        <p className="mt-2 text-text">Merci. Les services du PAD vous répondront à l’adresse indiquée.</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-6">
      {state.status === "unavailable" && (
        <div role="alert" className="border border-navy bg-navy-tint px-5 py-4">
          <p className="font-bold text-ink">L’envoi en ligne n’est pas encore activé.</p>
          <p className="mt-1 text-text">
            Votre message est prêt :{" "}
            <a href={state.mailto} className="font-medium text-navy underline">
              l’ouvrir dans votre messagerie
            </a>{" "}
            pour l’envoyer à contact@pad.cm.
          </p>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Nom" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            defaultValue={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClass}
          />
        </Field>
        <Field id="email" label="E-mail" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass}
          />
        </Field>
      </div>
      <Field id="subject" label="Objet" error={errors.subject}>
        <input
          id="subject"
          name="subject"
          defaultValue={values.subject}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={fieldClass}
        />
      </Field>
      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          defaultValue={values.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center border border-navy bg-navy px-6 py-2.5 font-medium text-paper transition-colors hover:bg-navy-dark disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
