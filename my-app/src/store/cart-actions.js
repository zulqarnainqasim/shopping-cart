import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";
export const fetchData=()=>{
    return async(dispatch)=>{
        const fetchHandler=async()=>{
const res = await fetch(
  "https://redux-af7e5-default-rtdb.firebaseio.com/cartItems.json"
  
);
const data=await res.json()
return data
        }
        try{
            const cartData=await fetchHandler()
            dispatch(cartActions.replaceData(cartData))
        }catch(err){
             dispatch(
               uiActions.showNotification({
                 open: true,
                 message: "sending request error",
                 type: "error",
               })
             );
        }
    }
}

export const sendCartData = (cart) => {
  return async(dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: "sending request",
        type: "warning",
      })
    );
    const sendRequest = async () => {
      const res = await fetch(
        "https://redux-af7e5-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      //send state as request is successful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "sent request to database successfully",
          type: "successful",
        })
      );
      
    };
     try {
         await sendRequest();
       } catch (err) {
         dispatch(
           uiActions.showNotification({
             open: true,
             message: "sending request error",
             type: "error",
           })
         );
       }
   
  };
};
