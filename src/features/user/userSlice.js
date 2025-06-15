import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, senha }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          senha,
        },
      );

      const { token, usuario } = response.data;
      console.log("Usuário recebido da API:", usuario);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      return { ...usuario, token }; // inclui tipo
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.mensagem || "Erro ao fazer login",
      );
    }
  },
);

const initialState = {
  id: null,
  nome: "",
  sobrenome: "",
  email: "",
  tipo: "",            // 👈 Adicionado
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
      state.id = null;
      state.nome = "";
      state.sobrenome = "";
      state.email = "";
      state.tipo = "";          // 👈 Limpar tipo também
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUserFromStorage(state, action) {
      const { id, nome, sobrenome, email, tipo, token } = action.payload;
      state.id = id;
      state.nome = nome;
      state.sobrenome = sobrenome;
      state.email = email;
      state.tipo = tipo;        // 👈 Setar tipo
      state.token = token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { id, nome, sobrenome, email, tipo, token } = action.payload;
        state.id = id;
        state.nome = nome;
        state.sobrenome = sobrenome;
        state.email = email;
        state.tipo = tipo;      // 👈 Salvar tipo no estado
        state.token = token;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      }),
});

export const { logout, setUserFromStorage } = userSlice.actions;
export default userSlice.reducer;
