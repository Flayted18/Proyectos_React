import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./icons";
import "./Cart.css"


export const Cart = () => {
    const cartCheckBoxId = useId()
  return (
    <>
        <label className="cart-button" htmlFor={cartCheckBoxId}>
            <CartIcon />
        </label>
        <input id={cartCheckBoxId} type="checkbox" hidden />

        <aside className="cart">
            <ul>
                <li>
                    <img 
                        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.numisfila.com%2Fnumismatica-venezuela%2F--ventas-y-subastas-online-de-monedas-antiguas-de-venezuela--%2F%3Amoneda-oro-5-venezolanos-1875%3A%2F&psig=AOvVaw0VELAzfVilPBfVMhUtS4SV&ust=1762644832289000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNCR5euZ4ZADFQAAAAAdAAAAABAE"
                        alt="MacBook" 
                    />
                    <div>
                        <strong>Iphone</strong> - 1099$
                    </div>

                    <footer>
                        <small>
                            Qty: 1
                        </small>
                        <button> + </button>
                    </footer>
                </li>
            </ul>

            <button></button>


        </aside>

    </>
  )
}
