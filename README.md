<!-- @format -->

# Strapi plugin bulk-operator

### Description

This plugin allows you to create and update multiple entries from .xls or .xlsx file

![Alt Text](https://www.matthieu-reveilleau.fr/works/strapi-bulk-operator.gif)

### Installation

Install strapi-bulk-operator

```
yarn add strapi-bulk-operator
```

Install xlsx

```
yarn add xlsx
```

Import the plugin in your /config/plugins.js

```
module.exports = () => ({
  ...
  bulkoperator: {
    enabled: true,
    resolve: "strapi-bulk-operator",
  }
});
```

### Components / Relations / Localizations

Creating or updating entries components/relations/localizations is not yet possible. These features will be coming up in the next plugin versions.
