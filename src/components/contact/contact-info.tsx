import Link from "next/link";

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 21s-6-5.2-6-11a6 6 0 1 1 12 0c0 5.8-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.6 1.7-1.6H16V4.8c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.8V11H8v3h2.2v7h3.3Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M20 11.9c0 4.4-3.6 8-8 8-1.4 0-2.7-.4-3.9-1l-4.1 1.1 1.1-4A7.9 7.9 0 0 1 4 12c0-4.4 3.6-8 8-8s8 3.5 8 7.9Zm-8-6.6a6.6 6.6 0 0 0-5.7 9.8l.2.3-.7 2.5 2.5-.7.3.2A6.6 6.6 0 1 0 12 5.3Zm3.9 8.4c-.2-.1-1.1-.6-1.3-.7-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.2-.4.1-.9-.4-1.7-1-2.4-1.7-.5-.6-1-1.2-1.3-2-.1-.2 0-.3.1-.4l.3-.3.2-.3.1-.3c0-.1 0-.3-.1-.4l-.6-1.4c-.1-.3-.3-.3-.4-.3h-.4c-.1 0-.3.1-.5.3-.6.6-.8 1.3-.8 2 0 .2 0 .5.1.7.3 1 .9 2 1.7 2.8 1.1 1.2 2.5 2 4 2.5.4.1.8.2 1.2.2.7 0 1.4-.2 1.9-.7.3-.3.5-.8.6-1.3 0-.1 0-.2-.2-.3Z" />
    </svg>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
};

function InfoItem({ icon, title, content }: InfoItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-(--brand-green-soft)
       text-(--brand-green-dark)">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
          {title}
        </h3>
        <div className="mt-2 text-sm leading-7 text-slate-700">{content}</div>
      </div>
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className="space-y-5">
     
      <InfoItem
        icon={<LocationIcon />}
        title="প্রধান কার্যালয়ের ঠিকানা"
        content={
          <p>
            খ্রিস্টিয়ান মেডিকেল অ্যাসোসিয়েশন বাংলাদেশ (সিএমএবি)
            <br />
            জাতীয় চার্চ পরিষদ, বাংলাদেশ ।
            <br />
            ৩৯৫ নিউ ইসকাটন রোড, রমনা, ঢাকা-১২১৭
       
          </p>
        }
      />

      <InfoItem
        icon={<PhoneIcon />}
        title="ফোন / হোয়াটসঅ্যাপ"
        content={
          <div className="flex flex-col gap-1">
            <Link
              href="tel:+8801715493330"
              className="text-slate-700 transition-colors hover:text-(--brand-green-dark)"
            >
              +880 1715-493330
            </Link>
            <Link
              href="https://wa.me/8801715493330"
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 transition-colors hover:text-(--brand-green-dark)"
            >
              হোয়াটসঅ্যাপে চ্যাট করুন
            </Link>
          </div>
        }
      />

      <InfoItem
        icon={<MailIcon />}
        title="ইমেইল ঠিকানা"
        content={
          <Link
            href="mailto:info@cmab.org"
            className="text-slate-700 transition-colors hover:text-(--brand-green-dark)"
          >
            cmabgs24@gmail.com
          </Link>
        }
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
          সোশ্যাল লিংকসমূহ
        </h3>

        <div className="mt-4 flex items-center gap-3">
          <Link
            href="https://web.facebook.com/people/Christian-Medical-Association-Bangladesh/61586551870820/?_rdc=1&_rdr#"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border 
            border-[rgba(10,163,79,0.14)] bg-white text-slate-700 transition-all 
            duration-300 hover:-translate-y-1 hover:border-(--brand-green) 
            hover:bg-(--brand-green-soft) hover:text-(--brand-green-dark)"
          >
            <FacebookIcon />
          </Link>

          <Link
            href="https://wa.me/8801715493330"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border
             border-[rgba(10,163,79,0.14)] bg-white text-slate-700 transition-all 
             duration-300 hover:-translate-y-1 hover:border-(--brand-green) hover:bg-(--brand-green-soft)
              hover:text-(--brand-green-dark)"
          >
            <WhatsAppIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}