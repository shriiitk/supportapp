import React, { useState } from 'react';
import '../styles/Form.css';

const BusinessForm = ({ onSubmit }) => {
  const [businessName, setBusinessName] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { businessName, website });
    onSubmit({ businessName, website });
  };

  return (
    <form className="business-form" onSubmit={handleSubmit}>
      <h2>Scrape Business Website</h2>
      <p>Enter the business name and its website URL to scrape useful data.</p>
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