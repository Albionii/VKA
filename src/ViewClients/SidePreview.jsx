import { useEffect, useState } from "react";
// import { getImagesOfClient, updateClient } from "./clientDB";
import { getImagesOfClient, updateClient } from "./indexDB";

export default function SidePreview ({show, exit, client}) {
  const [clientDetails, setClientDetails] = useState(client);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const clientImages = await getImagesOfClient(client.id);
        setImages(clientImages);
      } catch (error) {
        console.log("Error fetching images", error);
      }
    };
    fetchImages();
  }, [client]);

  useEffect(() => {
    setClientDetails(client);
  }, [client]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateClient = async () => {
    try {
      await updateClient(clientDetails);
      console.log("Client updated successfully");
      exit(clientDetails);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleExit = () => {
    exit(client);
  };

  return (
    <div
      id="drawer-read-product-advanced"
      className={"overflow-y-auto fixed top-0 left-0 z-40 p-4 w-full max-w-lg h-screen bg-white transition-transform dark:bg-gray-800 "+(show ? "":"-translate-x-full")}
      tabIndex={-1}
      aria-labelledby="drawer-label"
      aria-hidden={show?"false":"true"}
    >
      <div>
        <h4
          id="read-drawer-label"
          className="text-center mb-1.5 leading-none text-xl font-semibold text-gray-900 dark:text-white mt-2"
        >
          {clientDetails.name}
        </h4>
      </div>
      <br />
      <button
        type="button"
        data-drawer-dismiss="drawer-read-product-advanced"
        aria-controls="drawer-read-product-advanced"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={handleExit}
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <div className="grid grid-cols-3 gap-4 mb-4 sm:mb-5">
        <label className="col-span-3 text-white">
          Emri Klientit:
          <input
            type="text"
            name="name"
            value={clientDetails.name}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
        </label>
        <label className="col-span-3 text-white">
          Numri Telefonit:
          <input
            type="text"
            name="phone"
            value={clientDetails.phone}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </label>
        <label className="col-span-3 text-white">
          Modeli Veshjes:
          <input
            type="text"
            name="model"
            value={clientDetails.model}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </label>
        <label className="col-span-3 text-white">
          Çmimi:
          <input
            type="text"
            name="price"
            value={clientDetails.price}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </label>
        <label className="col-span-3 text-white">
          Kaparja:
          <input
            type="text"
            name="deposit"
            value={clientDetails.deposit}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </label>
        <label className="col-span-3 text-white">
          Data e Porosisë:
          <input
            type="date"
            name="orderDate"
            value={clientDetails.orderDate}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </label>
        <label className="col-span-3 text-white">
          Data e Marrjes:
          <input
            type="date"
            name="pickupDate"
            value={clientDetails.pickupDate}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </label>
        <label className="col-span-3 text-white">
          Dimensionet:
          <input
            type="text"
            name="dimensions"
            value={clientDetails.dimensions}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </label>
        <label className="col-span-3 text-white">
          Shënimi:
          <textarea
            name="note"
            value={clientDetails.note}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            rows="4"
          />
        </label>

      </div>
      <dl className="sm:mb-5">
        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          Photos
        </dt>
      </dl>
      <dl className="grid grid-cols-2 gap-4 mb-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600 flex justify-center items-center"
            >
              <img src={image} alt={`Client ${clientDetails.name} ${index + 1}`} />
            </div>
          ))
        ) : (
          <div className="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-2 dark:border-gray-600 text-center">
            <p className="text-white">No photos available.</p>
          </div>
        )}
      </dl>
      <div className="flex bottom-0 left-0 justify-center pb-4 space-x-4 w-full">
        <button
          type="button"
          onClick={handleUpdateClient}
          className="w-full justify-center py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2 -ml-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
          Update
        </button>
        <button
          type="button"
          className="inline-flex w-full items-center text-white justify-center bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-1.5 -ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
