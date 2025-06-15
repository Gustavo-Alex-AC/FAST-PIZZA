// src/BootstrapAuth.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setUserFromStorage,
  finishHydration,
} from "./features/user/userSlice";

export default function BootstrapAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const raw   = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (raw && token) {
      dispatch(setUserFromStorage({ ...JSON.parse(raw), token }));
    } else {
      dispatch(finishHydration());
    }
  }, [dispatch]);

  return null;
}
