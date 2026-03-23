import oderModel from '../models/orderModel.js'
// placing orders using COD method

const placeOrder = async (req ,res ) => {
    try {

        const {userId , items , amount , address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod:"COD",
            payment:false,
            data: Date.now()

        } 

        const newOrder = new oderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({
            success:true,
            message:"Order Placed"
        })

    } catch (error) {
        
        console.log(error)

        res.json({
            success:false,
            message: "Error placing order"
        });
    }
}

// placing orders using stripe method

const placeOrderStripe = async (req ,res ) => {

}

// placing oder using Razorpay method

const placeOrderRazorpay = async (req ,res ) => {

}

// All orders data for admin panel

const allOrders = async (req , res) => {

}

// User order for frontend

const userOrders = async (req , res ) => {

}

// update order status from admin panel

 const updateStatus = async (req , res ) => {

 }

 export {placeOrder , placeOrderRazorpay , placeOrderStripe , allOrders , userOrders , updateStatus};