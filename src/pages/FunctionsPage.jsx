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
    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Fission Functions</h2>
      {functions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No functions found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Namespace</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Runtime</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {functions.map((fn) => (
                <tr
                  key={`${fn.metadata.namespace}-${fn.metadata.name}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{fn.metadata.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{fn.metadata.namespace}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                    {fn.spec?.environment?.runtime || "n/a"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{fn.metadata.creationTimestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
