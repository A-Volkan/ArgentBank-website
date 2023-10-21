import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserName, selectToken } from '../reducers/UserSlice';

const EditUserName = ({ setEditing }) => {
    const [newUserName, setNewUserName] = useState('');
    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const { firstName, lastName } = useSelector((state) => state.user.user);

    // useEffect(() => {
    //     setNewUserName(`${firstName} ${lastName}`)
    // }, [firstName, lastName])


    const handleUpdate = () => {
        dispatch(updateUserName({ userName: newUserName, token }));
        setEditing(false);
    }

    const handleCancel = () => {
        setNewUserName(`${firstName} ${lastName}`)
        setEditing(false);
    }


    return (
        <div className='EditUserName-form'>
            <h2>Edit User Name</h2>
            <div>
                <label htmlFor='username'>User name:</label>
                <input type='text' id='username' placeholder='Username' value={newUserName} onChange={(event) => setNewUserName(event.target.value)} />
            </div>
            <div>
                <label htmlFor='firstname'>First Name:</label>
                <input type='text' id='firstname' placeholder='Firstname' value={firstName} disabled className='text_input' />
            </div>
            <div>
                <label htmlFor='lastname'>Last Name:</label>
                <input type='text' id='lastname' placeholder='Lastname' value={lastName} disabled className='text_input' />
                <div className='button-container'>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditUserName;