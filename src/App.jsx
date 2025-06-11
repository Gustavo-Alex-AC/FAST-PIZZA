import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";

import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";

import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { action as updateOrderAction } from "./features/order/UpdateOrder";
import { action as cancelOrderAction } from "./features/order/CancelOrderAction";
import { fetchCartFromServer } from "./features/cart/CartSlice";
import CreateUser from "./features/user/CreateUser";
import FormLogin from "./ui/FormLogin";
import Edit from "./features/user/Edit";

const router = createBrowserRouter([
  // 🔹 Rota sem layout
  {
    path: "/user",
    element: <CreateUser />,
    errorElement: <Error />,
  },
  {
    path: "/edit",
    element: <Edit />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <FormLogin />,
    errorElement: <Error />,
  },

  // 🔹 Rotas com layout AppLayout
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
        loader: fetchCartFromServer,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
      {
        path: "/order/:orderId/cancel",
        method: "PATCH",
        action: cancelOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
