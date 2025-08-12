
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // Importa il contesto

// Definiamo la struttura dei dati per un singolo prodotto
// Questo ci aiuta con il type-checking e l'autocompletamento
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  sku: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

// Il componente React per la card del prodotto
export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart(); // Usa il contesto del carrello

  return (
    <div className="col mb-4">
      <div className="card h-100">
        <img src={product.image} className="card-img-top" alt={product.name} style={{ width: '300px', height: '200px', objectFit: 'cover', margin: '0 auto', display: 'block' }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.description}</p>
          <h6 className="card-subtitle mb-2 text-muted">€{product.price.toFixed(2)}</h6>
          <div className="d-flex justify-content-between mt-auto">
            <Link href={`/products/${product.id}`} className="btn btn-primary">
              Vedi Dettagli
            </Link>
            <button className="btn btn-success" onClick={() => addToCart(product)}>
              <i className="bi bi-cart-plus"></i> Aggiungi al Carrello
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
