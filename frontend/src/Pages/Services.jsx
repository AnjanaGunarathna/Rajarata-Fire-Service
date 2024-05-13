import React from 'react';
import './CSS/Services.css';

const services = [
  {
    title: "All types of Fire Extinguishers",
    description: "Portable and Mobile of Dry Chemical Powder, Carbon Dioxide, Foam, Water.,Fire Hose Reels and Cabinets,Fire Hydrants,Sprinkler System,Fire Alarm System,Fire Detection System,Fire Detection System,Foam Flooding System,Co2 Fire Extinguisher (FLOODING) System"
  },
 
  {
    title: "Installation",
    description: "We design, supply, install, test, and commission total fire safety and security solutions on land, sea, and air. Our solutions range from fire alarm systems to suppression systems, deluge systems sprinkler systems, cooking facility protection, and more."
  },
  {
    title: "Training",
    description: "We provide first aid fire & safety training and demonstrations on how to identify and use various types of fire extinguishers. Our training is specially designed to meet clients' operational needs with a flexible timetable. Upon completion, participants are awarded certificates issued by the Institution of Environmental Safety Officers. The certificates are accepted as a first-level qualification in health and safety."
  },
  {
    title: "Maintenance",
    description: "We service and maintain the fire equipment we install on a planned, regular basis. We rei upgrade existing fire systems installed by us and routinely carry out regular inspections of all extinguishers, and spare gas cartridges."
  }
];

const OverServices = () => {
  return (
    <div className="over-services">
      <h1>Our Main Services</h1>
      <div className="services-container">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverServices;
