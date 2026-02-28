const API_URL = (process as any).env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}products`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched products:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: [] };
  }
}

export async function fetchProductById(id: string) {
  try {
    const response = await fetch(`${API_URL}products/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched product:', data);
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}