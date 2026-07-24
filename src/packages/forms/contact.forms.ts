import { contactSchema } from "../schemas/contact.schema";
import type { FormListType } from "./form.types";

/**
 * contact.forms.ts
 * --------------------------------------------------------------
 * Field/schema config for the public contact form, rendered through
 * the same DynamicForm engine auth forms use — see
 * components/features/contact/ContactForm.tsx.
 */
export const contactFormConfig: Record<"CONTACT", FormListType> = {
  CONTACT: {
    key: "CONTACT",
    title: "Contact Us",
    description:
      "Have a question or feedback? Send us a message and we'll get back to you.",
    icon: "Mail",
    submit: {
      label: "Send Message",
      onSubmitLabel: "Sending...",
    },
    formInputs: [
      {
        key: "CONTACT-FULLNAME",
        id: "fullname",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your name",
        required: true,
        errorMessage: "Full name is required",
      },
      {
        key: "CONTACT-EMAIL",
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
        errorMessage: "Email is required",
      },
      {
        key: "CONTACT-TOPIC",
        id: "topic",
        label: "Topic",
        type: "text",
        placeholder: "What is this about?",
        required: true,
        errorMessage: "Topic is required",
      },
      {
        key: "CONTACT-MESSAGE",
        id: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Write your message...",
        required: true,
        errorMessage: "Message is required",
      },
      {
        key: "CONTACT-NEWSLETTER",
        id: "newsletter",
        label: "Subscribe to our newsletter",
        type: "checkbox",
        placeholder: "",
        required: false,
        errorMessage: "",
      },
    ],
  },
};

export type ContactFormKey = keyof typeof contactFormConfig;

export const contactSchemaMap = {
  CONTACT: contactSchema,
} as const;
