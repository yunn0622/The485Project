import React from 'react';
import { TextField } from '@aws-amplify/ui-react';
import { useAuth0 } from '@auth0/auth0-react';
import './style.css';
import{ formParts } from './formParts';
import GenderRadio from './GenderRadio';
import moment from 'moment';


export default function Form({ onAddInput, input }) {
  const { isAuthenticated } = useAuth0();
  const genderValue = input ? (input['Pt1Line6_Gender[1]'] || input['Pt1Line6_Gender[0]']) : null;

  const handleFieldInput = (name, value) => {
    onAddInput(name, value);
  };

  const handleDateInputChange = (name, value) => {
    // Convert from 'YYYY-MM-DD' to 'MM/DD/YYYY'
    const formattedValue = moment(value, "YYYY-MM-DD").format("MM/DD/YYYY");
    handleFieldInput(name, formattedValue);
  };

  const handleGenderChange = (e) => {
    let name;
    const value = e.target.value;
    if (value === "/M") {
        name = 'Pt1Line6_Gender[1]';
    } else if (value === "/F") {
        name = 'Pt1Line6_Gender[0]';
    }
    handleFieldInput(name, value);
  };

  const renderFieldComponent = (field) => {
    const value = isAuthenticated ? input[field.name] : '';
      if (field.type === "date") {
        return (
            <TextField
                name={field.name}
                type={field.type}
                value={value}
                placeholder="MM/DD/YYYY"
                onChange={e => handleDateInputChange(field.name, e.target.value)}
                disabled={!isAuthenticated}
            />
        );
      }else if (field.type === "radio" && field.id === "gender") {
        return(
            <GenderRadio
                selectedGender={genderValue}
                onGenderChange={handleGenderChange}
                disabled={!isAuthenticated}
            />
        )
      }else if (field.type === "separator") {
        return <div style={{height: "20px"}}></div>;
      }else {
        return (
          <TextField
            name={field.name}
            type={field.type}
            value={value}
            onChange={e => handleFieldInput(field.name, e.target.value)}
            disabled={!isAuthenticated}
            errorMessage="There is an error"
          />
        );
      }
    }

    return (
        <div className="form-container">
          {formParts.map((part, partIdx) => (
            <div key={partIdx} className="form-part">
              <h1>{part.partName}</h1>
              {part.groups.map((group, groupIdx) => (
                <div key={groupIdx} className="form-group">
                  <h2>{group.groupName}</h2>
                  <h4>{group.note}</h4>
                  {group.fields.map((field, idx) => (
                    <div key={idx} className="input-wrapper">
                      <label htmlFor={field.name} className="input-label">{field.label}</label>
                      {renderFieldComponent(field)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
  );
}
