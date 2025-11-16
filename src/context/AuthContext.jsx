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

    // Register function
    const register = async ({ email, password, displayName, photoURL }) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(cred.user, {
            displayName: displayName || "",
            photoURL: photoURL || "",
        });

        const newUser = {
            uid: cred.user.uid,
            email: cred.user.email,
            displayName: displayName || "",
            photoURL: photoURL || "",
            role: "admin", // ✅ treat everyone as admin
        };

        setUser(newUser);
        return newUser;
    };

    // Login function
    const login = async (email, password) => {
        const cred = await signInWithEmailAndPassword(auth, email, password);

        const loggedInUser = {
            uid: cred.user.uid,
            email: cred.user.email,
            displayName: cred.user.displayName || "",
            photoURL: cred.user.photoURL || "",
            role: "admin", // ✅ everyone is admin
        };

        setUser(loggedInUser);
        return loggedInUser;
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    // Track auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName || "",
                    photoURL: currentUser.photoURL || "",
                    role: "admin", // ✅ treat everyone as admin
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
