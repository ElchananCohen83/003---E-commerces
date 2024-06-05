import React, { createContext, useEffect, useState } from 'react';
import { db } from '../firebase-config.js';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

// Create the context
export const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Register user function
    const handleRegister = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                console.log('User registered');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    };

    // Login user function
    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                console.log('User logged in');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    };

    // Handle input change
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    // Fetch authenticated user
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(`User ID: ${user.uid}`);
                console.log('User is signed in');
            } else {
                console.log('User is signed out');
            }
        });
        return () => unsubscribe();
    }, []);

    // Function to add a user
    const addUser = async (user) => {
        const docRef = await addDoc(collection(db, 'users'), user);
        setUsers(prevUsers => [...prevUsers, { id: docRef.id, ...user }]);
    };

    // Function to get all users
    const getAllUsers = async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersList);
        return usersList;
    };

    // Function to delete a user by id
    const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id));
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

    return (
        <UserContext.Provider value={{ addUser, getAllUsers, deleteUser, handleRegister, handleLogin, handleOnChange, email, password }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
