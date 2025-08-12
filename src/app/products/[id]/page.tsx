
'use client';

import productsData from '@/data/products.json';
import { Product } from '@/components/ProductCard';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { addToCart } = useCart();
  const products: Product[] = productsData;
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h1>Prodotto non trovato</h1>
        <p>Il prodotto che stai cercando non esiste.</p>
        <Link href="/" className="btn btn-primary">Torna alla Homepage</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} è stato aggiunto al carrello!`);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} className="img-fluid rounded" alt={product.name} style={{ width: '300px', height: '200px', objectFit: 'cover' }} />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="lead">{product.description}</p>
          <h2 className="mb-3">€{product.price.toFixed(2)}</h2>
          <div className="card bg-light p-3 mb-3">
            <p className="mb-1"><strong>Categoria:</strong> {product.category}</p>
            <p className="mb-1"><strong>SKU:</strong> {product.sku}</p>
            <p className="mb-0"><strong>Disponibilità:</strong> {product.stock_quantity} unità</p>
          </div>
          <button className="btn btn-success btn-lg" onClick={handleAddToCart}>
            Aggiungi al Carrello
          </button>
        </div>
      </div>
      <div className="mt-5">
        <Link href="/" className="btn btn-outline-secondary">← Torna al catalogo</Link>
      </div>
    </div>
  );
}
