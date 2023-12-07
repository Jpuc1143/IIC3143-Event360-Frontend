/* eslint-disable jsx-a11y/anchor-is-valid */
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../api/queries"

export default function Requests () {
  // HARDCODED: Obtener la información del backend
  const data = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    column1: `Data ${index + 1}`,
    column2: `Value ${index + 1}`,
    column3: `Another ${index + 1}`,
    column4: `Example ${index + 1}`,
  }));

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationItems = () => {
    const items = [];

    for (let number = Math.max(1, currentPage - 1); number <= Math.min(totalPages, currentPage + 1); number++) {
      items.push(
        <li
          key={number}
          className={`inline-block mx-1 px-3 py-1 bg-primary text-white rounded cursor-pointer ${number === currentPage ? 'bg-primary-dark' : ''}`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </li>
      );
    }

    if (currentPage - 1 > 1) {
      items.unshift(
        <li key="ellipsis-start" className="inline-block mx-1 px-3 py-1 bg-gray-200 text-gray-700 rounded">
          <span>...</span>
        </li>
      );
      items.unshift(
        <li
          key={1}
          onClick={() => handlePageChange(1)}
          className={`inline-block mx-1 px-3 py-1 bg-primary text-white rounded cursor-pointer ${1 === currentPage ? 'bg-gray-700' : ''}`}
        >
          1
        </li>
      );
    }

    if (currentPage + 1 < totalPages) {
      items.push(
        <li key="ellipsis-end" className="inline-block mx-1 px-3 py-1 bg-gray-200 text-gray-700 rounded">
          <span>...</span>
        </li>
      );
      items.push(
        <li
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`inline-block mx-1 px-3 py-1 bg-primary text-white rounded cursor-pointer ${totalPages === currentPage ? 'bg-gray-700' : ''}`}
        >
          {totalPages}
        </li>
      );
    }

    return items;
  };

  return (
    <div className="px-32 h-screen w-full flex flex-col">
      <h1 className="text-4xl font-bold my-8 text-primary">Solicitudes para ser organizador</h1>
      <table className="table-auto w-2/3 ">
        <thead >
          <tr className="bg-primary">
            <th className="border-2 border-primary px-4 py-2 text-white">Nombre</th>
            <th className="border-2 border-primary px-4 py-2 text-white">Email</th>
            <th className="border-2 border-primary px-4 py-2 text-white">Desición</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id}>
              <td className="border-2 border-primary-light px-4 py-2">{row.column1}</td>
              <td className="border-2 border-primary-light px-4 py-2">{row.column2}</td>
              <td className="border-2 border-primary-light px-2 py-2 w-96">
                <button className="bg-primary-light text-white font-semibold text-base rounded-full px-4 py-1 mx-2.5">
                  Aprobar solicitud
                </button>
                <button className="bg-secondary text-white font-semibold text-base rounded-full px-4 py-1">
                  Rechazar solicitud
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="flex justify-center mt-4 w-2/3">
        <li 
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
          className={`inline-block mx-1 px-3 py-1 bg-primary text-white rounded cursor-pointer ${currentPage === 1 && 'bg-gray-700'}`}
        >
          &laquo;
        </li>

        {getPaginationItems()}

        <li 
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          className={`inline-block mx-1 px-3 py-1 bg-primary text-white rounded cursor-pointer ${currentPage === totalPages && 'bg-gray-700'}`}
        >
          &raquo;
        </li>
      </ul>
    </div>
  )
}