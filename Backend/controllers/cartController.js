import userModel from "../models/userModel.js";


// add product to cart
const addToCart = async (req , res) => {
    
    try {
        
        const { userId , itemId , size} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if(cartData[itemId]) {

            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        }


        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1 
        }

        await userModel.findByIdAndUpdate(userId , {cartData: cartData})
        
        res.json({
            success: true,
            message:"Added to cart"
        })

    } catch (error) {
        res.json({
            success: false,
            message:"Error adding to cart"
        })
    }
}

// update cart

const UpdateCart = async (req , res) => {
  try {
    
     const {userId , itemId , size , quantity} = req.body;
     const userData = await userModel.findById(userId);
     let cartData = await userData.cartData;
  
     cartData[itemId][size] = quantity

     await userModel.findByIdAndUpdate(userId , {cartData: cartData})
        res.json({
            success:true,
            message:"Cart updated"
        })

  } catch (error) {
    res.json({
      success: false,
      message:"Error updating cart"
    })
  }
}

// get user cart data

const getUserCart = async (req , res) => {
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        let cartData =   await userData.cartData;

        res.json({
            success: true,
            cartData: cartData
        })

    } catch (error) {
        res.json({
            success: false,
            message:"Error fetching user cart"
        })
    }
}

export { addToCart , UpdateCart , getUserCart }