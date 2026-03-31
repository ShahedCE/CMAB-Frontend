import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  showText?: boolean;
};

export function Logo({ showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-2xl transition-all duration-300 hover:opacity-95"
      aria-label="CMAB Home"
    >
      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white bg-white shadow-sm ring-1 ring-slate-100 sm:h-14 sm:w-14">
        <Image
          src="/cmab-logo.jpeg"
          alt="CMAB Logo"
          fill
          className="object-cover"
          sizes="56px"
          priority
        />
      </div>

      {showText ? (
        <div className="min-w-0">
          <p className="text-lg font-extrabold leading-none tracking-tight text-slate-900">
            CMAB
          </p>
          <p className="mt-1 hidden text-sm leading-tight text-slate-500 sm:block">
            Christian Medical Association Bangladesh
          </p>
        </div>
      ) : null}
    </Link>
  );
}