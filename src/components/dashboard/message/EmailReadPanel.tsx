"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Image from "next/image"; // ✅ Fix: Importing next/image
import { BASE_API_URL } from "@/utils/constants"; // ✅ Ensure this is defined properly

const DeliveryScheduler = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [recommendedSlots, setRecommendedSlots] = useState([]);
  const [userLocation, setUserLocation] = useState("default location");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchAvailableSlots();
  }, [userLocation]);

  const fetchAvailableSlots = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(`${BASE_API_URL}api/available-slots`, {
        params: { location: userLocation },
      });
      setTimeSlots(response.data.available_slots || []);
      setRecommendedSlots(response.data.recommended_slots || []);
    } catch (err) {
      setError("Error fetching available slots. Please try again later.");
      console.error("Error fetching available slots:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReserveSlot = async (slotId: string | number) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(`${BASE_API_URL}api/reserve-slot`, {
        slot_id: slotId,
      });
      alert(response.data.message);
      fetchAvailableSlots();
    } catch (err) {
      setError("Error reserving the slot. Please try again later.");
      console.error("Error reserving slot:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpandClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const slotsToShow = isExpanded ? timeSlots : timeSlots.slice(0, 6);

  return (
    <div style={{ paddingLeft: "20px" }}>
      {/* Header Section with Image and Card */}
      <div className="flexCenter max-container relative w-full">

        <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%] lg:top-20">
          <Image
            src="/meter.svg"
            alt="meter"
            width={16}
            height={158}
            className="h-full w-auto"
          />
          <div className="flexBetween flex-col">
            <div className="flex w-full flex-col">
              <div className="flexBetween w-full">
                <p className="regular-16 text-gray-20">Destination</p>
                <p className="bold-16 text-green-50">48 min</p>
              </div>
              <p className="bold-20 mt-2">Dharamkot, McLeodganj</p>
            </div>

            <div className="flex w-full flex-col">
              <p className="regular-16 text-gray-20">Start Track</p>
              <h4 className="bold-20 mt-2 whitespace-nowrap">Triund</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      {isLoading ? (
        <p>Loading available slots...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="email-read-panel mt-4">
          {slotsToShow?.map((slot, index) => (
            <div
              key={slot[0] || index}
              className="email-list-item d-flex justify-between items-center p-3 border-b"
            >
              <div className="email-short-preview">
                <div className="font-semibold text-sm">Slot {index + 1}</div>
                <div className="text-gray-600 text-xs">
                  {slot[1]} {slot[2]}
                </div>
              </div>
              <Button
                variant="contained"
                onClick={() => handleReserveSlot(slot[0])}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#333" },
                }}
              >
                Reserve
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Expand/Collapse */}
      {timeSlots.length > 6 && (
        <div className="text-center mt-4">
          <IconButton onClick={handleExpandClick}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </div>
      )}

      {/* Recommended Time Slots */}
      <div className="mt-6">
        <h5 className="text-lg font-semibold mb-2">Recommended Time Slots</h5>
        {recommendedSlots?.length > 0 ? (
          <Typography>{recommendedSlots.join(", ")}</Typography>
        ) : (
          <Typography>No recommended slots available</Typography>
        )}
      </div>
    </div>
  );
};

export default DeliveryScheduler;
