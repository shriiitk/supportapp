import React, { useState } from 'react';
import '../styles/Form.css';

const BusinessForm = ({ onSubmit }) => {
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { businessName, website });
    onSubmit({ businessName, website });
  };

  return (
    <form onSubmit={handleSubmit} className="business-form">
      <h2>Scrape Business Website</h2>
      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BusinessForm;