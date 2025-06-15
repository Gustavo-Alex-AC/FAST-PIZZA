import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, senha }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        senha,
      });
      const { token, usuario } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario)); // inclui tipo

      return { ...usuario, token }; // { id,nome,sobrenome,email,tipo, token }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.mensagem || "Erro ao fazer login"
      );
    }
  }
);

const initialState = {
  id: null,
  nome: "",
  sobrenome: "",
  email: "",
  tipo: "",           // <‑‑ novo
  token: "",
  isAuthenticated: false,
  status: "idle",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      Object.assign(state, initialState);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUserFromStorage(state, action) {
      const { id, nome, sobrenome, email, tipo, token } = action.payload;
      Object.assign(state, {
        id,
        nome,
        sobrenome,
        email,
        tipo,
        token,
        isAuthenticated: true,
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { id, nome, sobrenome, email, tipo, token } = action.payload;
        Object.assign(state, {
          id,
          nome,
          sobrenome,
          email,
          tipo,
          token,
          isAuthenticated: true,
          status: "succeeded",
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, setUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
