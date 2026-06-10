import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplyForm.css';

/**
 * Reusable application form.
 * Props:
 *   title        - form heading
 *   fields       - array of { name, label, type, options, required, placeholder }
 *   onSubmit     - async fn(formData) → should call emailjs
 *   appliedFor   - string label for success page
 */
export default function ApplyForm({ title, fields, onSubmit, appliedFor }) {
  const navigate = useNavigate();
  const initial  = fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});
  const [form,   setForm]   = useState(initial);
  const [status, setStatus] = useState('idle');
  const [error,  setError]  = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic required check
    for (const f of fields) {
      if (f.required && !form[f.name]) {
        setError(`Please fill in: ${f.label}`);
        return;
      }
    }

    setStatus('loading');
    try {
      await onSubmit({ ...form, appliedFor });
    } catch (err) {
      // POC: continue to success even if email not yet configured
      console.warn('EmailJS not configured — proceeding as demo:', err.text || err);
    }
    navigate('/apply-success', { state: { name: form.name || form.clientName, appliedFor } });
  };

  return (
    <div className="apply-form-card">
      <h3 className="apply-form-title">{title}</h3>
      <span className="gold-divider" />

      {error && <div className="form-alert form-alert-error">{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        {/* Render fields in pairs (form-row) where possible */}
        {chunkPairs(fields).map((pair, i) =>
          pair.length === 2 ? (
            <div className="form-row" key={i}>
              {pair.map(f => <FormField key={f.name} field={f} value={form[f.name]} onChange={handleChange} />)}
            </div>
          ) : (
            <FormField key={pair[0].name} field={pair[0]} value={form[pair[0].name]} onChange={handleChange} />
          )
        )}

        <button
          type="submit"
          className="btn btn-gold apply-form-submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Submitting…' : 'Submit Application'}
        </button>
        <p className="apply-form-note">
          📧 You'll receive a confirmation on your email. Our team will contact you shortly.
        </p>
      </form>
    </div>
  );
}

function FormField({ field, value, onChange }) {
  const { name, label, type = 'text', options, required, placeholder } = field;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}{required && ' *'}</label>
      {type === 'select' ? (
        <select id={name} name={name} value={value} onChange={onChange} required={required}>
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea id={name} name={name} value={value} onChange={onChange} rows={4} placeholder={placeholder} required={required} />
      ) : (
        <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} />
      )}
    </div>
  );
}

// Group fields into pairs (2 per row), except textarea/select-full go solo
function chunkPairs(fields) {
  const result = [];
  let i = 0;
  while (i < fields.length) {
    const f = fields[i];
    const next = fields[i + 1];
    if ((f.type === 'textarea' || f.fullRow) || !next || next.type === 'textarea' || next.fullRow) {
      result.push([f]);
      i++;
    } else {
      result.push([f, next]);
      i += 2;
    }
  }
  return result;
}
