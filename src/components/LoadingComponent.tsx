'use client'
function SkeletonCard() {
    return (
      <div className="w-full p-4 bg-white shadow-md">
        <div>
            <div className="flex flex-row gap-4">
            <div className="w-1/4 h-16 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="w-2/4">
          <div className="w-full h-4 bg-gray-300 animate-pulse rounded"></div>
          <div className="w-full h-4 mt-2 bg-gray-300 animate-pulse rounded"></div>
        </div>
            </div>
        </div>
        <div className="mt-4 w-full h-12 bg-gray-300 animate-pulse rounded"></div>
      </div>
    );
  }
  

  export default function Skeleton(){
    return (
        <div className="space-y-2 bg-gray-200 pt-2 pb-4">
            {Array(5).fill(0).map((_, index) => (
                <SkeletonCard key={index} />))}
        </div>
    )
  }