"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { serif } from "@/lib/fonts";

/* ---------- Section heading: title + short underline ---------- */
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2 className={`${serif.className} text-xl text-[#3a2f27]`}>
        {children}
      </h2>
      <span className="mt-3 block h-px w-10 bg-[#c9b9a3]" />
    </div>
  );
}

/* ---------- Intro line under heading ---------- */
export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className={`${serif.className} mt-6 text-sm text-[#4a3e35] sm:text-base`}>
      {children}
    </p>
  );
}

/* ---------- Label + input ---------- */
type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
};

export function Field({ label, icon, className = "", id, ...props }: FieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className={`${serif.className} block text-[10px] tracking-[0.04em] text-[#4a3e35] uppercase`}
      >
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          id={inputId}
          {...props}
          className={`${serif.className} h-10 w-full border border-[#d9ccbb] bg-[#f3ece3] px-3 text-xs tracking-wide text-[#3a2f27] uppercase outline-none transition placeholder:text-[#a39787] focus:border-[#b9a07d] ${
            icon ? "pr-10" : ""
          } ${className}`}
        />
        {icon && (
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[#5a4d43]">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- Password field with eye toggle ---------- */
export function PasswordField({
  label,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string }) {
  const [show, setShow] = useState(false);
  return (
    <Field
      label={label}
      type={show ? "text" : "password"}
      className="normal-case"
      icon={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="flex items-center"
        >
          {show ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      }
      {...props}
    />
  );
}

/* ---------- Buttons ---------- */
export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${serif.className} h-10 bg-[#b9a07d] px-6 text-xs text-white transition hover:bg-[#a98f6b] ${className}`}
    >
      {children}
    </button>
  );
}

export function OutlineButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${serif.className} h-10 border border-[#8a7d70] bg-transparent px-6 text-xs text-[#3a2f27] transition hover:bg-[#3a2f27] hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------- Icons ---------- */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-4 w-4",
};

export const EyeIcon = () => (
  <svg {...base}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EyeOffIcon = () => (
  <svg {...base}>
    <path d="M1 12s4-7 11-7c2 0 3.8.6 5.3 1.5M23 12s-4 7-11 7c-2 0-3.8-.6-5.3-1.5" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    <path d="M3 3l18 18" />
  </svg>
);

export const CalendarIcon = () => (
  <svg {...base}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export const CopyIcon = () => (
  <svg {...base} className="h-3.5 w-3.5">
    <rect x="9" y="9" width="12" height="12" rx="1.5" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </svg>
);

export const ChatIcon = () => (
  <svg {...base} className="h-4 w-4">
    <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z" />
  </svg>
);

export const MailIcon = () => (
  <svg {...base} className="h-4 w-4">
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const ArrowRightIcon = () => (
  <svg {...base} className="h-3.5 w-3.5">
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);