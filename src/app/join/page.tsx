import { JoinForm } from "@/components/join/join-form";
import { PageHero } from "@/components/ui/page-hero";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)] ">
       <PageHero
        icon="userplus"
        title="সিএমএবি-তে যোগ দিন"
        description="সদস্যপদের জন্য আবেদন করতে নিচের ফর্মটি পূরণ করুন। আপনার তথ্য পর্যালোচনার পর আমাদের টিম পরবর্তী ধাপ সম্পর্কে জানাবে।"
        />

      <div className="mx-auto mt-10 w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <JoinForm />
      </div>
    </main>
  );
}