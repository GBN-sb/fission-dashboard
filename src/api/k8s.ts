export async function listNamespaces() {
    const res = await fetch('/k8s/api/v1/namespaces');
    const data = await res.json();
    return data.items.map(ns => ns.metadata.name);
}
  
export async function listFissionFunctionsAllNamespaces() {
    try {
        const res = await fetch(
        `/k8s/apis/fission.io/v1/functions`
        );
        if (!res.ok) return [];
        const json = await res.json();
        return json.items || [];
    } catch (err) {
        console.warn(`Failed to get functions`);
        return [];
    }
}

export async function listFissionTriggersAllNamespaces() {
    try {
        const res = await fetch(`/k8s/apis/fission.io/v1/httptriggers`);
        if (!res.ok) return [];
        const json = await res.json();
        return json.items || [];
    } catch (err) {
        console.warn(`Failed to get triggers`);
        return [];
    }
}

export async function listFissionEnvironmentsAllNamespaces() {
    try {
        const res = await fetch(`/k8s/apis/fission.io/v1/environments`);
        if (!res.ok) return [];
        const json = await res.json();
        return json.items || [];
    } catch (err) {
        console.warn(`Failed to get functions`);
        return [];
    }
}