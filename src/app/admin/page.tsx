
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/components/ProductCard';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Funzione per caricare i prodotti, riutilizzabile
  const fetchProducts = async () => {
    console.log('Inizio fetchProducts...');
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        const errorText = await response.text(); // Read response body for more details
        throw new Error(`Errore nel caricamento dei prodotti: ${response.status} ${response.statusText} - ${errorText}`);
      }
      const data = await response.json();
      console.log('Dati ricevuti:', data);
      setProducts(data);
      console.log('setProducts chiamato.');
    } catch (err: any) {
      console.error('Errore in fetchProducts:', err);
      setError(err.message);
    } finally {
      console.log('Fine fetchProducts, setLoading(false).');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Sei sicuro di voler eliminare questo prodotto? L\'azione è irreversibile.')) {
      try {
        const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Eliminazione fallita.');
        }
        // Aggiorna la UI rimuovendo il prodotto dallo stato locale
        setProducts(products.filter((p) => p.id !== id));
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (loading) return <p>Caricamento in corso...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard Amministrazione</h1>
        <Link href="/admin/products/new" className="btn btn-primary">
          Aggiungi Prodotto
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Prezzo</th>
            <th>Quantità</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>€{product.price.toFixed(2)}</td>
              <td>{product.stock_quantity}</td>
              <td>
                <Link href={`/admin/products/edit/${product.id}`} className="btn btn-sm btn-warning me-2">
                  Modifica
                </Link>
                <button onClick={() => handleDelete(product.id)} className="btn btn-sm btn-danger">
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
