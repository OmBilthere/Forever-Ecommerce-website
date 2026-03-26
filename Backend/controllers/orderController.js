import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import Razorpay from 'razorpay';
// global variables
const currency = "INR";
const deliveryCharge = 10;

//gateway integration for payment methods'

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// placing orders using COD method

const placeOrder = async (req ,res ) => {
    try {

        const {userId , items , amount , address} = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()

        } 

        const newOrder = new orderModel(orderData)
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


// placing oder using Razorpay method

const placeOrderRazorpay = async (req ,res ) => {
       try {
        
        const {userId , items , amount , address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()
        
        const options = {
            amount: Math.round(amount * 100),
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        razorpayInstance.orders.create(options , (error , order)=>{
           
            if(error){
                console.log(error)
                return res.json({
                    success:false,
                    message:"Error creating Razorpay order"
                })
            }

            res.json({
                success:true,
                order
            })
      
        })

       } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error placing order with Razorpay"
        })
        
       }
}

const verifyRazorpay = async (req , res ) => {

     try {
        const {userId , razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt , {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({
                success:true,
                message:"Payment verified and order placed"
            })
        }   
        else {
            res.json({
                success:false,
                message:"Payment not successful"
            })
        }     
     } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error verifying Razorpay order"
        })
     }

}


// All orders data for admin panel

const allOrders = async (req , res) => {
        try {
            const orders = await orderModel.find({})
            res.json({
                success:true,
                orders
            })
        } catch (error) {
            console.log(error)
            res.json({
                success:false,
                message:"Error fetching orders"
            })
        }
}

// User order for frontend

const userOrders = async (req , res ) => {
   
    try {
         const { userId} = req.body;
         const orders = await orderModel.find({userId})
         res.json({
            success:true,
            orders
         })

    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error fetching orders"
        })
    }
}

// update order status from admin panel

 const updateStatus = async (req , res ) => {
      try {
        const {orderId , status} = req.body;
        await orderModel.findByIdAndUpdate(orderId , {status})
        res.json({
            success:true,
            message:"Order status updated"
        })

      } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:"Error updating order status"
        })
      }
 }

 export {placeOrder , placeOrderRazorpay , allOrders , userOrders , updateStatus , verifyRazorpay};