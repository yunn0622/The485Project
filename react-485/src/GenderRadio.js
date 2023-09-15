import React from 'react';

function GenderRadio({ selectedGender, onGenderChange }) {
  return (
    <div className="gender-radio-group">
      <label>
        <input
          type="radio"
          name="Pt1Line6_Gender[1]"
          value="/M"
          checked={selectedGender === '/M'}
          onChange={onGenderChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="Pt1Line6_Gender[0]"
          value="/F"
          checked={selectedGender === '/F'}
          onChange={onGenderChange}
        />
        Female
      </label>
    </div>
  );
}

export default GenderRadio;