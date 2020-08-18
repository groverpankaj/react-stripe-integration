import React from 'react';

const FormField = ({ name, label, type, placeholder, value, required, readOnly }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input className="form-control" name={name} type={type} placeholder={placeholder} value={value} required={required} readOnly={readOnly} />
  </div>
);

export default FormField;
