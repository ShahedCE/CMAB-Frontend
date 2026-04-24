export default function MemberNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          সদস্য খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-slate-500 mt-2">
          এই সদস্যটি হয়তো এখনো অনুমোদিত হয়নি বা মুছে ফেলা হয়েছে।
        </p>
      </div>
    </div>
  );
}