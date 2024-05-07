import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./feedbackdashboard.css";
import { jsPDF } from "jspdf"; //PDF
import "jspdf-autotable";  // PDF
import logo from "../../Assets/2.png"; 


const Feedbackdashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/feedbackuser/getall");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchData();
    }, []);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:4000/feedbackuser/delete/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    //Generate Part
    
    const generatePDF = () => {
      const doc = new jsPDF();

      const logoImg = new Image() 
        logoImg.src = logo;
        logoImg.onload = () => {
            const imgWidth = 12; // Adjust the width of the logo as needed
            const imgHeight = (logoImg.height * imgWidth) / logoImg.width;
            doc.addImage(logoImg, 'PNG', 60, 2, imgWidth, imgHeight);
  
      // Add title
      doc.setTextColor("black");
      doc.setFontSize(20);
      doc.setFont("bold");
      doc.text("Feedback Report 2024", 105, 10, { align: "center" });
  
      // Table headers
      const headers = [
          'S.No.',
          'User Name',
          'Email',
          'Rating',
          'Team / Service',
          'Feedback',
          'Register / Unregister',
          
      ];
  
      // AutoTable options
      const tableOptions = {
          startY: 20, // Start position for the table
          head: [headers], // Include table headers
          styles: {
              cellPadding: 2,
              fontSize: 8,
              valign: 'middle', // vertical alignment
              halign: 'center', // horizontal alignment
              textColor: [0, 0, 0], // Text color
              fillColor: [255, 112, 112] // Fill color
          },
      };
  
      // Table data (user details)
      const userData = users.map((user, index) => [
          index + 1,
          `${user.fname} ${user.lname}`,
          user.email,
          user.rating,
          user.team,
          user.feedback,
          "Register",
         
      ]);
  
      // Add table data to options
      tableOptions.body = userData;
  
      // Add table
      doc.autoTable(tableOptions);
  
      // Save PDF
      doc.save("users.pdf");
  };
  
    };


    return (
        <div className='background'>
            <div className='navbar1'>
                <Link to={"/feedbacks"} className='navlink'>Home</Link>
                <Link to={"/user"} className='navlink'>User</Link>
            </div>
        <div className='userTable'>
            <h1 className='name'>Admin Dashboard</h1>
            <button className="generatePDFButton1" onClick={generatePDF}>Generate Report</button>
            <table id="userTable" border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Rating</th>
                        <th>Team / Service</th>
                        <th>Feedback</th>
                        <th>Register / Unregister</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.fname} {user.lname}</td>
                            <td>{user.email}</td>
                            <td>{user.rating}</td>
                            <td>{user.team}</td>
                            <td>{user.feedback}</td>
                            <td>{"Rgisterd User"}</td>
                            <td className='actionButtons' >
                                <button onClick={() => deleteUser(user._id)}>
                                <i class="fa-solid fa-xmark"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default Feedbackdashboard;
