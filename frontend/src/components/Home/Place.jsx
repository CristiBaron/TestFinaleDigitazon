import React from "react";
import { Link } from "react-router-dom";

const Place = ({ place }) => {
  return (
    <Link
      to={`/${place._id}`}
      key={location.id}
      className="bg-white p-4 rounded shadow-md cursor-pointer hover:bg-slate-100 flex"
    >
      <div className="w-1/2">
        <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
        <p className="text-gray-800">{place.city}</p>
        <p className="text-gray-600">{place.type}</p>
        <p className="text-gray-600">
          Orari: {place.openingHours} - {place.closingHours}
        </p>
        <p className="text-gray-600">Costo: ${place.cost}</p>
        <p className="text-gray-600">
          Punteggio: {Math.floor(place.averageRating)}
        </p>
      </div>
      <div className="w-1/2">
        {place.images.length > 0 && (
          <img
            src={"http://localhost:3000/images/" + place.images[0]}
            alt={`Immagine ${place.name}`}
            className="rounded-md w-full h-full object-cover"
          />
        )}
      </div>
    </Link>
  );
};

export default Place;
