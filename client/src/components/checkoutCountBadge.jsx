import React from 'react';
import PropTypes from 'prop-types';

const CheckoutCountBadge = ({ size }) => {
  return (
    <div className={`absolute bg-red-600 text-white text-[15px] ${size} -right-3 -top-1 rounded-full grid place-items-center`}>
      3
    </div>
  );
};

CheckoutCountBadge.propTypes = {
  size: PropTypes.string.isRequired,
};

export default CheckoutCountBadge;
