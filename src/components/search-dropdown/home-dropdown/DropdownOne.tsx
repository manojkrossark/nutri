"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import NiceSelect from "@/ui/NiceSelect";
import Link from "next/link";
import Image from "next/image";
import { BASE_API_URL } from "@/utils/constants";
type MealType = {
  mealPlan: {
    location: string;
    weather: string;
    healthGoals: string;
    diet: string;
    description: string;
    days: {
      day: string;
      meals: {
        meal: string;
        items: {
          name: string;
          imageUrl: string;
        }[];
        notes?: string;
      }[];
    }[];
  };
};

const moodOptions = [
  { value: "happy", text: "Happy" },
  { value: "sad", text: "Sad" },
  { value: "tired", text: "Tired" },
  { value: "stressed", text: "Stressed" },
  { value: "energetic", text: "Energetic" },
];

const goalOptions = [
  { value: "weight_loss", text: "Weight Loss" },
  { value: "muscle_gain", text: "Muscle Gain" },
  { value: "diabetes_control", text: "Diabetes Control" },
  { value: "general_health", text: "General Health" },
];

const dietOptions = [
  { value: "vegetarian", text: "Vegetarian" },
  { value: "vegan", text: "Vegan" },
  { value: "gluten_free", text: "Gluten-Free" },
  { value: "dairy_free", text: "Dairy-Free" },
  { value: "no_restrictions", text: "No Restrictions" },
  { value: "keto", text: "Keto Diet" },
  { value: "low_carb", text: "Low Carbs" },
  { value: "balanced", text: "Balanced" },
];

const languageOptions = [
  { value: "english", text: "English" },
  { value: "tamil", text: "Tamil" },
  { value: "telugu", text: "Telugu" },
  { value: "malayalam", text: "Malayalam" },
  { value: "kanadam", text: "Kanadam" },
];

