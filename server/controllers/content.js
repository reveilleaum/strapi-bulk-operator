"use strict";

module.exports = ({ strapi }) => ({
  async getContentTypes() {
    const contentTypes = await strapi.contentTypes;
    return {
      data: contentTypes,
    };
  },
});
