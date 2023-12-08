import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { getRequest, patchRequest } from "../api/queries"

export default function Requests () {
  const { getAccessTokenSilently } = useAuth0();
  const [currentPage, setCurrentPage] = useState(1);
  const [indexOfLastRow, setIndexOfLastRow] = useState(0)
  const [indexOfFirstRow, setIndexOfFirstRow] = useState(0)
  const [currentRows, setCurrentRows] = useState<User[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [reload, setReload] = useState(false)

  const rowsPerPage = 10;
  const totalPages = Math.ceil(users.length / rowsPerPage);

  useEffect(() => {
    setIndexOfLastRow(currentPage * rowsPerPage);
    setIndexOfFirstRow(indexOfLastRow - rowsPerPage);
    setCurrentRows(users.slice(indexOfFirstRow, indexOfLastRow));
  }, [currentPage, indexOfFirstRow, indexOfLastRow, users])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const requestedUsers = await getRequest('/admins/petitions', accessToken);
        setUsers(requestedUsers.data)
        setReload(false)
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [getAccessTokenSilently, reload])

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDecision = async (decision: boolean, id: string) => {
    try {
      const accessToken = await getAccessTokenSilently();
      await patchRequest(`/admins/${id}/verify`, {answer: decision}, accessToken);
      setReload(true)
    } catch (error) {
      console.log(error);
    }
  }

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
          {currentRows.map((user) => (
            <tr key={user.id}>
              <td className="border-2 border-primary-light px-4 py-2">{user.name}</td>
              <td className="border-2 border-primary-light px-4 py-2">{user.email}</td>
              <td className="border-2 border-primary-light px-2 py-2 w-96">
                <button 
                  className="bg-primary-light text-white font-semibold text-base rounded-full px-4 py-1 mx-2.5"
                  onClick={() => handleDecision(true, user.id)}
                >
                  Aprobar solicitud
                </button>
                <button 
                  className="bg-secondary text-white font-semibold text-base rounded-full px-4 py-1" 
                  onClick={() => handleDecision(false, user.id)}
                >
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