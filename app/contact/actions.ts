"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<"name" | "email" | "subject" | "message", string>>; values: Record<string, string> }
  | { status: "sent" }
  | { status: "unavailable"; mailto: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Champ piège : rempli uniquement par les robots.
  if (String(formData.get("website") ?? "").trim()) return { status: "sent" };

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: Partial<Record<keyof typeof values, string>> = {};
  if (values.name.length < 2) errors.name = "Indiquez votre nom.";
  if (!EMAIL.test(values.email)) errors.email = "Indiquez une adresse e-mail valide, par exemple nom@domaine.cm.";
  if (values.subject.length < 3) errors.subject = "Précisez l’objet de votre message.";
  if (values.message.length < 10) errors.message = "Votre message doit contenir au moins 10 caractères.";
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  const endpoint = process.env.CONTACT_ENDPOINT;
  const mailto = `mailto:contact@pad.cm?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(
    `${values.message}\n\n${values.name}\n${values.email}`,
  )}`;

  // Tant qu'aucun service d'envoi n'est configuré, on propose l'envoi par messagerie.
  if (!endpoint) return { status: "unavailable", mailto };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!response.ok) return { status: "unavailable", mailto };
    return { status: "sent" };
  } catch {
    return { status: "unavailable", mailto };
  }
}
