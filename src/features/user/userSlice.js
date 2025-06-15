// src/features/user/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* ------------ THUNKS ------------ */
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, senha }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        senha,
      });

      const { token, usuario } = res.data;

      // persiste no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      return { ...usuario, token }; // inclui o campo `tipo`
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.mensagem || "Erro ao fazer login",
      );
    }
  },
);

/* ------------ STATE ------------ */
const initialState = {
  id: null,
  nome: "",
  sobrenome: "",
  email: "",
  tipo: "",      // <– cliente | admin
  token: "",
  isAuthenticated: false,

  status: "idle",
  error: "",

  hydrated: false, // <- indica se já verificamos localStorage
};

/* ------------ SLICE ------------ */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      Object.assign(state, initialState, { hydrated: true });
      localStorage.clear();
    },

    // chamado pelo BootstrapAuth quando EXISTE user no storage
    setUserFromStorage(state, action) {
      Object.assign(state, {
        ...action.payload,      // id,nome,sobrenome,email,tipo,token
        isAuthenticated: true,
        status: "succeeded",
        hydrated: true,         // ✅ terminamos a hidratação
      });
    },

    // chamado pelo BootstrapAuth quando NÃO existe user no storage
    finishHydration(state) {
      state.hydrated = true;    // ✅ evita redirecionamento precoce
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        Object.assign(state, {
          ...action.payload,      // id, nome, tipo, token…
          isAuthenticated: true,
          status: "succeeded",
          hydrated: true,
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error  = action.payload;
      }),
});

export const {
  logout,
  setUserFromStorage,
  finishHydration,
} = userSlice.actions;

export default userSlice.reducer;
