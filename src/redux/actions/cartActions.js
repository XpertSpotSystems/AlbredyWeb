export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const RE_ORDER_CART = "RE_ORDER_CART";

//add to cart
export const addToCart = (
  item,
  // user_id,
  // addToast,
  quantityCount,
  selectedProductColor,
  selectedProductSize,
) => {
  // console.log('item_in_redux_action ::', item)
  return dispatch => {
      dispatch({
        type: ADD_TO_CART,
        // user_id: user_id,
        payload: {
          ...item,
          quantity: quantityCount,
          selectedProductColor: selectedProductColor
            ? selectedProductColor
            : item.selectedProductColor
            ? item.selectedProductColor
            : null,
          selectedProductSize: selectedProductSize
            ? selectedProductSize
            : item.selectedProductSize
            ? item.selectedProductSize
            : null
        }
      });
  };
};

// ReOrderCart
export const ReOrderCart = (
  item
) => {
  console.log('item_in_redux_action ::', item)
  return dispatch => {
      dispatch({
        type: RE_ORDER_CART,
        payload: {
          ...item,
        }
      });
  };
};

//decrease from cart
export const decreaseQuantity = (item) => {
  return dispatch => {
    // if (addToast) {
    //   addToast("Item Decremented From Cart", {
    //     appearance: "warning",
    //     autoDismiss: true
    //   });
    // }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
export const deleteAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
// export const cartItemStock = (item, color, size) => {
//   if (item.stock) {
//     return item.stock;
//   } else {
//     return item.variation
//       .filter(single => single.color === color)[0]
//       .size.filter(single => single.name === size)[0].stock;
//   }
// };

export const cartItemStock = (item) => {
    if (item.stock) {
      return item.stock;
    } else {
      return item.variation;
        // .filter(single => single.color === color)[0]
        // .size.filter(single => single.name === size)[0].stock;
    }
  };
