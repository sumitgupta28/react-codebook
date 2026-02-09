import { useEffect, useState } from "react"
import { useTitle } from "../../hook/useTitle"
import { DashboardCard } from "./components/DashboardCard"
import { DashboardEmpty } from "./components/DashboardEmpty"
import { getUserOrder } from "../../services"
import { toast } from "react-toastify"


export const DashboardPage = () => {
  useTitle('Dashboard')
  const [orders, setOrders] = useState([])
  useEffect(() => {
    async function getOrderDetails() {
      try {
        const orderData = await getUserOrder();
        setOrders(orderData);
      } catch (error) {
        toast.error(error.message, { closeButton: true, position: "bottom-center" });
      }

    }
    getOrderDetails();
  }, [])



  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
      </section>
      <section>
        {orders.length && orders.map((order) => (
          <DashboardCard key={order.id} order={order} />
        ))
        }
      </section>
      <section>
        {!orders.length && <DashboardEmpty />}
      </section>
    </main>
  )
}
