// src/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebase/firebase.config.js";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async ({ email, password, displayName, file }) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        let photoURL = null;

        if (file) {
            const storageRef = ref(storage, `users/${cred.user.uid}/${file.name}`);
            await uploadBytes(storageRef, file);
            photoURL = await getDownloadURL(storageRef);
        }

        await updateProfile(cred.user, {
            displayName: displayName || "",
            photoURL: photoURL || ""
        });

        setUser({ ...cred.user });
        return cred.user;
    };

    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = { user, loading, register, login, logout };
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
