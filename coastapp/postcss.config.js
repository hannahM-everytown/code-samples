const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  plugins: {
    autoprefixer: { grid: true, flexbox: "no-2009" },
    cssnano: {}
  }
};
