module.exports = [
  {
    method: "GET",
    path: "/content-types",
    handler: "content.getContentTypes",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/export-entries",
    handler: "actions.exportEntries",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/create-entries",
    handler: "actions.createEntries",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/update-entries",
    handler: "actions.updateEntries",
    config: {
      policies: [],
      auth: false,
    },
  },
];
