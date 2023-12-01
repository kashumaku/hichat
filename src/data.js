
import { useEffect, useState } from 'react'
import { db } from './firebase'
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore'


//fetching users
export const useGetUsers = () => {

    const [users, setUsers] = useState([])
    const userCollection = collection(db, "users")
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getDocs(userCollection);
            setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            // console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }
        fetchUsers()

    }, [])
    return (users)
}

//Fetching messages
export const useGetMessages = () => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const messageCollection = collection(db, 'messages');
        const q = query(messageCollection, orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messageData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setMessages(messageData);

        }, (error) => {
            console.log('Error getting real-time updates: ', error);
        });
        return () => {
            unsubscribe(); // Unsubscribe when the component is unmounted or the dependency changes
        };
    }, []);

    return messages
}
