import { MessageForm } from "@/components/admin/messages/message-form";

export default function CreateMessagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Create Message</h1>
        <p className="text-sm text-black-300">
          Add a new public message.
        </p>
      </div>

      <MessageForm />
    </div>
  );
}