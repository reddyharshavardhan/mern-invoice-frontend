import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import API from "../utils/api";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { clearProducts } from "../redux/invoiceSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function GeneratePdfPage() {
  const { products } = useSelector((state: RootState) => state.invoice);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDownload = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.post("/invoice/generate-pdf", { products }, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      dispatch(clearProducts());
      navigate("/products");
    } catch (err: any) {
      setError("Error generating PDF!");
    }
    setLoading(false);
  };

  const total = products.reduce((s, p) => s + p.qty * p.rate, 0);
  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#212121] to-[#0d0d0d] text-white flex flex-col">
      <Header headerText="Logout" onHeaderButtonClick={() => navigate("/")} />

      <main className="w-[900px] min-h-[600px] mx-auto mt-10 p-10 shadow-lg bg-[#1a1a1a] rounded-xl">
        <h2 className="text-3xl text-center font-bold mb-6 text-[#d0ff7d]">Generate PDF</h2>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <table className="w-full mb-6 border text-sm bg-[#2a2a2a] text-white rounded">
          <thead className="bg-gray-700">
            <tr>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Qty</th>
              <th className="border px-3 py-2">Rate</th>
              <th className="border px-3 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td className="border px-3 py-2">{p.name}</td>
                <td className="border px-3 py-2">{p.qty}</td>
                <td className="border px-3 py-2">{p.rate}</td>
                <td className="border px-3 py-2">{p.qty * p.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mb-6 space-y-1 text-gray-300 text-right">
          <div>Total: ₹{total.toFixed(2)}</div>
          <div>GST (18%): ₹{gst.toFixed(2)}</div>
          <div className="font-bold text-white">Grand Total: ₹{grandTotal.toFixed(2)}</div>
        </div>

        <div className="flex justify-center">
          <Button
            disabled={loading || products.length === 0}
            onClick={handleDownload}
            className="bg-[#d0ff7d] text-black font-semibold px-6 py-2 rounded hover:bg-[#c1e969]"
          >
            {loading ? "Generating..." : "Generate & Download PDF"}
          </Button>
        </div>
      </main>
    </div>
  );
}
