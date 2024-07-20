import { useState, useEffect } from 'react';
import Header from '../Home/Header';
import { getClients, deleteClient, searchByName} from './indexDB';
import SidePreview from './SidePreview';

export default function ViewClient() {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    getClients()
      .then((data) => {
        data.sort((a, b) => b.id - a.id);
        setClients(data);
      })
      .catch((error) => {
        console.error('Failed to fetch clients:', error);
      });
  };

  const handleDelete = (id) => {
    deleteClient(id)
      .then(() => {
        fetchClients();
      })
      .catch((error) => {
        console.error('Failed to delete client:', error);
      });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const emri = document.getElementById("simple-search").value;
    searchByName(emri).then(client =>{
      client.sort((a, b) => b.id - a.id);
      setClients(client)} 
      );
  }

  const showPreview = (client) => {
    setShow(show => !show);
    setClient(client)
    fetchClients();
  }
  

  return (
    <div className="w-full h-screen">
      <Header pos={true}/>
      <div className="flex justify-center items-center mt-12 w-full">
        <div className="w-full px-4 py-8 bg-gray-800 shadow-md sm:rounded-lg mx-11">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4 text-center">KLIENTËT</h2>
          <div className="w-full md:w-1/2">
            <form className="flex items-center" onSubmit={handleSearch}>
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  placeholder="Kërko emrin e klientit"
                  required=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </form>
          </div>
          <br />

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 text-gray-200 border border-gray-600">
              <thead>
                <tr className="bg-gray-700">
                  <th className="border-b border-gray-600 px-6 py-3 text-center text-xs leading-4 font-medium uppercase tracking-wider">Emri</th>
                  <th className="border-b border-gray-600 px-6 py-3 text-center text-xs leading-4 font-medium uppercase tracking-wider">Modeli Veshjes</th>
                  <th className="border-b border-gray-600 px-6 py-3 text-center text-xs leading-4 font-medium uppercase tracking-wider">Dimensionet</th>
                  <th className="border-b border-gray-600 px-6 py-3 text-center text-xs leading-4 font-medium uppercase tracking-wider">Data Porosise</th>
                  <th className="border-b border-gray-600 px-6 py-3 text-center text-xs leading-4 font-medium uppercase tracking-wider">Data Marrjes</th>
                  <th className="border-b border-gray-600 px-6 py-3 text-center text-xs leading-4 font-medium uppercase tracking-wider">Butonat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                {clients.map(client => (
                  
                  <tr key={client.id}>
                    
                    <td className="border-b border-gray-600 px-6 py-4 whitespace-no-wrap text-center">{client.name}</td>
                    <td className="border-b border-gray-600 px-6 py-4 whitespace-no-wrap text-center">{client.model}</td>
                    <td className="border-b border-gray-600 px-6 py-4 whitespace-no-wrap text-center">{client.dimensions}</td>
                    <td className="border-b border-gray-600 px-6 py-4 whitespace-no-wrap text-center">{client.orderDate}</td>
                    <td className="border-b border-gray-600 px-6 py-4 whitespace-no-wrap text-center">{client.pickupDate}</td>
                    <td className="border-b border-gray-600 px-6 py-4 whitespace-no-wrap text-center">
                      
                      <div className="flex items-center space-x-4 justify-center">
                        <button
                          type="button"
                          data-drawer-target="drawer-read-product-advanced"
                          data-drawer-show="drawer-read-product-advanced"
                          aria-controls="drawer-read-product-advanced"
                          className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          onClick={() => showPreview(client)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2 -ml-0.5">
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
                          </svg>
                          Shiko
                        </button>
                        <button
                          type="button"
                          data-modal-target="delete-modal"
                          data-modal-toggle="delete-modal"
                          className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                          onClick={() => handleDelete(client.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {client != null && <SidePreview show={show} exit={showPreview} client={client}/>}
      
    </div>
  );
}
