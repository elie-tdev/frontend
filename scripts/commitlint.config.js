module.exports = {
  extends: [
    "@commitlint/config-conventional",
    "@commitlint/config-lerna-scopes",
  ],
  rules: {
    // This is longer, but some of our package names are quite long.
    // Also, this will account for linking to JIRA issues, which add 5-7
    // characters.
    "header-max-length": [2, "always", 100],
    // Disabling this, so we can link to JIRA issues within the title
    "header-case": [0, "always", "lower-case"],
  },
};
