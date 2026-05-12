import { JoinForm } from "@/components/join/join-form";
import { PageHero } from "@/components/ui/page-hero";

export default function JoinPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)]">
      <PageHero
        icon="userplus"
        title="Join CMAB"
        description="To apply for membership, please fill out the form below. After reviewing your information, our team will inform you about the next steps."
      />


      <div className="mx-auto mt-8 w-full max-w-4xl px-4 sm:mt-10 sm:px-6 lg:px-8">
        <JoinForm />
      </div>
    </main>
  );
}