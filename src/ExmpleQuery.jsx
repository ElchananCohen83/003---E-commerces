import React, { useEffect } from "react";
import { collection, getDocs, where, orderBy, query } from "firebase/firestore";
import { db } from './firebase-config.js';

export default function ExmpleQuery() {
    async function filterData() {
        const dataRef = collection(db, 'products');

        const myQuery = query(
            dataRef,
            where('price', '>=', 1), // price should be a number, not a string
            orderBy('name', 'asc')
        );

        try {
            const querySnapshot = await getDocs(myQuery);
            const docs = querySnapshot.docs.map(doc => doc.data());
            console.log(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    }

    useEffect(() => {
        filterData();
    }, []);

    return (
        <div>ExmpleQuery</div>
    );
}
