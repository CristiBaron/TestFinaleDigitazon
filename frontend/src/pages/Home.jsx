import React, { useState, useEffect } from "react";
import axios from "axios";
import Place from "../components/Home/Place";
import Header from "../components/Header";
import Filters from "../components/Home/Filters";
import Footer from "../components/Footer";

function Home() {
  const [allPlaces, setAllPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    openingHours: "",
    cost: "",
    facilities: [],
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFacilitiesChange = (selectedOptions) => {
    const selectedFacilities = selectedOptions.map((option) => option.value);

    setFilters({
      ...filters,
      facilities: selectedFacilities,
    });
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      const res = await axios.get("http://localhost:3000/places");
      setAllPlaces(res.data.places);
      setPlaces(res.data.places);
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    let filteredPlaces = allPlaces;

    if (filters.city) {
      filteredPlaces = filteredPlaces.filter((place) =>
        place.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.type) {
      filteredPlaces = filteredPlaces.filter((place) =>
        place.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.facilities.length > 0) {
      filteredPlaces = filteredPlaces.filter((place) => {
        return filters.facilities.every((facility) =>
          place.facilities.includes(facility)
        );
      });
    }

    if (filters.cost) {
      filteredPlaces = filteredPlaces.filter(
        (place) =>
          (filters.cost === "free" && place.cost === 0) ||
          (filters.cost === "paid" && place.cost > 0)
      );
    }

    setPlaces(filteredPlaces);
  }, [filters]);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 p-4 md:p-0">
        <Filters
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleFacilitiesChange={handleFacilitiesChange}
          setFilters={setFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {places.map((place) => (
            <Place key={place._id} place={place} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
