import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from "axios";
import toast from 'react-hot-toast';
import "./teamfeed.css";

const Teamfeed = () => {

    const users = {
        fname:"",
        lname:"",
        email:"",
        feedback:"",
        rating: 0,
        team: "" 
    };

    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    
    const handleRatingChange = (ratingValue) => {
        setUser({ ...user, rating: ratingValue });
    };

    const handleTeamChange = (e) => {
        setUser({ ...user, team: e.target.value });
    };

    const inputHandler = (e) =>{
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const submitForm = async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:4000/feedbackuser/create", user)
        .then((response)=>{
            toast.success(response.data.msg, { position: "top-right" });
            navigate("/user");
        })
        .catch(error => console.log(error));
    };

    return (
        <div className='background'>
        <div className='addUser'>
            <h1>Service Team Feedback Form</h1>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" onChange={inputHandler} id="fname" name="fname" autoComplete='off' placeholder='First Name' />
                </div>

                <div className="inputGroup">
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" onChange={inputHandler} id="lname" name="lname" autoComplete='off' placeholder='Last Name' />
                </div>
                
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={inputHandler}  id="email" name="email" autoComplete='off' placeholder='Email' />
                </div>

                <div className="form-group" style={{ display: 'flex', padding: '5px', alignItems: 'center' }}>
                    <label>Rating:</label>
                    {[...Array(5)].map((star, index) => {
                        const currentRate = index + 1;
                        return (
                            <label key={index} style={{ padding: '5px', display: 'flex', alignItems: 'center', marginRight: '8px' }}>
                                <input
                                    type="radio"
                                    name="rate"
                                    value={currentRate}
                                    style={{ display: 'none' }}
                                    onClick={() => handleRatingChange(currentRate)}
                                />
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
                    <label htmlFor="team">Select Team:</label>
                    <select id="team" name="team" onChange={handleTeamChange}>
                        <option value="">Select Team</option>
                        <option value="Team A">Team A</option>
                        <option value="Team B">Team B</option>
                        <option value="Team C">Team C</option>
                    </select>
                </div>

                <div className="inputGroup">
                    <label htmlFor="feedback">Feedback</label>
                    <textarea onChange={inputHandler} id="feedback" name="feedback" autoComplete='off' placeholder='Feedback' />
                </div>
                <div className="inputGroup">
                    <button type="submit">Submit</button>
                </div>
            </form>

            <Link to={"/feedbacks"}>Back</Link>
        </div>
        </div>
    );
};

export default Teamfeed;
