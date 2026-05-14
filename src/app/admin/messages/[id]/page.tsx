import { MessageForm } from "@/components/admin/messages/message-form";
import { getAdminMessageById } from "@/lib/admin/messages-api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditMessagePage({ params }: Props) {
  const { id } = await params;
  const message = await getAdminMessageById(id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Edit Message</h1>
        <p className="text-sm text-black-300">
          Update public message information.
        </p>
      </div>

      <MessageForm message={message} />
    </div>
  );
}