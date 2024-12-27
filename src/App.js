import React, { useState } from 'react';
import BusinessForm from './components/BusinessForm';
import Chat from './components/Chat';
import { Header, Footer } from './components/HeaderFooter';
import config from './config';

const App = () => {
  const [data, setData] = useState(null);

  const handleFormSubmit = async ({ businessName, website }) => {
    const response = await fetch(`${config.backendUrl}/api/scrape`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, website }),
    });
    const result = await response.json();
    setData(result);
  };

  return (
    <div>
      <Header />
      <main>
        {data ? <Chat initialData={data} /> : <BusinessForm onSubmit={handleFormSubmit} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;