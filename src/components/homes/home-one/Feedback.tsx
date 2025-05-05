"use client"
import React, { useState } from 'react';
import axios from 'axios';
import PropertyOne from '../home-three/PropertyOne';

const Feedback = () => {
  const [mood, setMood] = useState('');
  const [location, setLocation] = useState('');
  const [healthGoals, setHealthGoals] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [meal, setMeal] = useState('');
  const [error, setError] = useState('');

  const getMeal = async () => {
    try {
      const response = await axios.post('https://nutribk.onrender.com/get-meal', {
        mood,
        location,
        health_goals: healthGoals,
        dietary_restrictions: dietaryRestrictions,
        latitude,
        longitude,
      });

      if (response.data.meal) {
        setMeal(response.data.meal);
      } else {
        setError('Error fetching meal suggestion');
      }
    } catch (err) {
      setError('Error communicating with the backend');
    }
  };

  return (
    <div className="App">
      <h1>Meal Suggestion Based on Mood and Weather</h1>
      <div>
        <input
          type="text"
          placeholder="Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Health Goals"
          value={healthGoals}
          onChange={(e) => setHealthGoals(e.target.value)}
        />
        <input
          type="text"
          placeholder="Dietary Restrictions"
          value={dietaryRestrictions}
          onChange={(e) => setDietaryRestrictions(e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={getMeal}>Get Meal Suggestion</button>
      </div>
     
      {meal && <p><strong>Suggested Meal:</strong> {meal}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <PropertyOne/>
    </div>
  );
};

export default Feedback;
