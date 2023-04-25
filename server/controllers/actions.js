"use strict";

module.exports = ({ strapi }) => ({
  async exportEntries(ctx) {
    const { query } = JSON.parse(ctx.request.body);

    const i18n = await strapi.plugins.i18n.services.locales.find();
    const locales = i18n.map(locale => locale.code)

    const entries = await strapi.entityService.findMany(query, {
      locale: locales,
    });

    return {
      data: entries,
    };
  },
  async createEntries(ctx) {
    const { query, data } = JSON.parse(ctx.request.body);
    const collectionName = `${query.split(".")[1]}(s)`;
    const success = [];
    const error = [];

    for (const item of data) {
      try {
        await strapi.entityService.create(query, {
          data: {
            ...item,
            id: null
          },
        });
        success.push({
          id: item.id,
        });
      } catch (err) {
        error.push({
          id: item.id,
          reason: `${err}`,
        });
      }
    }

    return {
      success: success.length && {
        message: `${success.length} ${collectionName} has been created successfully`,
        data: success,
      },
      error: error.length && {
        message: `${error.length} ${collectionName} couldn't be created`,
        data: error,
      },
    };
  },
  async updateEntries(ctx) {
    const { query, data } = JSON.parse(ctx.request.body);
    const collectionName = `${query.split(".")[1]}(s)`;
    const success = [];
    const error = [];

    const i18n = await strapi.plugins.i18n.services.locales.find();
    const locales = i18n.map(locale => locale.code)

    const createdEntries = await strapi.entityService.findMany(query, {
      locale: locales,
    });
    const createdEntriesIds = createdEntries.map((entry) => entry.id);
    const toUpdate = data.filter((item) => createdEntriesIds.includes(item.id));

    data.forEach((item) => {
      if (!createdEntriesIds.includes(item.id)) {
        error.push({
          id: item.id,
          reason: "This id doesn't exist",
        });
      }
    });

    for (const item of toUpdate) {
      try {
        await strapi.entityService.update(query, item.id, {
          data: item,
        });
        success.push({
          id: item.id,
        });
      } catch (err) {
        error.push({
          id: item.id,
          reason: `${err}`,
        });
      }
    }

    return {
      success: success.length && {
        message: `${success.length} ${collectionName} has been updated successfully`,
        data: success,
      },
      error: error.length && {
        message: `${error.length} ${collectionName} couldn't be updated`,
        data: error,
      },
    };
  },
});
