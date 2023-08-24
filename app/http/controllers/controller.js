const autoBind = require("auto-bind");

module.exports = class Controller {
  constructor() {
    autoBind(this);
  }
  salahshoor() {
    return "test string";
  }
};
