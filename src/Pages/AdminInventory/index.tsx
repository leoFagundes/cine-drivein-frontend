import style from "./AdminInventory.module.scss";
import Admin from "../../Components/Admin";

export default function AdminInventory() {
  return (
    <Admin>
      <h2>Inventory</h2>
      <section className={style.inventoryContainer}>

      </section>
    </Admin>
  )
}
