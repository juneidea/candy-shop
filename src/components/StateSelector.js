import React from 'react';

const StateSelector = ({callback, optionState}) => {
  return (
    <select value={optionState} onChange={callback}>
      <option value="AL" seleted={(optionState === "AL").toString()} >Alabama</option>
      <option value="AK" seleted={(optionState === "AK").toString()} >Alaska</option>
      <option value="AZ" seleted={(optionState === "AZ").toString()} >Arizona</option>
      <option value="AR" seleted={(optionState === "AR").toString()} >Arkansas</option>
      <option value="CA" seleted={(optionState === "CA").toString()} >California</option>
      <option value="CO" seleted={(optionState === "CO").toString()} >Colorado</option>
      <option value="CT" seleted={(optionState === "CT").toString()} >Connecticut</option>
      <option value="DE" seleted={(optionState === "DE").toString()} >Delaware</option>
      <option value="DC" seleted={(optionState === "DC").toString()} >District Of Columbia</option>
      <option value="FL" seleted={(optionState === "FL").toString()} >Florida</option>
      <option value="GA" seleted={(optionState === "GA").toString()} >Georgia</option>
      <option value="HI" seleted={(optionState === "HI").toString()} >Hawaii</option>
      <option value="ID" seleted={(optionState === "ID").toString()} >Idaho</option>
      <option value="IL" seleted={(optionState === "IL").toString()} >Illinois</option>
      <option value="IN" seleted={(optionState === "IN").toString()} >Indiana</option>
      <option value="IA" seleted={(optionState === "IA").toString()} >Iowa</option>
      <option value="KS" seleted={(optionState === "KS").toString()} >Kansas</option>
      <option value="KY" seleted={(optionState === "KY").toString()} >Kentucky</option>
      <option value="LA" seleted={(optionState === "LA").toString()} >Louisiana</option>
      <option value="ME" seleted={(optionState === "ME").toString()} >Maine</option>
      <option value="MD" seleted={(optionState === "MD").toString()} >Maryland</option>
      <option value="MA" seleted={(optionState === "MA").toString()} >Massachusetts</option>
      <option value="MI" seleted={(optionState === "MI").toString()} >Michigan</option>
      <option value="MN" seleted={(optionState === "MN").toString()} >Minnesota</option>
      <option value="MS" seleted={(optionState === "MS").toString()} >Mississippi</option>
      <option value="MO" seleted={(optionState === "MO").toString()} >Missouri</option>
      <option value="MT" seleted={(optionState === "MT").toString()} >Montana</option>
      <option value="NE" seleted={(optionState === "NE").toString()} >Nebraska</option>
      <option value="NV" seleted={(optionState === "NV").toString()} >Nevada</option>
      <option value="NH" seleted={(optionState === "NH").toString()} >New Hampshire</option>
      <option value="NJ" seleted={(optionState === "NJ").toString()} >New Jersey</option>
      <option value="NM" seleted={(optionState === "NM").toString()} >New Mexico</option>
      <option value="NY" seleted={(optionState === "NY").toString()} >New York</option>
      <option value="NC" seleted={(optionState === "NC").toString()} >North Carolina</option>
      <option value="ND" seleted={(optionState === "ND").toString()} >North Dakota</option>
      <option value="OH" seleted={(optionState === "OH").toString()} >Ohio</option>
      <option value="OK" seleted={(optionState === "OK").toString()} >Oklahoma</option>
      <option value="OR" seleted={(optionState === "OR").toString()} >Oregon</option>
      <option value="PA" seleted={(optionState === "PA").toString()} >Pennsylvania</option>
      <option value="RI" seleted={(optionState === "RI").toString()} >Rhode Island</option>
      <option value="SC" seleted={(optionState === "SC").toString()} >South Carolina</option>
      <option value="SD" seleted={(optionState === "SD").toString()} >South Dakota</option>
      <option value="TN" seleted={(optionState === "TN").toString()} >Tennessee</option>
      <option value="TX" seleted={(optionState === "TX").toString()} >Texas</option>
      <option value="UT" seleted={(optionState === "UT").toString()} >Utah</option>
      <option value="VT" seleted={(optionState === "VT").toString()} >Vermont</option>
      <option value="VA" seleted={(optionState === "VA").toString()} >Virginia</option>
      <option value="WA" seleted={(optionState === "WA").toString()} >Washington</option>
      <option value="WV" seleted={(optionState === "WV").toString()} >West Virginia</option>
      <option value="WI" seleted={(optionState === "WI").toString()} >Wisconsin</option>
      <option value="WY" seleted={(optionState === "WY").toString()} >Wyoming</option>
    </select>
  );
};

export default StateSelector;
