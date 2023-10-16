import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, selectToken } from '../reducers/UserSlice';
import EditUserName from './EditUserName';


const welcomeBack = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (token && !user.firstName && !user.lastName) {
            // Si le token est present et que le nom et le prenom ne sont pas chargés
            dispatch(fetchUserProfile(token));
        }
    }, [user, token]);


    const { userName } = user || {};
    const [Editing, setEditing] = useState(false);

    return (
        <div className="header">
            {Editing ? (
                <EditUserName setEditing={setEditing} />
            ) : (
                <>
                    <h1>Welcome back<br />{userName}!</h1>
                    <button className="edit-button" onClick={() => setEditing(true)}>Edit Name</button>
                </>)}
        </div>
    )
};

export default welcomeBack