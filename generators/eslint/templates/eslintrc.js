var alias = require('./alias');

module.exports = {
  "extends": [
    "google",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "objectLiteralDuplicateProperties": true
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
<% if(react) { -%>
    "react",
<% } -%>
    "import"
  ],
  "settings": {
<% if(react) { -%>
    "react": {
      "pragma": "React",
      "version": "15.3"
    },
<% } -%>
    "import/resolver": {
      "babel-module": {
        "root": ["./src"],
        "alias": alias
      }
    }
  },
  "rules": {
    "indent": [2, 2, {"SwitchCase": 1}],
    "max-len": 0,
    "quote-props": ["error", "as-needed"],
    "no-alert": "warn",
    "object-curly-spacing": [1, "never"],
    "keyword-spacing": [2, {"overrides": {
      "if": {"after": false},
      "for": {"after": false},
      "while": {"after": false},
      "switch": {"after": false},
      "catch": {"after": false}
    }}]
  }
}
