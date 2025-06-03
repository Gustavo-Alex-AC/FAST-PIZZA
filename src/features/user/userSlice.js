import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { getAddress } from "../../services/apiGeocoding"; // ❌ deixamos geocoding comentado

// function getPosition() {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// }

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

      // Armazenar no localStorage também (opcional)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));

      return { ...usuario, token };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.mensagem || "Erro ao fazer login",
      );
    }
  },
);

// ❗ Deixamos esse fetchAddress comentado, como você pediu
// export const fetchAddress = createAsyncThunk(
//   "user/fetchAddress",
//   async function () {
//     const positionObj = await getPosition();
//     const position = {
//       latitude: positionObj.coords.latitude,
//       longitude: positionObj.coords.longitude,
//     };

//     const addressObj = await getAddress(position);
//     const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//     return { position, address };
//   },
// );

const initialState = {
  id: null,
  nome: "",
  email: "",
  token: "",
  isAuthenticated: false,
  status: "idle",
  error: "",
  // position: {},
  // address: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.id = null;
      state.nome = "";
      state.email = "";
      state.token = "";
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUserFromStorage(state, action) {
      const { id, nome, email, token } = action.payload;
      state.id = id;
      state.nome = nome;
      state.email = email;
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
        const { id, nome, email, token } = action.payload;
        state.id = id;
        state.nome = nome;
        state.email = email;
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
