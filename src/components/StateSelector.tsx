import React from 'react';

const StateSelector: React.FunctionComponent<{callback: () => void, optionState: string}> = ({callback, optionState}) => {
  return (
    <select value={optionState} onChange={callback}>
      <option value="AL" selected={(optionState === "AL")} >Alabama</option>
      <option value="AK" selected={(optionState === "AK")} >Alaska</option>
      <option value="AZ" selected={(optionState === "AZ")} >Arizona</option>
      <option value="AR" selected={(optionState === "AR")} >Arkansas</option>
      <option value="CA" selected={(optionState === "CA")} >California</option>
      <option value="CO" selected={(optionState === "CO")} >Colorado</option>
      <option value="CT" selected={(optionState === "CT")} >Connecticut</option>
      <option value="DE" selected={(optionState === "DE")} >Delaware</option>
      <option value="DC" selected={(optionState === "DC")} >District Of Columbia</option>
      <option value="FL" selected={(optionState === "FL")} >Florida</option>
      <option value="GA" selected={(optionState === "GA")} >Georgia</option>
      <option value="HI" selected={(optionState === "HI")} >Hawaii</option>
      <option value="ID" selected={(optionState === "ID")} >Idaho</option>
      <option value="IL" selected={(optionState === "IL")} >Illinois</option>
      <option value="IN" selected={(optionState === "IN")} >Indiana</option>
      <option value="IA" selected={(optionState === "IA")} >Iowa</option>
      <option value="KS" selected={(optionState === "KS")} >Kansas</option>
      <option value="KY" selected={(optionState === "KY")} >Kentucky</option>
      <option value="LA" selected={(optionState === "LA")} >Louisiana</option>
      <option value="ME" selected={(optionState === "ME")} >Maine</option>
      <option value="MD" selected={(optionState === "MD")} >Maryland</option>
      <option value="MA" selected={(optionState === "MA")} >Massachusetts</option>
      <option value="MI" selected={(optionState === "MI")} >Michigan</option>
      <option value="MN" selected={(optionState === "MN")} >Minnesota</option>
      <option value="MS" selected={(optionState === "MS")} >Mississippi</option>
      <option value="MO" selected={(optionState === "MO")} >Missouri</option>
      <option value="MT" selected={(optionState === "MT")} >Montana</option>
      <option value="NE" selected={(optionState === "NE")} >Nebraska</option>
      <option value="NV" selected={(optionState === "NV")} >Nevada</option>
      <option value="NH" selected={(optionState === "NH")} >New Hampshire</option>
      <option value="NJ" selected={(optionState === "NJ")} >New Jersey</option>
      <option value="NM" selected={(optionState === "NM")} >New Mexico</option>
      <option value="NY" selected={(optionState === "NY")} >New York</option>
      <option value="NC" selected={(optionState === "NC")} >North Carolina</option>
      <option value="ND" selected={(optionState === "ND")} >North Dakota</option>
      <option value="OH" selected={(optionState === "OH")} >Ohio</option>
      <option value="OK" selected={(optionState === "OK")} >Oklahoma</option>
      <option value="OR" selected={(optionState === "OR")} >Oregon</option>
      <option value="PA" selected={(optionState === "PA")} >Pennsylvania</option>
      <option value="RI" selected={(optionState === "RI")} >Rhode Island</option>
      <option value="SC" selected={(optionState === "SC")} >South Carolina</option>
      <option value="SD" selected={(optionState === "SD")} >South Dakota</option>
      <option value="TN" selected={(optionState === "TN")} >Tennessee</option>
      <option value="TX" selected={(optionState === "TX")} >Texas</option>
      <option value="UT" selected={(optionState === "UT")} >Utah</option>
      <option value="VT" selected={(optionState === "VT")} >Vermont</option>
      <option value="VA" selected={(optionState === "VA")} >Virginia</option>
      <option value="WA" selected={(optionState === "WA")} >Washington</option>
      <option value="WV" selected={(optionState === "WV")} >West Virginia</option>
      <option value="WI" selected={(optionState === "WI")} >Wisconsin</option>
      <option value="WY" selected={(optionState === "WY")} >Wyoming</option>
    </select>
  );
};

export default StateSelector;
