export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-gray-100 rounded w-1/3" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-24 bg-gray-100 rounded-xl" />
        <div className="h-24 bg-gray-100 rounded-xl" />
        <div className="h-24 bg-gray-100 rounded-xl" />
      </div>
      <div className="h-64 bg-gray-100 rounded-xl" />
    </div>
  );
}