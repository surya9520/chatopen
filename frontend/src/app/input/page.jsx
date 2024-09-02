// InputField.js
import React from 'react';

const InputField = ({ id, type, label, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-1 font-semibold text-gray-700">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 rounded"
    />
  </div>
);

export default InputField;
