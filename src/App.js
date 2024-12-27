import React, { useState } from 'react';
import BusinessForm from './components/BusinessForm';
import Chat from './components/Chat';
import { Header, Footer } from './components/HeaderFooter';
import config from './config';
import './styles/App.css';

const App = () => {
  const [data, setData] = useState(null);

  const handleFormSubmit = async ({ businessName, website }) => {
    console.log('Form submission started:', { businessName, website });
    try {
      const response = await fetch(`${config.backendUrl}/scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessName, website }),
      });

      if (!response.ok) {
        console.error('Error in scrape API response:', response.status);
        throw new Error('Scrape API error');
      }

      const result = await response.json();
      console.log('Scrape result:', result);
      setData(result);
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main>
        {data ? <Chat initialData={data} /> : <BusinessForm onSubmit={handleFormSubmit} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;