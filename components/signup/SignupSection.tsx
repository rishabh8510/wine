"use client";

// components/SignupSection.jsx
// Sirf form hai, koi image nahi chahiye.
// Install: npm i react-icons

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiChevronDown,
  HiOutlineArrowLongRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import { Baskervville } from "next/font/google";

const baskerville = Baskervville({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const YEARS = Array.from({ length: 90 }, (_, i) =>
  String(new Date().getFullYear() - 21 - i)
);

/* ---------- chhote reusable pieces ---------- */

const inputClass =
  "mt-1.5 block h-10 w-full border border-[#CFC2B0] bg-transparent px-3 text-sm text-[#3A322C] outline-none transition-colors focus:border-[#BBA37F] focus:ring-1 focus:ring-[#BBA37F]";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-l-4 border-[#7A7F6E] pl-5 text-lg font-semibold uppercase leading-8 tracking-[0.15em] text-black sm:pl-6 sm:text-xl">
      {children}
    </h2>
  );
}

function Field({
  label,
  required,
  htmlFor,
  children,
  className = "",
}: {
  label: string;
  required?: boolean;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-[11px] uppercase tracking-wide">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ id, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { id: string }) {
  return <input id={id} name={id} className={inputClass} {...props} />;
}

function Select({
  id,
  placeholder = "Select",
  options,
  ...props
}: {
  id: string;
  placeholder?: string;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        defaultValue=""
        className={`${inputClass} appearance-none pr-9 text-xs uppercase`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <HiChevronDown
        className="pointer-events-none absolute right-3 top-1/2 mt-[3px] h-4 w-4 -translate-y-1/2"
        aria-hidden="true"
      />
    </div>
  );
}

function PasswordInput({
  id,
  ...props
}: { id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  const Icon = show ? HiOutlineEyeSlash : HiOutlineEye;
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={show ? "text" : "password"}
        className={`${inputClass} pr-10`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 mt-[3px] -translate-y-1/2"
      >
        <Icon className="h-4 w-4" />
      </button>
    </div>
  );
}

function Checkbox({ id, children, required }: { id: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 text-[11px] uppercase">
      <input
        id={id}
        name={id}
        type="checkbox"
        required={required}
        className="h-4 w-4 shrink-0 appearance-none border border-[#CFC2B0] bg-transparent checked:border-[#BBA37F] checked:bg-[#BBA37F]"
      />
      <span>{children}</span>
    </label>
  );
}

const Divider = () => <hr className="my-8 border-t border-[#E3D9CB] lg:my-10" />;

function createUserRecord(
  data: Record<string, FormDataEntryValue>,
  email: string,
  password: string
) {
  const timestamp = Date.now();
  return {
    id: timestamp.toString(),
    firstName: data.firstName,
    lastName: data.lastName,
    email,
    phone: data.phone,
    password,
    birthMonth: data.birthMonth,
    birthDay: data.birthDay,
    birthYear: data.birthYear,
    country: data.country,
    address1: data.address1,
    address2: data.address2,
    city: data.city,
    state: data.state,
    zip: data.zip,
    company: data.company,
    createdAt: new Date(timestamp).toISOString(),
  };
}

/* ---------- main component ---------- */

export default function SignupSection({
  onSubmit,
  loginHref = "/login",
  introductionOptions = ["A friend", "A family member", "Winemaker", "Other"],
  tasteOptions = ["Restaurant", "Tasting room", "Event", "Online", "Other"],
}: {
  onSubmit?: (data: Record<string, FormDataEntryValue>) => void;
  loginHref?: string;
  introductionOptions?: string[];
  tasteOptions?: string[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const password = String(data.password || "");
    const confirmPassword = String(data.confirmPassword || "");
    const email = String(data.email || "").trim().toLowerCase();

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify and try again.");
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const exists = users.some(
        (u: { email?: string }) => u.email?.trim().toLowerCase() === email
      );

      if (exists) {
        setError("An account with this email already exists. Please log in.");
        return;
      }

      const newUser = createUserRecord(data, email, password);

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("registeredEmail", email);
      localStorage.setItem("age-verified", "true");

      setSuccess("Account created successfully! Redirecting to login...");
      onSubmit?.(data);

      setTimeout(() => {
        router.push("/login");
      }, 800);
    } catch {
      setError("Failed to save account. Please try again.");
    }
  };

  return (
    <section
      className={`${baskerville.className} w-full bg-[#EFE6DC] py-10 text-[#3A322C] lg:py-14`}
    >
      <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-8 border border-[#B5524A] bg-[#B5524A]/10 p-4 text-sm text-[#B5524A]">
            {error}{" "}
            {error.includes("already exists") && (
              <Link href={loginHref} className="underline font-semibold">
                Log In here
              </Link>
            )}
          </div>
        )}

        {success && (
          <div className="mb-8 border border-[#5F7357] bg-[#5F7357]/10 p-4 text-sm text-[#5F7357]">
            {success}
          </div>
        )}

        {/* 1. Personal + Contact */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-x-14">
          {/* Personal */}
          <div>
            <SectionHeading>Personal Information</SectionHeading>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="First Name" required htmlFor="firstName">
                <Input id="firstName" required autoComplete="given-name" />
              </Field>
              <Field label="Last Name" required htmlFor="lastName">
                <Input id="lastName" required autoComplete="family-name" />
              </Field>
            </div>

            <div className="mt-4">
              <span className="block text-[11px] uppercase tracking-wide">
                Birthday <span className="text-red-600">*</span>
              </span>
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-3">
                <Select id="birthMonth" placeholder="Month" options={MONTHS} required aria-label="Birth month" />
                <Select id="birthDay" placeholder="Day" options={DAYS} required aria-label="Birth day" />
                <Select id="birthYear" placeholder="Year" options={YEARS} required aria-label="Birth year" />
              </div>
              <p className="mt-3 text-[11px]">
                You must be 21 or older to create an account.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <SectionHeading>Contact Information</SectionHeading>
            <div className="mt-8 space-y-4">
              <Field label="Mobile Phone" required htmlFor="phone">
                <Input id="phone" type="tel" required autoComplete="tel" />
              </Field>
              <Field label="Personal Email" required htmlFor="email">
                <Input id="email" type="email" required autoComplete="email" />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Password" required htmlFor="password">
                  <PasswordInput id="password" required minLength={8} autoComplete="new-password" />
                </Field>
                <Field label="Confirm Password" required htmlFor="confirmPassword">
                  <PasswordInput id="confirmPassword" required minLength={8} autoComplete="new-password" />
                </Field>
              </div>
              <p className="text-[11px]">
                Use 8 or more characters with uppercase, lowercase, number, and symbol.
              </p>
            </div>
          </div>
        </div>

        <Divider />

        {/* 2. Mailing address */}
        <SectionHeading>Mailing Address</SectionHeading>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Country" required htmlFor="country">
            <Input id="country" required autoComplete="country-name" />
          </Field>
          <Field label="Address Line 1" required htmlFor="address1">
            <Input id="address1" required autoComplete="address-line1" />
          </Field>
          <Field label="Address Line 2" htmlFor="address2">
            <Input id="address2" autoComplete="address-line2" />
          </Field>
          <Field label="City" required htmlFor="city">
            <Input id="city" required autoComplete="address-level2" />
          </Field>
          <Field label="State / Region" required htmlFor="state">
            <Input id="state" required autoComplete="address-level1" />
          </Field>
          <Field label="Zip / Postal Code" required htmlFor="zip">
            <Input id="zip" required autoComplete="postal-code" />
          </Field>
          <Field label="Company" required htmlFor="company" className="sm:col-span-2 lg:col-span-3">
            <Input id="company" required autoComplete="organization" />
          </Field>
        </div>

        <Divider />

        {/* 3. Connection */}
        <SectionHeading>Tell Us About Your Connection</SectionHeading>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Whom may we thank for the introduction?" required htmlFor="introducedBy">
            <Select id="introducedBy" options={introductionOptions} required />
          </Field>
          <Field label="Where did you first taste our wines?" required htmlFor="firstTaste">
            <Select id="firstTaste" options={tasteOptions} required />
          </Field>
          <Field label="Company" htmlFor="notes" className="sm:col-span-2">
            <textarea id="notes" name="notes" rows={4} className={`${inputClass} h-28 resize-y py-2`} />
          </Field>
        </div>

        <Divider />

        {/* 4. Terms */}
        <SectionHeading>Terms &amp; Communication</SectionHeading>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-14">
          <div className="space-y-4">
            <Checkbox id="optSms">Yes, I’d like to receive text messages.</Checkbox>
            <Checkbox id="optEmail">Yes, I’d like to receive news and release updates by email.</Checkbox>
          </div>
          <div>
            <Checkbox id="agreeTerms" required>
              I agree to the Terms &amp; Conditions and Privacy Policy. *
            </Checkbox>
            <p className="mt-4 text-[11px] uppercase leading-5">
              By creating an account, you agree to receive essential account
              communications from us. Optional marketing preferences can be
              changed at any time.
            </p>
          </div>
        </div>

        <hr className="my-8 border-t border-[#E3D9CB] lg:my-10" />

        {/* Submit */}
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="inline-flex h-10 w-full items-center justify-center gap-4 bg-[#BBA37F] px-10 text-sm text-white transition-colors hover:bg-[#a89170] sm:w-auto sm:min-w-[140px]"
          >
            Create Account
            <HiOutlineArrowLongRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <p className="mt-5 text-[11px]">
            Already have an account?{" "}
            <Link href={loginHref} className="text-[#7B7B68] hover:underline">
              Log In
            </Link>
            .
          </p>
        </div>
      </form>
    </section>
  );
}