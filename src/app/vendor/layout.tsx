export const dynamic = 'force-dynamic';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Vendor Panel</h1>
          <div className="space-x-4">
            <a href="/vendor/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
            <a href="/vendor/products" className="text-blue-600 hover:underline">Products</a>
            <a href="/vendor/orders" className="text-blue-600 hover:underline">Orders</a>
            <a href="/vendor/reviews" className="text-blue-600 hover:underline">Reviews</a>
            <a href="/vendor/messages" className="text-blue-600 hover:underline">Messages</a>
            <a href="/vendor/auth" className="text-red-600 hover:underline">Logout</a>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}