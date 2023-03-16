export const getContentTypes = async () => {
  const response = await fetch(
    "http://localhost:1337/bulkoperator/content-types",
    {
      method: "GET",
    }
  );
  return response.json();
};

export const exportEntries = async (data) => {
  const response = await fetch(
    "http://localhost:1337/bulkoperator/export-entries",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const createEntries = async (data) => {
  const response = await fetch(
    "http://localhost:1337/bulkoperator/create-entries",
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const updateEntries = async (data) => {
  const response = await fetch(
    "http://localhost:1337/bulkoperator/update-entries",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  return response.json();
};
