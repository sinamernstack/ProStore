const { UserModel } = require("../../../models/users");
const Controller = require("../controller");
class PaymentController extends Controller {
 async basketPayment(req, res, next) {
    try {
        const user = req.user
        //inja sabade kharido fara mikhoonim
        const basket = await UserModel.find({_id:user._id,})   
      const zarinpal_request_url =
        "https://api.zarinpal.com/pg/v4/payment/request.json";
        if(!basket){
            return res.json({
                status: 404,
                message: "basket not found",
              });
        }
      const zarinpal_options = {
        amount: req.body.amount,
        merchant_id: process.env.MERCHANT_ID,
        callback_url: req.body.callback_url,
        description: req.body.description,
        email: req.body.email,
        mobile: req.body.mobile,
        merchant_order_id: req.body.merchant_order_id,
        metadata: req.body.metadata,
        notify_url: req.body.notify_url,
        order_id: req.body.order_id,
      };
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  PymentController: new PaymentController(),
};
