import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return [];
  }
}

const storeInLocalStorage = (data) => {

  localStorage.setItem('cart', JSON.stringify(data))
}

const cartSlice = createSlice({
  name: 'cart',
  
  initialState: {
    data:[],
    // totalItems: 0,
    // totalAmount: 0,
    // deliveryCharge: 1000
  },
  reducers: {
    addToCart(state, action) {

      const tempItem = state.data.find(item => item.id === action.payload.id);
      if (tempItem) {
        const tempCart = state.data.map(item => {
          if (item.id === action.payload.id) {
            let newQty = item.qty + action.payload.qty;
            let newTotalPrice = newQty * parseInt(item.unitPrice);
            return { ...item, qty: newQty, totalPrice: newTotalPrice};
          } else {
            return item;
          }
        });
        state.data = tempCart;
        // storeInLocalStorage(state.data);
      } else {
        state.data.push(action.payload);
        // storeInLocalStorage(state.data);
      }
    },
    removeFromCart(state, action) {
      const tempCart = state.data.filter(item => item.id !== action.payload);
      state.data = tempCart;
      // storeInLocalStorage(state.data);
      console.log('====', tempCart);
    },
    clearCart(state) {
      state.data = [];
      // storeInLocalStorage(state.data);
    },
    toggleCartQty(state, action) {
      const tempCart = state.data.map(item => {
        if (item.id === action.payload.id) {
          let tempQty = item.qty;
          let tempTotalPrice = item.totalPrice;
          if (action.payload.type === "INC") {
            tempQty++;
            tempTotalPrice = tempQty * item.price;
          }
          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.price;
          }
          return { ...item, qty: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });
      state.data = tempCart;
      // storeInLocalStorage(state.data);
    },
    getCartTotal(state) {
      state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
        return cartTotal += cartItem.totalPrice;
      }, 0);
      state.totalItems = state.data.length;
    }
  }
});

export const { addToCart, removeFromCart, toggleCartQty, getCartTotal, clearCart } = cartSlice.actions;
export default cartSlice.reducer;