import React from "react";
import { useRecipeContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { FaTrash } from "react-icons/fa";

const CartItem = ({ item }) => {
  const [, dispatch] = useRecipeContext();

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      item: item.item,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        item: item.item,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        item: item.item,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (
    <div className="shopping-list-item">
      <div className="item-details">
        <div className="item-title-price">
          <div>{item.item}</div>
          <div>${item.price}</div>
        </div>
        <div className="item-quantity">
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
        </div>
        <span
          role="img"
          aria-label="trash"
          onClick={() => removeFromCart(item)}
          className="trash-button"
        >
          <FaTrash />
        </span>
      </div>
    </div>
  );
};

export default CartItem;
