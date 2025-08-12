
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock_quantity, setStockQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [sku, setSku] = useState('');
  const [image, setImage] = useState('/images/placeholder.jpg'); // Default placeholder
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          stock_quantity: parseInt(stock_quantity, 10),
          category,
          sku,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error('Salvataggio fallito.');
      }

      // Se il salvataggio va a buon fine, torna alla dashboard
      router.push('/admin');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Aggiungi un Nuovo Prodotto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome Prodotto</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descrizione</label>
          <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">Prezzo</label>
            <input type="number" step="0.01" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="stock_quantity" className="form-label">Quantità in Magazzino</label>
            <input type="number" className="form-control" id="stock_quantity" value={stock_quantity} onChange={(e) => setStockQuantity(e.target.value)} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="category" className="form-label">Categoria</label>
            <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="sku" className="form-label">SKU</label>
            <input type="text" className="form-control" id="sku" value={sku} onChange={(e) => setSku(e.target.value)} required />
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Salvataggio...' : 'Salva Prodotto'}
        </button>
      </form>
    </div>
  );
}
