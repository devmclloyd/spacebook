
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        setProducts(data || []);
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Spacebook</h1>
              <div className="ml-10 flex space-x-4">
                <a href="/" className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Home</a>
                <a href="/products" className="px-3 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">Products</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add Product
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
              Error: {error}
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-10">
              <p>Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.image_url ? (
                            <div className="h-10 w-10 mr-3 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full object-cover" src={product.image_url} alt="" />
                            </div>
                          ) : (
                            <div className="h-10 w-10 mr-3 rounded-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">No img</span>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            {product.sku && (
                              <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 bg-white shadow rounded-lg">
              <p className="text-gray-500">No products found. Add your first product to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
