
'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { cartItems } = useCart();

  // Calcoliamo il numero totale di articoli nel carrello
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container d-flex flex-column align-items-center">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link href="/" className="navbar-brand">
            <img src="/logo.webp" alt="Aurora Cafè Logo" className="navbar-logo" />
          </Link>
          <span className="text-center my-2 display-4 fw-bold text-dark">
            Benvenuti in Aurora Cafè
          </span>
          <div className="d-flex">
            <Link href="/cart" className="btn btn-success">
              <i className="bi-cart-fill me-1"></i>
              Carrello
              <span className="badge bg-dark text-white ms-1 rounded-pill">{totalItems}</span>
            </Link>
          </div>
        </div>
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/products" className="nav-link">I nostri prodotti</Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link">Chi siamo</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link">Contatti</Link>
            </li>
          </ul>
      </div>
    </nav>
  );
}
