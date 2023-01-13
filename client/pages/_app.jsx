import React, { useEffect, useState } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "../styles/globals.css";
import { store } from "../stores/store";
import { Provider } from "react-redux";
import "../styles/NavBar/NavBar.css";
import "../styles/NavBar/DashBoardUser.css";
import axios from "axios";
import { ContextProvider } from "../contexts/ContextProvider";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Mgo+DSMBaFt/QHRqVVhjVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jSH9Sd0RgUXted3xWRg==;Mgo+DSMBPh8sVXJ0S0J+XE9HflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31Td0RiWH5deHBVQWlUUQ==;ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRiWH5fc3xRRmhdVEQ=;OTIxODgyQDMyMzAyZTM0MmUzMGp0cERjMktTYVYzUDJJVHdBSi96Tm5UODJDSVlnTHRHLzBpQjFBaXNoZ0E9;OTIxODgzQDMyMzAyZTM0MmUzMFZXQmQ2WkZUMXNUa3d0cW15eFN3ekU5ZDFUSjZWT2VQSHc4YXA5d2ZJV0k9;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdUViWH5fcXddQmBUWEJ2;OTIxODg1QDMyMzAyZTM0MmUzMEpUVmNCR2NjWmpIZTRxbzZTRHNybXEyN2JNb3NKODNDMFdieUhFNWtNZFU9;OTIxODg2QDMyMzAyZTM0MmUzME5nSjJYRkxVZGxaYlJSenpLd0lTbGo1bEJuS2h2N3RvZTRlUVZaMVVnZ009;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRiWH5fc3xRRmlbUUQ=;OTIxODg4QDMyMzAyZTM0MmUzMFlwMWJGOFB5TUtLMFJ2eGFTWWNBUTltTTlyM3Y1OGg3SVpBY1JuUXFYcDg9;OTIxODg5QDMyMzAyZTM0MmUzMEQxZm93WG1rMjNpd25yQUNScFFMclh2cStoMEhwdWNPcEc1R2p5aDBTeVU9;OTIxODkwQDMyMzAyZTM0MmUzMEpUVmNCR2NjWmpIZTRxbzZTRHNybXEyN2JNb3NKODNDMFdieUhFNWtNZFU9"
);

axios.defaults.baseURL = "http://localhost:3001/";

const clientId = process.env.AUHT0_CLIENT_ID;

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem("cart")) ?? [];
    setCart(carrito);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    if (cart.some((unidad) => unidad._id === product._id)) {
      const carritoActualizado = cart.map((unidad) => {
        if (unidad._id === product._id) {
          unidad.cantidad = product.cantidad;
        }
        return unidad;
      });
      console.log(carritoActualizado);
      setCart(carritoActualizado);
    } else {
      setCart([...cart, product]);
    }
  };

  const deleteCart = (id) => {
    const buscar = cart.filter((uno) => uno._id !== id);
    setCart(buscar);
  };

  const deleteAllCart = () => {
    setCart([]);
  };
  return (
    <ContextProvider>
      <UserProvider client_id={clientId}>
        <Provider store={store}>
          <Component
            {...pageProps}
            cart={cart}
            addToCart={addToCart}
            deleteCart={deleteCart}
            deleteAllCart={deleteAllCart}
          />
        </Provider>
      </UserProvider>
    </ContextProvider>
  );
}
