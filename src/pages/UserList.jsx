import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // localStorage'dan tamamlandı durumlarını al veya varsayılan bir durum kullan
  const initialCompleted = JSON.parse(localStorage.getItem("completed")) || {};
  const [completed, setCompleted] = useState(initialCompleted);

  useEffect(() => {
    const jsonBlobUrl = "https://jsonblob.com/api/jsonBlob/1170375797302484992";

    axios
      .get(jsonBlobUrl)
      .then((response) => {
        const data = response.data;
        setUsers(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);


  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  const handleCompleted = (index) => {
    const updatedCompleted = { ...completed, [index.toString()]: !completed[index.toString()] };
    setCompleted(updatedCompleted);
  };

  return (
    <div className="user-list">
      <div className="bg-white rounded-lg shadow-lg p-4 mt-4 mx-5">
        <a
          href="https://www.github.com/measses"
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-xs bg-emerald-300 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-full transition-transform transform hover:scale-105 text-center"
        >
          Github
        </a>
      </div>
      {error && <p className="text-red-500">Hata: JSON verileri alınamadı.</p>}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 mt-4 sm:mt-0"
          >
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-gray-500">{user.description}</p>
            <a
              href={user.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-transform transform hover:scale-105"
            >
              LinkedIn Profili
            </a>
            <label className="mt-2  mx-3 text-white font-semibold py-2 px-4 rounded-full cursor-pointer">
              <input
                type="checkbox"
                checked={completed[index.toString()]}
                onChange={() => handleCompleted(index)}
                className="mr-2 cursor-pointer"
              />
              İşaretle
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
