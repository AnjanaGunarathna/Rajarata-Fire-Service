import React, { useEffect, useState } from 'react';
import "../addfeedback/add.css";
import { FaStar } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

const Edit = () => {

    const users = {
        fname: "",
        lname: "",
        email: "",
        feedback: "",
        rating: 4
    }

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const ratingChangeHandler = (index) => {
        setUser({ ...user, rating: index + 1 });
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/feedbackuser/getone/${id}`)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id])

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:4000/feedbackuser/update/${id}`, user)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" });
                navigate("/user");
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='background'>
        <div className='addUser'>
            <h1>Update Feedback</h1>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" value={user.fname} onChange={inputChangeHandler} id="fname" name="fname" autoComplete='off' placeholder='First Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" value={user.lname} onChange={inputChangeHandler} id="lname" name="lname" autoComplete='off' placeholder='Last Name' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={user.email} onChange={inputChangeHandler} id="email" name="email" autoComplete='off' placeholder='Email' />
                </div>
                <div className="form-group" style={{ display: 'flex', padding: '5px', alignItems: 'center' }}>
                    <label>Rating:</label>
                    {[...Array(5)].map((star, index) => {
                        const currentRate = index + 1;
                        return (
                            <label key={index} style={{ padding: '5px', display: 'flex', alignItems: 'center', marginRight: '5px', cursor: 'pointer' }} onClick={() => ratingChangeHandler(index)}>
                                <input type="radio" name="rate" style={{ display: 'none' }} />
                                <FaStar
                                    size={15}
                                    color={currentRate <= user.rating ? 'yellow' : 'white'}
                                    style={{ cursor: 'pointer' }}
                                />
                            </label>
                        );
                    })}
                </div>
                <div className="inputGroup">
                    <label htmlFor="feedback">Feedback</label>
                    <textarea value={user.feedback} onChange={inputChangeHandler} id="feedback" name="feedback" autoComplete='off' placeholder='Feedback' />
                </div>
                <div className="inputGroup">
                    <button type="submit">Update</button>
                </div>
            </form>
            <Link to={"/user"}>Back</Link>
        </div>
        </div>
    )
}

export default Edit;
