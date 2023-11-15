import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddContact = () => {
//Hooks to change the states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    const contacts = useSelector(state => state);

    const dispatch = useDispatch();
    const navigate = useNavigate();
//submit checking function
    const CheckSubmit = e => {
        e.preventDefault();

        const checkEmail = contacts.find(contact => contact.email === email && email)
        const checkNumber = contacts.find(contact => contact.number === parseInt(number) && number)

        if (!email || !number || !name) {
            return toast.warning("This Cant be empty");
        }

        if (checkEmail) {
            return toast.error("email already Exists!");
        }

        if (checkNumber) {
            return toast.error("number already Exists!");
        }

        const data = {
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            number
        }

        dispatch({ type: 'ADD_CONTACT', payload: data });
        toast.success("Added successfully!")
        navigate('/');
    };

    return (
        <div className='container'>
            <h2 className=' text-center fw-bold mx-2'>Add Contacts</h2>
            <div className='row'>
                <div className='col-md-5 shadow mx-auto p-4'>
                    <form className='text-center' onSubmit={CheckSubmit}>
                        <div className='form-group mb-2'>
                            <input type='text' placeholder='Name' className='form-control'
                                value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='form-group mb-2'>
                            <input type='email' placeholder='Email' className='form-control'
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='form-group mb-2'>
                            <input type='number' placeholder='Phone Number' className='form-control'
                                value={number} onChange={e => setNumber(e.target.value)} />
                        </div>
                        <div className='form-group mb-2'>
                            <input type='submit' value='Add Contact' className='btn btn-block btn-danger' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddContact;