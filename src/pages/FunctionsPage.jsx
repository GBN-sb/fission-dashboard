import { useEffect, useState } from "react";
import { listFissionFunctionsAllNamespaces } from "../api/k8s";

export default function FunctionsPage() {
  const [functions, setFunctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFunctions() {
      const allFuncs = await listFissionFunctionsAllNamespaces();
      setFunctions(allFuncs);
      setLoading(false);
    }
    loadFunctions();
  }, []);

  if (loading) return <p>Loading functions...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Fission Functions</h2>
      {functions.length === 0 ? (
        <p>No functions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full bg-white shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Namespace</th>
                <th className="px-4 py-2 text-left">Runtime</th>
                <th className="px-4 py-2 text-left">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {functions.map((fn) => (
                <tr key={`${fn.metadata.namespace}-${fn.metadata.name}`} className="border-t">
                  <td className="px-4 py-2">{fn.metadata.name}</td>
                  <td className="px-4 py-2">{fn.metadata.namespace}</td>
                  <td className="px-4 py-2">{fn.spec?.environment?.runtime || "n/a"}</td>
                  <td className="px-4 py-2">{fn.metadata.creationTimestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
