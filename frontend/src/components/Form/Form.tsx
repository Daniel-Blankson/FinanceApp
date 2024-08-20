import { useState } from "react";
import { ReactDOM } from "react";
import Dropdown from "./Dropdown";
import "./Form.css"

function Form() {

  const options = [
    { value: "bills", label: "Bills"},
    { value: "shopping", label: "Shopping"},
    { value: "housing", label: "Housing"},
    { value: "groceries", label: "Groceries"},
    { value: "investments", label: "Investments"},
    { value: "subscriptions", label: "Subscriptions"},
    { value: "transport", label: "Transport"},
    { value: "eating out", label: "Eating Out"},
    { value: "entertainment", label: "Entertainment"},
    { value: "gifts", label: "Gifts"},

  ]

  return (
    <form className="form">
      <div className="wrapper">
        <div className="field">
          <label>Pick a Category
            <Dropdown options={options} />
          </label>
        </div>
        <div className="field">
          <label>Description
            <input type="text" className="description"/>
          </label>
        </div>
        <div className="field">
          <label>Amount (£):
            <input type="number" className="amount" placeholder="0.00"/>
          </label>
        </div>
        <div className="field">
            <button className="save-button">Save</button>
        </div>
      </div>
    </form>
  );
}
export default Form;
