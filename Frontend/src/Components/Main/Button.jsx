import React from 'react';

const Button = ({ text, secondary, onClick, icon }) => (
  <button
    onClick={onClick} // Make onClick customizable
    style={{
      background: secondary ? 'transparent' : 'linear-gradient(90deg, #16423CFF, #2D645EFF, #26544EFF, #336C65FF)',
      color: 'white',
      border: secondary ? '1px solid #16423CFF' : 'none',
      padding: '0.5rem 1.5rem',
      borderRadius: '9999px',
      fontWeight: '600',
      transition: 'all 0.3s ease, transform 0.3s ease',
      display: 'flex', // Flexbox for aligning icon and text
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onMouseEnter={(e) => {
      if (secondary) {
        e.target.style.background = 'linear-gradient(90deg, #16423CFF, #2D645EFF, #26544EFF, #336C65FF)';
        e.target.style.color = 'white';
        e.target.style.border = 'none';
      } else {
        e.target.style.background = 'linear-gradient(90deg, #16423CFF, #2D645EFF, #26544EFF, #336C65FF)';
        e.target.style.color = 'white';
      }
      e.target.style.transform = 'scale(1.1)';
    }}
    onMouseLeave={(e) => {
      if (secondary) {
        e.target.style.background = 'transparent';
        e.target.style.color = '#fff';
        e.target.style.border = '1px solid #16423CFF';
      } else {
        e.target.style.background = 'linear-gradient(90deg, #16423CFF, #2D645EFF, #26544EFF, #336C65FF)';
        e.target.style.color = 'white';
      }
      e.target.style.transform = 'scale(1)';
    }}
  >
    {icon && <span style={{ marginRight: '8px' }}>{icon}</span>} {/* Optional icon */}
    {text}
  </button>
);

export default Button;
