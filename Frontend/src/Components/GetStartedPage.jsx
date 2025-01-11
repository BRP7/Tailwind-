import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


// Time Slot Mappings for USA and Europe
const timeSlotMapping = {
  "USA EST": [
    { indiaTime: "10:00 PM", localTime: "12:30 PM " },
    { indiaTime: "11:00 PM", localTime: "1:30 PM " },
    { indiaTime: "12:00 AM", localTime: "2:30 PM " },
    { indiaTime: "1:00 AM", localTime: "3:30 PM " },
    { indiaTime: "2:00 AM", localTime: "4:30 PM " },
    { indiaTime: "3:00 AM", localTime: "5:30 PM " },
    { indiaTime: "4:00 AM", localTime: "6:30 PM " },
    { indiaTime: "5:00 AM", localTime: "7:30 PM " },
    { indiaTime: "6:00 AM", localTime: "8:30 PM " },
    { indiaTime: "7:00 AM", localTime: "9:30 PM " },
    { indiaTime: "8:00 AM", localTime: "10:30 PM " },
  ],
  "Europe CET": [
    { indiaTime: "10:00 PM", localTime: "5:30 PM " },
    { indiaTime: "11:00 PM", localTime: "6:30 PM " },
    { indiaTime: "12:00 AM", localTime: "7:30 PM " },
    { indiaTime: "1:00 AM", localTime: "8:30 PM " },
    { indiaTime: "2:00 AM", localTime: "9:30 PM " },
    { indiaTime: "3:00 AM", localTime: "10:30 PM " },
    { indiaTime: "4:00 AM", localTime: "11:30 PM " },
    { indiaTime: "5:00 AM", localTime: "12:30 AM" },
    { indiaTime: "6:00 AM", localTime: "1:30 AM" },
    { indiaTime: "7:00 AM", localTime: "2:30 AM" },
    { indiaTime: "8:00 AM", localTime: "3:30 AM" },
  ],
};

// List of countries for "Other Countries" location
const countriesList = [
  "India",
  "Australia",
  "Germany",
  "Brazil",
  "South Africa",
  "Japan",
  "Canada",
  "United Kingdom",
  "Mexico",
  "Russia",
  "China",
];

const GetStartedPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [manualTime, setManualTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [amPm, setAmPm] = useState("AM");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryInput, setCountryInput] = useState(""); // State for country input
  const [filteredCountries, setFilteredCountries] = useState(countriesList); // State for filtered countries
  const [responseMessage, setResponseMessage] = useState(""); // Add state for response message

  const navigate = useNavigate();

  // Handle location change and set available time slots
  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
    setManualTime(""); // Reset manual time input
    setSelectedTime(""); // Reset selected time slot
    setSelectedCountry(""); // Reset selected country
    setCountryInput(""); // Reset country input
    setFilteredCountries(countriesList); // Reset country suggestions

    if (selectedLocation === "USA EST" || selectedLocation === "Europe CET") {
      setAvailableTimes(timeSlotMapping[selectedLocation] || []);
    } else {
      setAvailableTimes([]);
    }
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handle AM/PM selection
  const handleAmPmChange = (e) => {
    setAmPm(e.target.value);
  };

  // Handle manual time input
  const handleManualTimeChange = (e) => {
    const timeInput = e.target.value;
    if (/^\d+$/.test(timeInput)) {
      const numericValue = parseInt(timeInput, 10);
      if (numericValue >= 0 && numericValue <= 12) {
        setManualTime(timeInput);
        // Set selectedTime when user manually inputs time
        setSelectedTime(`${timeInput} ${amPm}`);
      }
    }
  };
  

  // Handle country input change (for search/filter)
  const handleCountryInputChange = (e) => {
    const input = e.target.value;
    setCountryInput(input);
    const filtered = countriesList.filter((country) =>
      country.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCountries(filtered); // Update the suggestions list
  };

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryInput(country); // Update input with the selected country
    setFilteredCountries([]); // Hide suggestions after selection
  };

  // Submit the form
  const handleSubmit = async (e) => {
    console.log("name:", name);
    console.log("email:", email);
    console.log("phone:", phone);
    console.log("selectedDate:", selectedDate);
    console.log("location:", location);
    console.log("manualTime:", manualTime);
    console.log("selectedTime:", selectedTime);
    console.log("selectedCountry:", selectedCountry);
    console.log("countryInput:", countryInput);
    e.preventDefault(); // Prevent default form submission
    if (
      !name ||
      !email ||
      !phone ||
      !selectedDate ||
      (!location && !manualTime) ||
      (location && !selectedTime) ||
      (location === "Other Countries" && !( (selectedCountry || countryInput)))
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = {
      name,
      email,
      phone,
      selectedDate,
      location,
      selectedTime: location ? selectedTime : `${manualTime} ${amPm}`,
      country: location === "Other Countries" ? (selectedCountry || countryInput) : "",
      additionalInfo,
    };

    console.log(formData);

    try {
      const response = await axios.post("http://localhost:5000/send-bookcall", formData); // Replace URL with your backend API
      console.log(response)
      if (response.status === 200) {
        setResponseMessage("Your message was sent successfully!");
        alert("Your message was sent successfully!");
        console.log("Form Submitted: ", formData);

        // setFormData({
        //   name: "",
        //   email: "",
        //   message: "",
        // });
        navigate("/");

      }
    } catch (error) {
      setResponseMessage("Failed to send your message. Please try again.");
    }
    setTimeout(() => {
      setResponseMessage("");
    }, 3000);

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full p-10 rounded-xl shadow-2xl bg-white relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-5 right-5 text-2xl font-bold text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h1 className="text-4xl font-extrabold text-center text-[#787C97] mb-4">
          Get Started
        </h1>
        <p className="text-lg leading-relaxed text-center mb-8 text-[#9ca3af]">
          Please provide your details to get started with us.
        </p>

        {error && (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Date Picker */}
        <div className="flex justify-center mb-4">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            className="p-4 border rounded-lg"
            placeholderText="Select a date"
            minDate={new Date()}
          />
        </div>

        {/* Name, Email, Phone */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full p-4 border rounded-lg mb-4"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-4 border rounded-lg mb-4"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          className="w-full p-4 border rounded-lg mb-4"
        />

        {/* Location Dropdown */}
        <select
          value={location}
          onChange={handleLocationChange}
          className="w-full p-4 border rounded-lg mb-4"
        >
          <option value="">Select your location</option>
          <option value="USA EST">USA (EST)</option>
          <option value="Europe CET">Europe (CET)</option>
          <option value="Other Countries">Other Countries</option>
        </select>

        {/* Time Slot Dropdown for USA EST and Europe CET */}
        {location && (location === "USA EST" || location === "Europe CET") && (
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full p-4 border rounded-lg mb-4"
          >
            <option value="">Select your time slot</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time.localTime}>
                {time.localTime}
              </option>
            ))}
          </select>
        )}

           {/* Manual Time Input for Other Countries */}
           {location === "Other Countries" && (
          <>
            <div className="flex space-x-2 mb-4">
              <select
                value={manualTime}
                onChange={(e) => {
                  const time = e.target.value;
                  setManualTime(time); // Set the manual time
                  setSelectedTime(`${time} ${amPm}`); // Update selected time with AM/PM
                }}
                className="w-full p-4 border rounded-lg"
              >
                <option value="">Select your time</option>
                {[...Array(12).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <div className="flex items-center">
                <label>
                  <input
                    type="radio"
                    value="AM"
                    checked={amPm === "AM"}
                    onChange={handleAmPmChange}
                  />
                  AM
                </label>
                <label className="ml-4">
                  <input
                    type="radio"
                    value="PM"
                    checked={amPm === "PM"}
                    onChange={handleAmPmChange}
                  />
                  PM
                </label>
              </div>
            </div>

            {/* Country Search Input */}
            <input
              type="text"
              value={countryInput}
              onChange={handleCountryInputChange}
              placeholder="Type your country name"
              className="w-full p-4 border rounded-lg mb-4"
            />
            {filteredCountries.length > 0 && countryInput && (
              <ul className="absolute bg-white border rounded-lg w-full max-h-60 overflow-y-auto">
                {filteredCountries.map((country, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Additional Information */}
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Additional information or requests..."
          className="w-full p-4 border rounded-lg mb-4"
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-[#D5A0EF] rounded-full shadow-lg hover:bg-[#e1b6f7] transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default GetStartedPage;
