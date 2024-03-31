import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';
import './App.css';

const App = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [showPhoneList, setShowPhoneList] = useState(true);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get("http://localhost:5005/phones");
        setPhones(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching phones:', error);
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  const handlePhoneSelect = (phone) => {
    setSelectedPhone(phone);
    setShowPhoneList(false);
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleGoBack = () => {
    setShowPhoneList(true);
    setSelectedPhone(null);
  };

  return (
    <div>
      {showPhoneList && <h1>Phone Catalog</h1>}
      {showPhoneList ? (
        <div className="phone-list">
          {loading ? (
            <Spinner />
          ) : (
            phones.map((phone) => (
              <div key={phone.id} className="phone-item" onClick={() => handlePhoneSelect(phone)}>
                <img src={`public/assets/images/${phone.imageFileName}`} alt={phone.name} className="phone-image" />
                <div>
                  <p>{phone.name}</p>
                  <button onClick={() => handlePhoneSelect(phone)}>Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          <h2>Phone Details</h2>
          <div className="phone-details">
            <div className="phone-description">
              <h3>{selectedPhone.name}</h3>
              <p>Manufacturer: {selectedPhone.manufacturer}</p>
              <p>Description: {selectedPhone.description}</p>
              <p>Color: {selectedPhone.color}</p>
              <p>Price: {selectedPhone.price}</p>
              <p>Screen: {selectedPhone.screen}</p>
              <p>Processor: {selectedPhone.processor}</p>
              <p>RAM: {selectedPhone.ram}</p>
            </div>
            <div className="phone-image-container">
              <img src={`public/assets/images/${selectedPhone.imageFileName}`} alt="" className="selected-phone-image" />
            </div>
          </div>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default App;
