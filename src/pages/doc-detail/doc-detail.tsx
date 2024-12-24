import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DocDetailTypes } from "../../types/types";

function DocDetail() {
  const { docId } = useParams();  // Mengambil docId dari URL
  const [docDetail, setDocDetail] = useState<DocDetailTypes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocDetail = async () => {
      setLoading(true);
      try {
        // Kirim request ke API untuk mendapatkan detail dokumen
        const response = await fetch(`http://127.0.0.1:8000/search/${docId}`);
        const data = await response.json();
        setDocDetail(data);  // Set hasil detail dokumen
      } catch (error) {
        console.error("Error fetching document detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocDetail();
  }, [docId]);  // Memanggil API setiap kali docId berubah

  return (
    <div className="min-h-screen w-full justify-center pt-10 flex">
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : docDetail ? (
          <div className="flex flex-col  lg:w-[1200px] md:w-[750px] w-[300px]">
            <h1 className="text-2xl font-semibold">{docDetail.title.replace(/"/g, '')}</h1>
            <p>{docDetail.content}</p>
          </div>
        ) : (
          <p>Document not found</p>
        )}
      </div>
    </div>
  );
}

export default DocDetail;
