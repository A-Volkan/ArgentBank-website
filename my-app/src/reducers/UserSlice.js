import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// action qui permet de maintenir la connexion même après un rafraîchissement de la page en cas de rememberMe cocher
export const checkRememberMe = () => async (dispatch) => {
    const storedToken = localStorage.getItem('token');
    const rememberMe = localStorage.getItem('rememberMe') === 'true'; // Vérifiez l'option "Remember Me"
    // verifie si aucun token dans localstorage et rememberme non coché
    if (!storedToken && !rememberMe) {
        const sessionToken = sessionStorage.getItem('token');
        if (sessionToken) {
            sessionStorage.removeItem('token');
        }
    }

    console.log('Stored token:', storedToken);
    // verifie si un token est dans localstorage ou rememberme coché
    if (storedToken || rememberMe) {
        dispatch(setToken(storedToken)); // met a jours le token dans redux
        console.log('Token chargé dans Redux:', storedToken);
    } else { // aucun token present deco de l'user
        dispatch(logout());
    }
};



// Action asynchrone pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk(
    'user/login', async ({ email, password, rememberMe }) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/v1/user/login",
                {
                    email: email,
                    password: password,
                }
            );
            console.log('Réponse de connexion:', response.data);
            // Réception du token dans la réponse
            if (response.status === 200) {
                const token = response.data.body.token;

                // Stockez le token dans le stockage approprié (localStorage ou sessionStorage)
                if (rememberMe) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('isLoggedIn', 'true');
                } else {
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('isLoggedIn', 'true');
                }
                console.log('Token enregistré dans le stockage:', token); // Ajoutez cette ligne pour vérifier que le token est correctement enregistré

                // Retournez directement un objet (regle le probleme de token undefined de l'etat car il recevait une fonction avant)

                return {
                    token: token,
                };
            } else {
                throw new Error('Réponse de connexion invalide');
            }
        } catch (error) {
            throw error;
        }
    }
);

//action asynchrone pour récupérer le profil de l'utilisateur
export const fetchUserProfile = createAsyncThunk(
    'user/fetchUserProfile', async (token) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/user/profile", {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                const { firstName, lastName, userName } = response.data.body;

                console.log("profil d'utilisateur récupéré:", response.data.body); //verif le profil recup

                return {
                    firstName,
                    lastName,
                    userName,
                };
            } else {
                console.error("Erreur lors de la récupération du profil de l'utilisateur : ", response);
                throw new Error("Impossible de récupérer le profil de l'utilisateur.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            throw error;
        }
    });

// action async pour mettre a jours le nom d'utilisateur
export const updateUserName = createAsyncThunk(
    'user/updateUserName', async ({ userName, token }) => {
        try {
            const response = await axios.put(
                "http://localhost:3001/api/v1/user/profile",
                { userName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                return userName;
            } else {
                throw new Error("Impossible de mettre a jours le nom d'utilisateur");
            }
        } catch (error) {
            throw error;
        }
    }
);

//slice pour gerer l'etat de l'user
const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: {
            firstName: "",
            lastName: "",
            userName: "",
        },
        error: null,
        token: null,
    },
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.user = null;
            state.error = null;
            state.token = null;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log("reponse du server:", action.payload);
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                state.token = action.payload.token;
                console.log("token:", state.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
                console.log("Erreur de connexion:", action.error);
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.error.message;
            })
            .addCase(updateUserName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                state.loading = false;
                state.user.userName = action.payload;
                state.error = null;
            })
            .addCase(updateUserName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectToken = (state) => state.user.token;
export const { logout } = userSlice.actions;
export const { setToken } = userSlice.actions;
// export const selectError = (state) => state.user.error;
export default userSlice.reducer;