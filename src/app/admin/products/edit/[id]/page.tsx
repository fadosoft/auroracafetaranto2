
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Product } from '@/components/ProductCard';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${id}`);
          if (!response.ok) throw new Error('Prodotto non trovato.');
          const data = await response.json();
          setProduct(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...product,
            price: parseFloat(product.price as any),
            stock_quantity: parseInt(product.stock_quantity as any, 10),
          }),
        });

      if (!response.ok) {
        throw new Error('Aggiornamento fallito.');
      }

      router.push('/admin');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Caricamento prodotto...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1>Modifica Prodotto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome Prodotto</label>
          <input type="text" className="form-control" id="name" name="name" value={product.name || ''} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descrizione</label>
          <textarea className="form-control" id="description" name="description" value={product.description || ''} onChange={handleChange} required />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">Prezzo</label>
            <input type="number" step="0.01" className="form-control" id="price" name="price" value={product.price || ''} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="stock_quantity" className="form-label">Quantità</label>
            <input type="number" className="form-control" id="stock_quantity" name="stock_quantity" value={product.stock_quantity || ''} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="category" className="form-label">Categoria</label>
            <input type="text" className="form-control" id="category" name="category" value={product.category || ''} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="sku" className="form-label">SKU</label>
            <input type="text" className="form-control" id="sku" name="sku" value={product.sku || ''} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Salvataggio...' : 'Salva Modifiche'}
        </button>
      </form>
    </div>
  );
}
