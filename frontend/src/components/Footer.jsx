import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignOut, useAuthUser } from "react-auth-kit";

function Footer() {
  return (
    <>
      <footer className="p-5 pt-10 text-center flex flex-col items-center gap-5 bg-[url('/public/nuvole1.jpg')] ">
        <p className="text-3xl">Unisciti alla comunità flexOffices</p>
        <div className="w-full flex-col justify-between gap-8 sm:flex sm:flex-row">
          <div className="flex flex-col items-center">
            <img className="h-16 cursor-pointer" src="/public/map.png" alt="" />
            <p className="font-semibold">
              Trova il posto ideale tra i 15.179 bar elencati
            </p>
            Grazie alla geolocalizzazione a portata di mano, individua
            facilmente i bar nelle vicinanze e trova ottimi posti vicino a te.
          </div>
          <div className="flex flex-col items-center">
            <img
              className="h-14 cursor-pointer"
              src="/public/happy-hour.png"
              alt=""
            />
            <p className="font-semibold">
              Approfitta degli Happy Hours indicati in tempo reale
            </p>
            Ogni centesimo conta! Consumazioni al miglior prezzo quando vuoi
            grazie ad Happy Hours e al motore di ricerca integrato.
          </div>
          <div className="flex flex-col items-center ">
            <img className="h-14 cursor-pointer" src="/public/jar.png" alt="" />
            <p className="font-semibold">
              Approfitta degli sconti iscrivendoti a flexOffices Map
            </p>{" "}
            Happy hour tutta la sera e tariffe concordate per i membri
            flexOffices Map in molti bar partner.
          </div>
        </div>
      </footer>
      <div className=" flex justify-around gap-3">
        <div className=" w-1/3 flex flex-col items-end justify-end ">
          <img src="/public/place.jpg" alt="" />
        </div>
        <div className="w-1/3 flex flex-col justify-between gap-2 text-xs text-center">
          <img src="/public/.jpg" alt="" />
          <p className="cursor-pointer hover:text-cyan-400">
            Norme sulla privacy
          </p>
          <p className="cursor-pointer hover:text-cyan-400">
            Utilizzo dei cookie
          </p>
          <p className="cursor-pointer hover:text-cyan-400">
            {" "}
            Condizioni d’uso
          </p>
          <p className="cursor-pointer hover:text-cyan-400">
            {" "}
            Vendite e rimborsi
          </p>
          <p className="cursor-pointer hover:text-cyan-400">Note legali</p>
          <p>Copyright © 2023 flexOffices Inc. Tutti i diritti riservati.</p>
        </div>
        <div className="w-1/3 flex flex-col justify-center">
          <p className="text-center m-3 text-xs sm:font-bold">
            Contatta il supporto flexOffice!
          </p>
          <a
            className="flex items-center justify-center"
            href="mailto:support@flexOffices.com"
          >
            <img
              className="rounded-lg mx-3 w-4/5 cursor-pointer "
              src="/public/support.png"
              alt=""
            />
          </a>
          <div className="flex justify-around ">
            <img
              className="h-8 cursor-pointer"
              src="/public/instg.png"
              alt=""
            />
            <img
              className="h-8 cursor-pointer"
              src="/public/facebook.png"
              alt=""
            />
            <img
              className="h-8 cursor-pointer"
              src="/public/twitter.png"
              alt=""
            />
            <img
              className="h-8 cursor-pointer"
              src="/public/whatsapp.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <img className="h-22 w-full" src="/public/workinprogress.jpeg" alt="" />
    </>
  );
}

export default Footer;
