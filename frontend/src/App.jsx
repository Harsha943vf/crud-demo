import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './api/productApi';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import Modal from './components/Modal';
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [editTarget, setEditTarget] = useState(null);   // product being edited
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
    } catch {
      setError('Failed to load products. Is the Spring Boot server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  async function handleCreate(data) {
    await createProduct(data);
    await loadProducts();
    setShowAddModal(false);
    showToast('Product created successfully!');
  }

  async function handleUpdate(data) {
    await updateProduct(editTarget.id, data);
    await loadProducts();
    setEditTarget(null);
    showToast('Product updated successfully!');
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return;
    await deleteProduct(id);
    await loadProducts();
    showToast('Product deleted.', 'danger');
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="header-icon">📦</span>
            <h1>Product Manager</h1>
          </div>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            + Add Product
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="app-main">
        {/* Search bar */}
        <div className="toolbar">
          <input
            className="search-input"
            type="text"
            placeholder="🔍  Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="product-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* States */}
        {loading && <div className="spinner-wrap"><div className="spinner" /></div>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && (
          <ProductTable products={filtered} onEdit={setEditTarget} onDelete={handleDelete} />
        )}
      </main>

      {/* Add modal */}
      {showAddModal && (
        <Modal title="Add New Product" onClose={() => setShowAddModal(false)}>
          <ProductForm onSubmit={handleCreate} onCancel={() => setShowAddModal(false)} />
        </Modal>
      )}

      {/* Edit modal — key forces form to re-mount with fresh state */}
      {editTarget && (
        <Modal title="Edit Product" onClose={() => setEditTarget(null)}>
          <ProductForm
            key={editTarget.id}
            initial={editTarget}
            onSubmit={handleUpdate}
            onCancel={() => setEditTarget(null)}
          />
        </Modal>
      )}

      {/* Toast */}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
