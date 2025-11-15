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


    const register = async ({ email, password, displayName, photoURL }) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(cred.user, {
            displayName: displayName || "",
            photoURL: photoURL || "",
        });

        setUser({
            uid: cred.user.uid,
            email: cred.user.email,
            displayName: displayName || "",
            photoURL: photoURL || "",
            role: "user", // default role
        });

        return cred.user;
    };


    const login = async (email, password) => {
        const cred = await signInWithEmailAndPassword(auth, email, password);

        setUser({
            uid: cred.user.uid,
            email: cred.user.email,
            displayName: cred.user.displayName || "",
            photoURL: cred.user.photoURL || "",
            role: "user", // later fetch from backend for admin
        });

        return cred.user;
    };


    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName || "",
                    photoURL: currentUser.photoURL || "",
                    role: "user", // default, or fetch from backend
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
