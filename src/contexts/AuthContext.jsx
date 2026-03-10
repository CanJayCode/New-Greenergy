import React, { createContext, useContext, useState, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authChecked, setAuthChecked] = useState(false);

    async function signup(email, password, displayName, organization) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Store profile in Firestore (non-blocking)
        const userProfile = {
            uid: user.uid,
            email: user.email,
            displayName,
            organization,
            createdAt: new Date().toISOString(),
            role: 'user'
        };

        // Don't wait for Firestore - do it in background
        setDoc(doc(db, "users", user.uid), userProfile).catch(err => {
            console.warn('Failed to store profile:', err);
        });
        
        // Set basic user data immediately
        setUserData(userProfile);
        
        return user;
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setAuthChecked(true);
            
            if (user) {
                // Set basic user data immediately from auth
                const basicUserData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || user.email?.split('@')[0] || 'User',
                };
                setUserData(basicUserData);
                
                // Load additional data from Firestore in background (non-blocking)
                const docRef = doc(db, "users", user.uid);
                getDoc(docRef)
                    .then(docSnap => {
                        if (docSnap.exists()) {
                            setUserData(docSnap.data());
                        }
                    })
                    .catch(err => {
                        console.warn('Could not load user profile:', err);
                        // Keep basic data if Firestore fails
                    });
            } else {
                setUserData(null);
            }
            
            // Set loading false immediately - don't wait for Firestore
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userData,
        authChecked,
        loading,
        signup,
        login,
        logout,
        resetPassword
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0d1a0d 0%, #051005 100%)" }}>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
