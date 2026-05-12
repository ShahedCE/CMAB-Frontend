import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { PageHero } from "@/components/ui/page-hero";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)] ">
     <PageHero
       icon="mail"
       title="Contact Us"
       description="For membership, collaboration, activities, or any general inquiries, please reach out to us. We would love to hear from you."
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
