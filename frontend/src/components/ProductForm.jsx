import { useState } from 'react';

const EMPTY_FORM = { name: '', description: '', price: '', quantity: '' };

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ? { ...initial } : EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (form.price === '' || isNaN(form.price)) e.price = 'Valid price is required';
    else if (Number(form.price) < 0) e.price = 'Price must be non-negative';
    if (form.quantity !== '' && Number(form.quantity) < 0) e.quantity = 'Quantity must be non-negative';
    return e;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    try {
      await onSubmit({
        ...form,
        price: parseFloat(form.price),
        quantity: form.quantity !== '' ? parseInt(form.quantity, 10) : 0,
      });
    } catch (serverErr) {
      if (serverErr?.details) setErrors(serverErr.details);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name *</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label>Description</label>
        <input name="description" value={form.description} onChange={handleChange} placeholder="Optional description" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Price *</label>
          <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} placeholder="0.00" />
          {errors.price && <span className="field-error">{errors.price}</span>}
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} placeholder="0" />
          {errors.quantity && <span className="field-error">{errors.quantity}</span>}
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initial ? 'Update Product' : 'Add Product'}
        </button>
        {onCancel && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
