import React from "react";
import Select from "react-select";

function Filters({
  filters,
  handleFilterChange,
  handleFacilitiesChange,
  setFilters,
}) {
  const cost = [
    { value: "free", label: "Gratuito" },
    { value: "paid", label: "A pagamento" },
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

  const type = [
    { value: "Smart working", label: "Smart working" },
    { value: "Studio", label: "Studio" },
    { value: "Riunioni", label: "Riunioni" },
    { value: "Conferenze", label: "Conferenze" },
    { value: "Presentazioni", label: "Presentazioni" },
  ];

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Filtri</h2>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <input
          type="text"
          name="city"
          placeholder="Città"
          value={filters.city}
          onChange={handleFilterChange}
          className="w-full md:w-1/4 p-2 border rounded"
        />
        <Select
          name="cost"
          placeholder="Costo"
          options={cost}
          className="w-full md:w-1/4"
          classNames={{
            control: (state) => "h-full",
          }}
          value={
            filters.cost
              ? cost.find((option) => option.value === filters.cost)
              : ""
          }
          onChange={(selectedOption) =>
            setFilters({
              ...filters,
              cost: selectedOption.value,
            })
          }
        />
        <Select
          name="facilities"
          placeholder="Servizi"
          options={facilities}
          classNames={{
            control: (state) => "h-full",
          }}
          value={
            filters.facilities
              ? filters.facilities.map((facility) => {
                  return facilities.find((option) => option.value === facility);
                })
              : null
          }
          onChange={handleFacilitiesChange}
          isMulti
          className="w-full md:w-1/4"
        />

        <Select
          name="type"
          placeholder="Tipologia"
          options={type}
          classNames={{
            control: (state) => "h-full",
          }}
          className="w-full md:w-1/4"
          value={
            filters.type
              ? type.find((option) => option.value === filters.type)
              : ""
          }
          onChange={(selectedOption) =>
            setFilters({
              ...filters,
              type: selectedOption.value,
            })
          }
        />

        <button
          className="bg-cyan-300 text-white hover:bg-cyan-400 px-4 py-2 rounded"
          onClick={() =>
            setFilters({
              city: "",
              openingHours: "",
              cost: "",
              facilities: [],
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filters;
