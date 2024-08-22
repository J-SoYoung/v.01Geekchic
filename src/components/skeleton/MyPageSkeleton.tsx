const MyPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex justify-start mb-8">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="ml-4 text-left">
          <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-60 bg-gray-200 rounded "></div>
        </div>
      </div>
      <div className="">
        <div className="space-y-4 pb-16 mb-16 border-b">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-6"></div>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-6"></div>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-6"></div>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md">
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageSkeleton;
