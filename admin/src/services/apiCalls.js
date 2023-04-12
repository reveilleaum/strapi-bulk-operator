const baseUrl = window.strapi.backendURL;

export const getContentTypes = async () => {
  const response = await fetch(`${baseUrl}/bulkoperator/content-types`, {
    method: "GET",
  });
  return response.json();
};

export const exportEntries = async (data) => {
  const response = await fetch(`${baseUrl}/bulkoperator/export-entries`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const createEntries = async (data) => {
  const response = await fetch(`${baseUrl}/bulkoperator/create-entries`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateEntries = async (data) => {
  const response = await fetch(`${baseUrl}/bulkoperator/update-entries`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};
