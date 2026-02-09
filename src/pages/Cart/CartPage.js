import { useTitle } from "../../hook/useTitle"
import { CartEmpty } from "./components/CartEmpty"
import { CartList } from './components/CartList'
import { useCart } from '../../context'

export const CartPage = () => {
  const { cartList, total } = useCart();
  useTitle(`Books Cart ${cartList.length}`)
  return (
    <main>
      {cartList.length ? <CartList cartList={cartList} total={total} /> : <CartEmpty />}
    </main>
  )
}