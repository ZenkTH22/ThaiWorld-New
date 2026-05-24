import React from 'react';
import { formatNumber } from '../utils/formatters';
import './StatCard.css';

const StatCard = ({ title, value, icon: Icon, color = "cyan", trend }) => {
  return (
    <div className={`stat-card glass-panel accent-${color}`}>
      <div className="stat-card-header">
        <h3 className="stat-title">{title}</h3>
        {Icon && <Icon className={`stat-icon text-${color}`} size={24} />}
      </div>
      
      <div className="stat-value-container">
        <span className={`stat-value text-${color}`}>
          {formatNumber(value)}
        </span>
      </div>
      
      {trend && (
        <div className="stat-trend">
          <span className="trend-label">Today: </span>
          <span className={`trend-value text-${color}`}>
            +{formatNumber(trend)}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
