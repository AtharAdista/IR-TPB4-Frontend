import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPages from "./pages/main/main-pages";
import DocDetail from "./pages/doc-detail/doc-detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPages />} />
        <Route path="/document/:docId" element={<DocDetail/>} /> {/* Add this route for DocDetail */}
      </Routes>
    </Router>
  );
}

export default App;
