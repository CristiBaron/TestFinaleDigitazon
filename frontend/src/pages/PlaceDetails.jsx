import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import Header from "../components/Header";
import RatingInput from "../components/PlaceDetails/RatingInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import UpdateModal from "../components/PlaceDetails/UpdateModal";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { useNavigate } from "react-router-dom";

function PlaceDetails() {
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Effettua una chiamata API per ottenere i dettagli del posto in base all'ID
    const fetchPlace = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/places/${id}`);
        setPlace(res.data.place);
      } catch (error) {
        console.error(
          "Errore durante il recupero dei dettagli del posto",
          error
        );
      }
    };

    fetchPlace();
  }, [id]);

  const hanldeUserAlreadyRated = () => {
    // Controlla se l'utente ha già valutato il posto
    return place.ratings.some((rating) => rating.user === authUser().userID);
  };
  const handleRatingChange = (newRating) => {
    // Gestisci la valutazione dell'utente e inviala al backend

    setUserRating(newRating);
    axios
      .put(`http://localhost:3000/places/${id}/rate`, {
        rating: newRating,
      })
      .then((res) => {
        console.log("Valutazione inviata con successo");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Errore nell'invio della valutazione", error);
      });
  };

  const handleDelete = () => {
    // Gestisci l'eliminazione del posto
    try {
      axios
        .delete(`http://localhost:3000/places/${id}`)
        .then((res) => {
          console.log("Posto eliminato con successo");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (!place) {
    return <div className="text-center">Caricamento in corso...</div>;
  }

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "400px",
  };

  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 p-3 md:p-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold">{place.name}</h1>
          {authUser()?.userID === place.owner && (
            <div className="flex gap-4">
              <FontAwesomeIcon
                icon={faPencil}
                className="cursor-pointer hover:text-blue-500"
                onClick={() => setIsModalOpen(true)}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer hover:text-blue-500"
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
        <Slide>
          {place.images.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  backgroundImage: `url(http://localhost:3000/images/${slideImage})`,
                }}
              ></div>
            </div>
          ))}
        </Slide>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded shadow-md flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-2">Dettagli del posto</h2>
            <p className="text-gray-600">Tipo: {place.type}</p>
            <p className="text-gray-800">Città: {place.city}</p>
            <p className="text-gray-600">
              Orari: {place.openingHours} - {place.closingHours}
            </p>
            <p className="text-gray-600">Costo: ${place.cost}</p>
            <p className="text-gray-600">
              Punteggio: {Math.floor(place.averageRating)}
            </p>
            {authUser() && !hanldeUserAlreadyRated() && (
              <div className="mt-4">
                <RatingInput onRatingChange={handleRatingChange} />
              </div>
            )}
          </div>
          <div className="bg-white p-4 rounded shadow-md flex flex-col items-center justify-center">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Servizi</h3>
              <ul className="list-disc ml-4">
                {place.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <UpdateModal
          place={place}
          onUpdate={() => {
            window.location.reload();
            setIsModalOpen(false);
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default PlaceDetails;
