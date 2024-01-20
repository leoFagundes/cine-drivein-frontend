import style from "./AdminOrders.module.scss";
import Admin from "../../Components/Admin";

export default function AdminOrders() {
  return (
    <Admin>
      <h2>Orders</h2>
      <section className={style.ordersContainer}>

      </section>
    </Admin>
  )
}
