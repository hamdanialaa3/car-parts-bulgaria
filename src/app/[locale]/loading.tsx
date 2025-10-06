export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <div className="bg-white shadow-mobile sticky top-0 z-50">
        <div className="bg-gray-50 border-b border-gray-200 py-1">
          <div className="container-mobile">
            <div className="flex items-center justify-between">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-16"></div>
            </div>
          </div>
        </div>
        <div className="container-mobile py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="skeleton w-10 h-10 rounded-lg"></div>
              <div className="skeleton h-6 w-32"></div>
            </div>
            <div className="skeleton h-12 w-96 rounded-lg"></div>
            <div className="flex items-center space-x-4">
              <div className="skeleton w-8 h-8 rounded"></div>
              <div className="skeleton w-8 h-8 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search section skeleton */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container-mobile">
          <div className="skeleton h-20 rounded-xl"></div>
        </div>
      </section>

      {/* Results section skeleton */}
      <section className="py-6">
        <div className="container-mobile">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="skeleton h-8 w-32"></div>
              <div className="skeleton h-6 w-24"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="skeleton h-10 w-48"></div>
              <div className="skeleton h-10 w-20"></div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar skeleton */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="card">
                <div className="skeleton h-6 w-16 mb-4"></div>
                <div className="space-y-4">
                  <div>
                    <div className="skeleton h-4 w-20 mb-2"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center">
                          <div className="skeleton w-4 h-4 mr-2"></div>
                          <div className="skeleton h-4 w-16"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="skeleton h-4 w-24 mb-2"></div>
                    <div className="flex gap-2">
                      <div className="skeleton h-8 flex-1"></div>
                      <div className="skeleton h-8 flex-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Grid skeleton */}
            <main className="flex-1">
              <div className="grid-mobile">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                  <div key={i} className="card">
                    <div className="skeleton aspect-[4/3] rounded-lg mb-3"></div>
                    <div className="space-y-2">
                      <div className="skeleton h-5 w-full"></div>  
                      <div className="skeleton h-5 w-3/4"></div>
                      <div className="skeleton h-4 w-1/2"></div>
                      <div className="skeleton h-4 w-1/3"></div>
                      <div className="skeleton h-6 w-20"></div>
                      <div className="flex items-center justify-between">
                        <div className="skeleton h-4 w-16"></div>
                        <div className="skeleton h-4 w-12"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}