// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ✅ Register with photoURL (no file upload)
    const register = async ({ email, password, displayName, photoURL }) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);

        // Update Firebase profile
        await updateProfile(cred.user, {
            displayName: displayName || "",
            photoURL: photoURL || "",
        });

        // Update local state
        setUser({
            ...cred.user,
            displayName: displayName || "",
            photoURL: photoURL || "",
        });

        return cred.user;
    };

    // ✅ Login function
    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    // ✅ Logout function
    const logout = () => signOut(auth);

    // ✅ Keep user logged in on reload
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = { user, loading, register, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
