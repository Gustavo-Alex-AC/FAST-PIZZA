import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import { fetchCartFromServer } from "../features/cart/CartSlice";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartFromServer());
  }, [dispatch]);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
