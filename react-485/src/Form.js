import './style.css';
import{ formParts } from './formParts';
import { TextField } from '@aws-amplify/ui-react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Form({ onAddInput }) {
  const { isAuthenticated } = useAuth0();

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
                    <TextField
//                      key={idx}
//                      label={field.label}
                      name={field.name}
                      onChange={e => onAddInput(field.name, e.target.value)}
                      disabled={!isAuthenticated}
                      errorMessage="There is an error"
                    />
                 </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}