const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema();
const PaymentModel = mongoose.model("Payment", Schema);
module.exports = {
  PaymentModel,
};
