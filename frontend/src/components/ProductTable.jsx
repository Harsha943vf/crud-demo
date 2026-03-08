export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="empty-state">No products found. Add one above!</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td><strong>{p.name}</strong></td>
              <td className="desc-cell">{p.description || '—'}</td>
              <td className="price-cell">${p.price.toFixed(2)}</td>
              <td>{p.quantity ?? 0}</td>
              <td className="actions-cell">
                <button className="btn btn-edit" onClick={() => onEdit(p)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
