"use strict";

module.exports = ({ strapi }) => ({
  async getContentTypes() {
    const contentTypes = await strapi.contentTypes;
    const i18n = await strapi.plugins.i18n.services.locales.find();
    const locales = i18n.map(locale => locale.code)
    return {
      data: contentTypes,
      locales
    };
  },
});
