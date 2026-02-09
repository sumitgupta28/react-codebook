import { useTitle } from "../../hook/useTitle"
import { OrderSuccess } from "./components/OrderSuccess";
import { OrderFail } from "./components/OrderFail";
import { useLocation } from "react-router-dom";

export const OrderPage = () => {
  useTitle('Order ')
  const { state } = useLocation();
  useTitle('Order Page ')
  return (
    <main>
      {state.orderStatus ? <OrderSuccess data={state.data} /> : <OrderFail />}
    </main>
  )
}
