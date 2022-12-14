import { useState } from "react";

const FORM_ENDPOINT = "http://localhost:8080/predict-cifar";

const Cifar = () => {
    const [prediction, setPrediction] = useState({});

    const uploadPicture = (e) => {
      var outputCifar = document.getElementById("outputCifar");
      outputCifar.classList.remove("hidden");
      outputCifar.classList.add("block");
      outputCifar.src = URL.createObjectURL(e.target.files[0]);
      outputCifar.onload = function () {
        URL.revokeObjectURL(outputCifar.src);
      };
      var predictCifar = document.getElementById("predictCifar");
      predictCifar.classList.remove("hidden");
      predictCifar.classList.add("block");
    };
  
    const setImageAction = async (event) => {
      event.preventDefault();
  
      const data = new FormData(event.target);

      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
      })
      .then((res) => res.json())
      .then((medicalPrescription) => {
        console.log(medicalPrescription)
        setPrediction(medicalPrescription);
      });

      console.log("Successfully uploaded image: ", prediction);
    };
  
    return (
      <main className="flex flex-col items-center gap-y-8 mt-20 bg-green-200 rounded-xl">
      <h1 className="text-3xl drop-shadow-2xl font-semibold p-4">
        Cifar10
      </h1>
      <form onSubmit={setImageAction} encType="multipart/form-data">
        <div className="flex flex-col">
          <div className="flex w-full items-center justify-center bg-grey-lighter p-4">
            <label
              className="w-64 flex flex-col items-center px-4 py-4 bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-black hover:text-white transform cursor:pointer hover:scale-105 cursor-pointer transition duration-500 linear"
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
                />
              </svg>
              <span
                className="mt-2 text-base leading-normal drop-shadow-xl text-center"
                >Vyberte obrázok</span
              >
              <input
                className="hidden"
                id="imgInp"
                accept=".png, .jpg, .jpeg"
                type="file" 
                name="file"
                onChange={uploadPicture}
              />
            </label>
          </div>
        </div>
        <div className="p-4" id="result">
          <div className="flex flex-row">
            <h1 className="text-lg font-semibold text-center">Čo to je ?:</h1>
            <h1 className="text-lg text-center pl-2">{prediction.predictions?.label}</h1>
          </div>
          <div className="flex flex-row">
            <h1 className="text-lg font-semibold text-center">
              Presnosť predikcie:
            </h1>
            <h1 className="text-lg text-center pl-2">{prediction.predictions?.percentage}%</h1>
          </div>
        </div>
        <img
          className="w-60 h-60 mx-auto rounded-lg hidden"
          id="outputCifar"
          src="#"
          alt="Váš obrázok"
        />

        <button
          className="hidden bg-white text-black m-10 rounded-lg shadow-lg h-10 rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-black hover:text-white transform cursor:pointer hover:scale-105 cursor-pointer transition duration-500 linear w-60"
          type="submit"
          id="predictCifar"
        >
          Predikovať
        </button>
      </form>
    </main>
    );
};

export default Cifar;