const DropdownOne = ({ style }: any) => {
  const [mood, setMood] = useState(moodOptions[0].text);
  const [healthGoals, setHealthGoals] = useState(goalOptions[0].text);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    dietOptions[0].text
  );
  const [language, setLanguage] = useState(languageOptions[0].text);
  const [budget, setBudget] = useState("1000");
  const [location, setLocation] = useState("Current Location");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [notes, setNotes] = useState("");
  const [meal, setMeal] = useState<MealType | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [showPermissionOverlay, setShowPermissionOverlay] = useState(false);

  // Handle selection change for the dropdowns
  const handleChange = (setter: Function) => (item: any) => {
    setter(item.target.value);
  };

  // Update location using Geolocation API
  const updateLocation = async (position: GeolocationPosition) => {
    const lat = position.coords.latitude.toString();
    const lng = position.coords.longitude.toString();
    setLatitude(lat);
    setLongitude(lng);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();

      // Extract city name from the address
      const city =
        data.address.city || data.address.town || data.address.village;
      setLocation(city || "Current Location");
    } catch (e) {
      console.error("Reverse geocode error:", e);
      setLocation("Current Location");
    }
  };

  // Get current geolocation
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      updateLocation,
      () => setLocation("Unable to retrieve location"),
      { enableHighAccuracy: true }
    );
  };

  // Handle location permission
  const handleAllowLocation = () => {
    navigator.geolocation.getCurrentPosition(updateLocation, () =>
      setLocation("Location Access Denied")
    );
    setShowPermissionOverlay(false);
  };

  // UseEffect to check for location permissions
  useEffect(() => {
    if (!navigator.geolocation || !navigator.permissions) {
      setLocation("Geolocation Not Supported");
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((perm) => {
        if (perm.state === "granted") {
          getLocation();
        } else if (perm.state === "prompt") {
          setShowPermissionOverlay(true);
        } else {
          setShowPermissionOverlay(true);
          setLocation("Location Permission Denied");
        }
      })
      .catch((e) => {
        console.error("Permission check failed:", e);
        setShowPermissionOverlay(true);
      });
  }, []);

  const getMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_API_URL}/meal/get-meal`, {
        mood,
        location,
        health_goals: healthGoals,
        dietary_restrictions: dietaryRestrictions,
        latitude,
        longitude,
        language,
        budget,
        notes,
      });

      if (response.data.meal) {
        try {
          // If meal is already an object, no need to parse
          const parsedMeal =
            typeof response.data.meal === "string"
              ? JSON.parse(response.data.meal)
              : response.data.meal;

          setMeal(parsedMeal);
          setError("");
        } catch (parseErr) {
          console.error("Failed to parse meal JSON:", parseErr);
          setError("Failed to parse meal plan response.");
          setMeal(null);
        }
      } else {
        setError("No meal plan received.");
        setMeal(null);
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Error fetching meal suggestion");
      setMeal(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (meal && meal?.mealPlan?.days?.length > 0) {
      setSelectedDay(meal?.mealPlan?.days[0].day);
    }
  }, [meal]);
  // Handle day selection
  const handleDayClick = (day: string) => {
    setSelectedDay((prev) => (prev === day ? "" : day));
  };

  return (
    <>
      <style jsx>{`
        .location-icon-button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 24px;
          color: #007bff; /* You can change the color */
        }
        .meal-card {
          max-width: 400px;
          margin: 40px auto;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          background-color: #fff;
          border: 1px solid #eee;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .meal-card-header {
          background-color: #198754;
          color: #fff;
          padding: 16px;
          text-align: center;
        }

        .meal-tag {
          background-color: #fff;
          color: #198754;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 12px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 6px;
        }

        .meal-card-body {
          padding: 16px;
        }

        .meal-block {
          margin-bottom: 12px;
        }

        .meal-title {
          width: 40%;
          line-height: 27px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.12px;
          color: #fff;
          text-align: center;
          background: #0c0c0c;
          border-radius: 25px;
        }

        .meal-items {
          padding-left: 18px;
          margin-bottom: 6px;
        }

        .meal-items li {
          font-size: 14px;
          color: #333;
          margin-bottom: 2px;
        }

        .meal-note {
          font-size: 13px;
          color: #6c757d;
        }

        .meal-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-top: 1px solid #eee;
        }

        .btn-view {
          background-color: transparent;
          color: #0c0c0c;
          padding: 6px 16px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid #0c0c0c;
          border-radius: 50px;
        }

        .btn-view:hover {
          background-color: #0c0c0c;
          color: white;
        }

        .btn-circle {
          background-color: #0c0c0c;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }

        .btn-circle i {
          font-size: 16px;
        }
        .day-selector-wrapper .day-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px 12px;
          font-size: 14px;
          min-width: 80px;
          position: relative;
          border-radius: 8px;
        }

        .day-btn .day-label {
          font-weight: 600;
        }

        .day-btn .day-count {
          font-size: 12px;
          color: #6c757d;
          margin-top: 4px;
        }
        .weekday-strip {
          display: flex;
          overflow-x: auto;
          gap: 16px;
          padding: 16px 12px;
          margin-top: 24px;
          margin-bottom: 32px;
          background-color: #f8f9fa; /* Light gray */
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); /* Soft shadow */
        }

        .weekday-strip > div {
          min-width: 50px;
          text-align: center;
          cursor: pointer;
        }

        .day-label {
          font-weight: 500;
          font-size: 13px;
          color: #495057;
        }

        .day-number {
          font-size: 15px;
          font-weight: 600;
          color: #212529;
        }

        .active-day {
          background: #ffffff;
          border-radius: 12px;
          padding: 6px 10px;
          color: #000;
          box-shadow: inset 0 0 0 2px #ff6725;
        }

        .section-divider {
          margin-top: 32px;
          margin-bottom: 24px;
        }
        .meal-title-main {
          font-size: 18px;
          font-weight: 600;
          color: #212529;
        }

        .meal-subtext {
          font-size: 14px;
          color: #6c757d;
        }

        .meal-icon-info .info-block {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #495057;
        }

        .meal-icon-info .info-block i {
          color: silver;
          font-size: 16px;
        }

        .meal-description {
          font-size: 14px;
          color: #444;
          margin-top: 8px;
        }
      `}</style>

      {showPermissionOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            flexDirection: "column",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h4>This app needs your location</h4>
          <p>We use your current location to suggest personalized meals.</p>
          <button className="btn btn-light mt-3" onClick={handleAllowLocation}>
            Allow Location
          </button>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getMeal(e);
        }}
      >
        <div className="row gx-0 align-items-center">
          <div className="col-xl-3 col-lg-4">
            <div className="input-box-one border-left">
              <div className="label">Mindset</div>
              <NiceSelect
                className={`nice-select ${style ? "fw-normal" : ""}`}
                options={moodOptions}
                defaultCurrent={0}
                onChange={handleChange(setMood)}
                placeholder="Select Mood"
                name={""}
              />
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="input-box-one border-left">
              <div className="label">Health Goals</div>
              <NiceSelect
                className={`nice-select ${style ? "fw-normal" : ""}`}
                options={goalOptions}
                defaultCurrent={0}
                onChange={handleChange(setHealthGoals)}
                placeholder="Select Goal"
                name={""}
              />
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="input-box-one border-left">
              <div className="label">Dietary Restrictions</div>
              <NiceSelect
                className={`nice-select ${style ? "fw-normal" : ""}`}
                options={dietOptions}
                defaultCurrent={0}
                onChange={handleChange(setDietaryRestrictions)}
                placeholder="Select Diet"
                name={""}
              />
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="input-box-one border-left">
              <div className="label">Language</div>
              <NiceSelect
                className={`nice-select ${style ? "fw-normal" : ""}`}
                options={languageOptions}
                defaultCurrent={0}
                onChange={handleChange(setLanguage)}
                placeholder="Select Diet"
                name={""}
              />
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="input-box-one border-left">
              <div className="label">Budget (₹)</div>
              <input
                type="number"
                value={budget}
                onChange={handleChange(setBudget)}
                placeholder="Enter Budget"
                className="form-control"
              />
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="input-box-one border-left">
              <div className="label">Location</div>
              <div
                className="location-display"
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span>{location}</span>
                <button
                  type="button"
                  onClick={handleAllowLocation}
                  className="location-icon-button"
                >
                  <i className="fas fa-location-arrow"></i>{" "}
                  {/* Font Awesome Location Icon */}
                </button>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="input-box-one border-left">
              <div className="label">Notes</div>
              <input
                type="text"
                value={notes}
                onChange={handleChange(setNotes)}
                placeholder="Enter Notes"
                className="form-control"
              />
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="input-box-one border-left">
              <button
                className={`fw-500 tran3s ${
                  style
                    ? "w-100 tran3s search-btn-three"
                    : "text-uppercase search-btn"
                }`}
              >
                {loading ? "Loading..." : "Search"}
              </button>
            </div>
          </div>
        </div>

        {error && <div className="error">{error}</div>}
        {meal && meal.mealPlan && (
          <div className="mt-10">
            <div className="meal-card mt-10">
              <div className="meal-card-body">
                <h5 className="meal-title-main mb-1">🍽 Suggested Meal Plan</h5>

                <div className="meal-icon-info d-flex align-items-center gap-4 flex-wrap mt-10 mb-3">
                  <div className="info-block">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span className="fs-22" style={{ fontWeight: "500" }}>
                      {meal.mealPlan.location}
                    </span>
                  </div>
                  <div className="info-block">
                    <i className="bi bi-cloud-sun"></i>
                    <span>{meal.mealPlan.weather}</span>
                  </div>
                  <div className="info-block">
                    <i className="bi bi-bullseye"></i>
                    <span>{meal.mealPlan.healthGoals}</span>
                  </div>
                  <div className="info-block">
                    <i className="bi bi-heart-pulse"></i>
                    <span>{meal.mealPlan.diet}</span>
                  </div>
                </div>

                <hr className="my-3" />

                <p className="meal-description">{meal.mealPlan.description}</p>
              </div>
            </div>
            {/* Day Selector */}
            <div className="section-divider">
              <div className="d-flex gap-3 justify-content-between mb-4 weekday-strip">
                {meal.mealPlan.days.map((dayObj, idx) => {
                  const date = new Date();
                  date.setDate(date.getDate() + idx);
                  const dayShort = date.toLocaleDateString("en-US", {
                    weekday: "short",
                  }); // e.g. "Mon"
                  const dayNum = date.getDate(); // e.g. 2

                  const isSelected = selectedDay === dayObj.day;

                  return (
                    <div
                      key={idx}
                      className={`text-center cursor-pointer ${
                        isSelected ? "active-day" : ""
                      }`}
                      onClick={() => handleDayClick(dayObj.day)}
                    >
                      <div className="day-label">{dayShort}</div>
                      <div className="day-number">{dayNum}</div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Day Meal Card */}
              {meal.mealPlan.days.map(
                (dayObj, dayIndex) =>
                  selectedDay === dayObj.day && (
                    <div key={dayIndex} className="meal-card">
                      <div className="meal-card-body">
                        {dayObj.meals.map((mealObj, mealIndex) => (
                          <div key={mealIndex} className="meal-block">
                            <h6 className="meal-title">{mealObj.meal}</h6>
                            <ul className="list-style-one fs-16 color-dark style-none">
                              {mealObj?.items?.map((item, i) => (
                                <li key={i}>
                                  {item.name}
                                  {item.imageUrl && (
                                    <div style={{ marginTop: "5px" }}>
                                      <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        width={100}
                                        height={75}
                                        style={{
                                          objectFit: "cover",
                                          borderRadius: "50%",
                                          boxShadow: "0 4px 12px #6c757d",
                                          width: "100px",
                                          height: "100px",
                                        }}
                                      />
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>

                            {mealObj.notes && (
                              <p className="meal-note">
                                <strong>Note:</strong> {mealObj.notes}
                              </p>
                            )}
                            <div className="meal-card-footer">
                              <a href="#" className="btn-view">
                                View Ingredients
                              </a>
                              <a href="#" className="btn-circle">
                                <i className="bi bi-arrow-up-right"></i>
                              </a>
                            </div>
                            {mealIndex < dayObj.meals.length - 1 && <hr />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default DropdownOne;
