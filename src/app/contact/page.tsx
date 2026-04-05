import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { PageHero } from "@/components/ui/page-hero";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)] ">
     <PageHero
     icon="mail"
      title="আমাদের সাথে যোগাযোগ করুন"
      description="সদস্যপদ, সহযোগিতা, কার্যক্রম বা সাধারণ যেকোনো বিষয়ে আমাদের সাথে যোগাযোগ করুন। আমরা আপনার কথা জানতে আগ্রহী।"
    />
          
      <div className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <ContactInfo />
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
