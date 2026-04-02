import { JoinForm } from "@/components/join/join-form";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_bottom,#f8fcf9,#ffffff)] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <JoinForm />
      </div>
    </main>
  );
}