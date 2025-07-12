import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../redux/invoiceSlice";
import type { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Header from "../components/Header";

type Product = { name: string; qty: number; rate: number };

type SortConfig = {
  key: "name" | "qty" | null;
  direction: "asc" | "desc";
};

export default function ProductPage() {
  const [product, setProduct] = useState<Product>({ name: "", qty: 1, rate: 1 });
  const [error, setError] = useState("");
  const products = useSelector((state: RootState) => state.invoice.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", direction: "asc" });

  const handleAdd = () => {
    if (!product.name.trim() || product.qty <= 0 || product.rate <= 0) {
      setError("Please fill valid product name, quantity, and rate.");
      return;
    }
    dispatch(addProduct(product));
    setProduct({ name: "", qty: 1, rate: 1 });
    setError("");
  };

  const handleRemove = (idx: number) => {
    dispatch(removeProduct(idx));
  };

  const handleNext = () => {
    if (products.length === 0) return setError("Add at least one product.");
    navigate("/generate");
  };

  const sortedProducts = useMemo(() => {
    if (!sortConfig.key) return products;
    const sorted = [...products].sort((a, b) => {
      if (sortConfig.key === "name") {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortConfig.direction === "asc" ? -1 : 1;
        if (nameA > nameB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      } else if (sortConfig.key === "qty") {
        return sortConfig.direction === "asc" ? a.qty - b.qty : b.qty - a.qty;
      }
      return 0;
    });
    return sorted;
  }, [products, sortConfig]);

  const requestSort = (key: "name" | "qty") => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const subtotal = products.reduce((acc, prod) => acc + prod.qty * prod.rate, 0);
  const tax = subtotal * 0.18; // GST 18%

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col">
      <Header headerText="Logout" onHeaderButtonClick={() => navigate("/")} />

      <main className="max-w-5xl mx-auto mt-10 p-6 bg-[#1b1b1b] rounded-md shadow-md pb-20 px-10">
        <h2 className="text-2xl font-semibold mb-4">Add Products</h2>
        

        {error && <div className="text-red-500 mb-6 text-sm">{error}</div>}

        {/* Inputs */}
        <div className="flex gap-4 mb-3">
          <Input
            placeholder="Enter the product name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-2/3 text-sm"
          />
          <Input
            type="number"
            placeholder="Enter the price"
            value={product.rate}
            onChange={(e) => setProduct({ ...product, rate: Number(e.target.value) })}
            className="w-1/6 text-sm"
            min={1}
          />
          <Input
            type="number"
            placeholder="Enter the Qty"
            value={product.qty}
            onChange={(e) => setProduct({ ...product, qty: Number(e.target.value) })}
            className="w-1/6 text-sm"
            min={1}
          />
        </div>

        {/* Add Product Button */}
        <div className="flex justify-center mb-8">
          <Button
            type="button"
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-sm px-5 py-2 rounded"
          >
            Add Product +
          </Button>
        </div>

        {/* Products Table */}
        <table className="w-full border border-gray-700 text-sm text-left rounded-md overflow-hidden mb-8">
          <thead className="bg-gray-900 text-gray-300">
            <tr>
              <th
                className="cursor-pointer py-2 px-3 select-none"
                onClick={() => requestSort("name")}
              >
                Product name&nbsp;
                {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "↑"}
              </th>
              <th className="py-2 px-3">Price</th>
              <th
                className="cursor-pointer py-2 px-3 select-none"
                onClick={() => requestSort("qty")}
              >
                Quantity&nbsp;
                {sortConfig.key === "qty" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "↑"}
              </th>
              <th className="py-2 px-3">Total Price</th>
              <th className="py-2 px-3"></th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-3 text-gray-500">
                  No products added yet.
                </td>
              </tr>
            ) : (
              sortedProducts.map((p, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="py-2 px-3">{p.name}</td>
                  <td className="py-2 px-3">{p.rate}</td>
                  <td className="py-2 px-3">{p.qty}</td>
                  <td className="py-2 px-3">INR {(p.qty * p.rate).toFixed(2)}</td>
                  <td className="py-2 px-3">
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => handleRemove(i)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-0.5 text-xs"
                      aria-label={`Remove product ${p.name}`}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="bg-gray-900 text-gray-300 font-semibold text-sm">
            <tr>
              <td colSpan={3} className="text-right py-2 px-3">
                Sub-Total
              </td>
              <td className="py-2 px-3">INR {subtotal.toFixed(2)}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={3} className="text-right py-2 px-3">
                Incl. GST 18%
              </td>
              <td className="py-2 px-3">INR {tax.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>

        {/* Generate PDF Button */}
        <div className="flex justify-center mt-8 mb-8">
          <Button
            type="button"
            onClick={handleNext}
            disabled={products.length === 0}
            className={`px-7 py-3 rounded text-white font-semibold ${
              products.length === 0
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Generate PDF Invoice
          </Button>
        </div>
      </main>
    </div>
  );
}