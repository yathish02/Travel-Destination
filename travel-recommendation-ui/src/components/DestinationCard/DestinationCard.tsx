import React from 'react';
import './DestinationCard.css';
import { DestinationCardProps } from '../../Models/interfaces';

const DestinationCard: React.FC<DestinationCardProps> = ({ name }) => {
  const imageUrl = "https://hikerwolf.com/wp-content/uploads/2020/03/WhatsApp-Image-2020-03-31-at-3.18.20-PM-1.jpeg";
  return (
    <div className="destination-card">
      <img src={imageUrl} alt={name} className="destination-image" />
      <div className="destination-card-content">
        <h3 className="destination-card-title">{name}</h3>
      </div>
    </div>
  );
};

export default DestinationCard;
