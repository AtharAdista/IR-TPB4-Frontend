import { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

function MainPages() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Hook untuk navigasi

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Kirim request ke API untuk mencari
    const response = await fetch("http://127.0.0.1:8000/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log(data)
    setSearchResults(data.results);  // Set hasil pencarian
    setLoading(false);
  };

  const handleDocClick = (docId) => {
    // Navigasi ke halaman baru dan kirim doc_id melalui URL
    navigate(`/document/${docId}`);
  };

  return (
    <div className="min-h-screen w-full justify-center items-center flex">
      <div>
        <p className="text-2xl font-semibold mb-4">Search Example</p>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search..."
            className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              {searchResults.map((result: any) => (
                <li
                  key={result.doc_id}
                  className="p-2 border-b cursor-pointer"
                  onClick={() => handleDocClick(result.doc_id)}  // Arahkan ke halaman dengan doc_id
                >
                  <strong>{result.doc_id}</strong>: {result.title}
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
