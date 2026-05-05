import React from "react";
import "./QuickAddPopup.css"; // Add styling

const QuickAddPopup = ({ show, onClose, onSelectSize }) => {
  if (!show) return null; // Don't render if the popup is not shown

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]; // Product sizes

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-header">
          <h3>Quick Add</h3>
          <button onClick={onClose}>Close</button> {/* Close button */}
        </div>
        <div className="size-options">
          {sizes.map((size) => (
            <div
              key={size}
              className="size-option"
              onClick={() => onSelectSize(size)} // Handle size selection
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAddPopup;
