import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { SearchResult } from "../../types/types";

function MainPages() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Kirim request ke API untuk mencari
    const response = await fetch("https://ir-tpb4-backend.onrender.com/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log(data);
    setSearchResults(data.results); // Set hasil pencarian
    setLoading(false);
  };

  const handleDocClick = (docId: number) => {
    // Navigasi ke halaman baru dan kirim doc_id melalui URL
    navigate(`/document/${docId}`);
  };

  return (
    <div className="min-h-screen w-full justify-center pt-10 flex">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold mb-4">GULU-GULU</p>
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search..."
            className="px-4 py-2 border rounded-md lg:w-[1000px] md:w-[750px] w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Search
          </button>
        </form>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result: SearchResult) => (
                <li
                  key={result.doc_id}
                  className="p-2 border-b cursor-pointer"
                  onClick={() => handleDocClick(result.doc_id)} // Arahkan ke halaman dengan doc_id
                >
                  <div className="flex flex-col lg:w-[1000px] md:w-[750px] w-[300px]">
                    <p className="font-bold ">{result.title.replace(/"/g, '')}</p>
                    <p>{result.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPages;
