import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [breed, setBreed] = useState('');
  const [activityLevel, setActivityLevel] = useState('I w');
  const [kibbles, setKibbles] = useState([]);
  const [selectedKibble, setSelectedKibble] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get('https://dog-kibble-backend.onrender.com/api/kibble')
      .then(response => setKibbles(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://dog-kibble-backend.onrender.com/api/calculate', {
      age, weight, breed, activityLevel, kibbleName: selectedKibble
    }).then(response => setResult(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
        <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select value={selectedKibble} onChange={(e) => setSelectedKibble(e.target.value)}>
          {kibbles.map(kibble => (
            <option key={kibble._id} value={kibble.name}>{kibble.name}</option>
          ))}
        </select>
        <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>Calculate</button>
      </form>
      {result && (
        <ul>
          <li>Daily Calories: {result.dailyCalories}</li>
          <li>Grams: {result.grams}</li>
        </ul>
      )}
    </div>
  );
};

export default App;
