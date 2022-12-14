import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../components/Homepage/Cart"
export default configureStore({
  reducer: {
    cart: cartReducer
  },
})