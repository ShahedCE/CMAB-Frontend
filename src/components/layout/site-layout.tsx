import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}