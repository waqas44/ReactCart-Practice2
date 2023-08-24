import { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const updatedTotalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const itemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const itemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={itemRemoveHandler.bind(null, item.id)}
          onAdd={itemAddHandler.bind(null, item)}
        />

        // <li>{item.name}</li>
      ))}
    </ul>

    // <ul className={classes["cart-items"]}>
    //   {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map((item) => (
    //     <li>{item.name}</li>
    //   ))}
    // </ul>
  );

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{updatedTotalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
