import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Header from "../components/Header";

function AddPlace() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "",
    openingHours: "",
    closingHours: "",
    cost: "",
    facilities: [], // Per la selezione multipla
    images: [], // Per il caricamento di immagini
  });

  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Gestisci il tipo di campo

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files,
      });
    } else {
      // Gestisci gli altri campi di input
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFacilitiesChange = (selectedOptions) => {
    const selectedFacilities = selectedOptions.map((option) => option.value);

    setFormData({
      ...formData,
      facilities: selectedFacilities,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("openingHours", formData.openingHours);
    formDataToSend.append("closingHours", formData.closingHours);
    formDataToSend.append("cost", formData.cost);
    formData.facilities.forEach((facility) =>
      formDataToSend.append("facilities", facility)
    );
    for (let i = 0; i < formData.images.length; i++) {
      formDataToSend.append("images", formData.images[i]);
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/places",
        formDataToSend
      );
      navigate("/");
    } catch (error) {
      console.error("Errore durante la creazione del posto", error);
    }
  };

  const type = [
    { value: "Smart working", label: "Smart working" },
    { value: "Studio", label: "Studio" },
    { value: "Riunioni", label: "Riunioni" },
    { value: "Conferenze", label: "Conferenze" },
    { value: "Presentazioni", label: "Presentazioni" },
  ];

  const facilities = [
    { value: "Stampante", label: "Stampante img" },
    { value: "Stampante 3D", label: "Stampante 3D" },
    { value: "Computer", label: "Computer" },
    { value: "Bagno", label: "Bagno" },
    { value: "Presa di corrente", label: "Presa di corrente" },
    { value: "Ristorante", label: "Ristorante" },
    { value: "Bar", label: "Bar" },
    { value: "Spazio silenzioso", label: "Spazio silenzioso" },
  ];

  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 p-3 md:p-0">
        <h1 className="text-3xl font-semibold mb-4">Crea un nuovo posto</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          encType="multipart/form-data"
        >
          <div className="form-input_container">
            <label className="form-input_label" htmlFor="name">
              Nome del posto
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-input_container">
            <label className="form-input_label" htmlFor="type">
              Tipo di posto
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
            />
          </div>
          <div className="form-input_container">
            <label className="form-input_label" htmlFor="city">
              Città
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-input_container">
            <label className="form-input_label" htmlFor="facilities">
              Servizi
            </label>

            <Select
              name="facilities"
              placeholder="Servizi"
              options={facilities}
              isMulti
              onChange={(selectedOptions) =>
                handleFacilitiesChange(selectedOptions, "facilities")
              }
            />
          </div>
          <div className="form-input_container">
            <label className="form-input_label" htmlFor="openingHours">
              Orario di apertura
            </label>
            <input
              type="time"
              id="openingHours"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-input_container">
            <label className="form-input_label" htmlFor="openingHours">
              Orario di chiusura
            </label>
            <input
              type="time"
              id="closingHours"
              name="closingHours"
              value={formData.closingHours}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-input_container">
            <label className="form-input_label" htmlFor="cost">
              Costo
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-input_container">
            <label className="form-input_label" htmlFor="images">
              Immagini (caricamento multiplo)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              onChange={handleChange}
              multiple
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Crea Posto
          </button>
        </form>
      </div>
    </>
  );
}

export default AddPlace;
