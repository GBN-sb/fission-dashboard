import { useEffect, useState } from "react";
import { listFissionFunctionsAllNamespaces } from "../api/k8s";
import { format } from "date-fns"; // For date formatting

export default function FunctionsPage() {
  const [functions, setFunctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedFunction, setExpandedFunction] = useState(null); // Track expanded function

  useEffect(() => {
    async function loadFunctions() {
      try {
        const allFuncs = await listFissionFunctionsAllNamespaces();
        setFunctions(allFuncs);
      } catch (error) {
        console.error("Error fetching functions:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFunctions();
  }, []);

  if (loading) return <p>Loading functions...</p>;

  const toggleExpand = (functionName) => {
    setExpandedFunction(expandedFunction === functionName ? null : functionName);
  };

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), "MMM dd, yyyy, h:mm a");
  };

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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {functions.map((fn) => {
                const { name, namespace, creationTimestamp, environment } = fn.metadata;
                const { runtime } = fn.spec?.environment || {};
                const isExpanded = expandedFunction === name;

                return (
                  <tr
                    key={`${namespace}-${name}`}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{namespace}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {runtime || "n/a"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(creationTimestamp)}
                    </td>
                    <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer" onClick={() => toggleExpand(name)}>
                      {isExpanded ? "Hide Details" : "View Details"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Expandable details section */}
      {expandedFunction && (
        <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Function Details: {expandedFunction}
          </h3>
          <div className="mt-4">
            {/* Render the details for the expanded function here */}
            {functions
              .filter((fn) => fn.metadata.name === expandedFunction)
              .map((fn) => (
                <div key={fn.metadata.name}>
                  <p><strong>Execution Strategy:</strong> {fn.spec?.InvokeStrategy?.ExecutionStrategy?.ExecutorType || "n/a"}</p>
                  <p><strong>Max Scale:</strong> {fn.spec?.InvokeStrategy?.ExecutionStrategy?.MaxScale || "n/a"}</p>
                  <p><strong>Min Scale:</strong> {fn.spec?.InvokeStrategy?.ExecutionStrategy?.MinScale || "n/a"}</p>
                  <p><strong>Function Timeout:</strong> {fn.spec?.functionTimeout || "n/a"}</p>
                  <p><strong>Idle Timeout:</strong> {fn.spec?.idletimeout || "n/a"}</p>
                  <p><strong>Package Name:</strong> {fn.spec?.package?.packageref?.name || "n/a"}</p>
                  <p><strong>Concurrency:</strong> {fn.spec?.concurrency || "n/a"}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
