import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";

const UpdateModal = ({ place, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: place.name,
    type: place.type,
    city: place.city,
    openingHours: place.openingHours,
    closingHours: place.closingHours,
    cost: place.cost,
    facilities: place.facilities,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios
        .put(`http://localhost:3000/places/${place._id}`, formData)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFacilitiesChange = (selectedOptions) => {
    const selectedFacilities = selectedOptions.map((option) => option.value);

    setFormData({
      ...formData,
      facilities: selectedFacilities,
    });
  };

  const type = [
    { value: "Smart working", label: "Smart working" },
    { value: "Studio", label: "Studio" },
    { value: "Riunioni", label: "Riunioni" },
    { value: "Conferenze", label: "Conferenze" },
    { value: "Presentazioni", label: "Presentazioni" },
  ];

  const facilities = [
    { value: "Stampante", label: "Stampante" },
    { value: "Stampante 3D", label: "Stampante 3D" },
    { value: "Computer", label: "Computer" },
    { value: "Bagno", label: "Bagno" },
    { value: "Presa di corrente", label: "Presa di corrente" },
    { value: "Ristorante", label: "Ristorante" },
    { value: "Bar", label: "Bar" },
    { value: "Spazio silenzioso", label: "Spazio silenzioso" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-4 rounded shadow-md w-3/4 lg:w-1/3 xl:w-1/4">
        <h2 className="text-lg font-semibold mb-2">Modifica Luogo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nome
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Tipo
            </label>
            <Select
              name="type"
              placeholder="Tipo di posto"
              options={type}
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  type: selectedOption.value,
                })
              }
              value={type.find((obj) => obj.value === formData.type)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Città
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Orario di apertura
            </label>
            <input
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Orario di chiusura
            </label>
            <input
              type="text"
              name="closingHours"
              value={formData.closingHours}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Costo
            </label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Facilities
            </label>
            <Select
              name="facilities"
              placeholder="Servizi"
              options={facilities}
              isMulti
              onChange={(selectedOptions) =>
                handleFacilitiesChange(selectedOptions, "facilities")
              }
              value={facilities.filter((obj) =>
                formData.facilities.includes(obj.value)
              )}
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Aggiorna
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 px-4 py-2 bg-gray-300 text-gray-600 rounded hover:bg-gray-400"
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
