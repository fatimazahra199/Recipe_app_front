import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useRecipeContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom"
import { FaShoppingCart, FaTimes } from "react-icons/fa";

const stripePromise = loadStripe(
  "pk_test_51N6dV5JWosKwdBLOCQak3mn12AZ4WGWDN9YGdGtN7j5L3qzwoLyn21pHW1XddFfEZ8D67chVkN25eYf1mZyJdy4J00LbCaQKK5"
);

const Cart = () => {
  const [state, dispatch] = useRecipeContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  
  const shoppingList = state.cart.map((item) => {
    return item.item;
  });

  const emailBody = shoppingList.join("%0D%0A");
  

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const orderedProducts = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        orderedProducts.push(item.item);
      }
    });

    getCheckout({
      variables: { products: orderedProducts },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          <FaShoppingCart />
        </span>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="close" onClick={toggleCart}>
        [<FaTimes />]
      </div>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <CartItem key={item} item={item} />
          ))}

          <div className="flex-row space-between ">
            <strong className="total">Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <div className="checkout">
                <Button onClick={submitCheckout}>Checkout</Button>{" "}
                <Button
                  href={`mailto:?subject=My Shopping List&body=${emailBody}`}
                >
                  Email
                </Button>
              </div>
            ) : (
              <span>
                <Link to="/login">(log in to check out) </Link>
               </span>
            )}
          </div>
        </div>
      ) : (
        <h3>You haven't added anything to your cart yet!</h3>
      )}
    </div>
  );
};

export default Cart;
