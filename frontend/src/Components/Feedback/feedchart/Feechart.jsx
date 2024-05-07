import React, { useEffect, useState } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./feechart.css";

const Feechart = () => {
   const [userData, setUserData] = useState([]);

   useEffect(() => {
      const fetchData = async () => {
         const response = await axios.get("http://localhost:4000/feedbackuser/getall");
         setUserData(response.data);
      }
      fetchData();
   }, []);

   // Transforming data to match VictoryBar requirements and sorting by rating
   const chartData = userData.map((user, index) => ({ name: user.fname, team: user.team, rating: user.rating, index }));
   chartData.sort((a, b) => a.rating - b.rating); // Sort by rating in ascending order

   // Function to dynamically assign alternating colors
   const getBarColor = (index) => {
      const colors = ["#ff0000", "#0000ff", "#00ff00"]; // Red, Blue, Green
      return colors[index % colors.length];
   };

   // Function to group data by team name and calculate average rating
   const groupDataByTeam = () => {
      const groupedData = {};
      userData.forEach(user => {
         if (!groupedData[user.team]) {
            groupedData[user.team] = { ratings: [user.rating] };
         } else {
            groupedData[user.team].ratings.push(user.rating);
         }
      });

      // Calculate average rating for each team
      Object.keys(groupedData).forEach(team => {
         const ratings = groupedData[team].ratings;
         const averageRating = ratings.reduce((total, rating) => total + rating, 0) / ratings.length;
         groupedData[team].averageRating = averageRating.toFixed(2);
      });

      return groupedData;
   };

   const groupedUserData = groupDataByTeam();

   return (
      <div className='background'>
         <div className='navbar'>
            <Link to={"/feedbacks"} className='navlink'>Home</Link>
            <Link to={"/user"} className='navlink'>User</Link>
         </div>
         <div className='chart-container1'>
            <h1 className="chart-title1">Feedback Bar Chart</h1>
            <VictoryChart
               theme={VictoryTheme.material}
               domainPadding={20}
               className="victorychart1"
               width={550}
               height={450} 
            >
               <VictoryAxis
                  tickValues={chartData.map((data) => data.index + 1)}
                  tickFormat={chartData.map((data) => `${data.name}\n(${data.team})`)} // Concatenate name and team
                  style={{
                     tickLabels: {
                        angle: 0,
                        fontSize: 6,
                        dy: -150,
                        fill: "white"
                     }
                  }}
                  labelPlacement="vertical"
                  className="xaxis"
               />
               <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => (`${x}`)}
                  style={{
                     tickLabels: {
                        fontSize: 8,
                        fill: "white" // Change text color to black
                     }
                  }}
                  className="yaxis"
               />
               <VictoryBar
                  data={chartData}
                  x="name"
                  y="rating"
                  style={{
                     data: {
                        fill: (d) => getBarColor(d.index)
                     }
                  }}
                  className="victorybar"
                  barWidth={20}
                  barRatio={10}
               />
            </VictoryChart>
         </div>
         <div>
         <h1 className="chart-title2">Feedback Average Table</h1>
            <table id="userTable1" border={1} cellPadding={10} cellSpacing={0}>
               <thead>
                  <tr>
                     <th>No.</th>
                     <th>Team</th>
                     <th>Average Rating</th>
                  </tr>
               </thead>
               <tbody>
                  {Object.keys(groupedUserData).map((team, index) => (
                     <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{team}</td>
                        <td>{groupedUserData[team].averageRating}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default Feechart;
