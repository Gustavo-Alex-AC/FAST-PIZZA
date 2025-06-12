import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";
import { fetchCartFromServer } from "../features/cart/CartSlice";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(fetchCartFromServer(userId));
    }
  }, [dispatch, userId, isAuthenticated]);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
