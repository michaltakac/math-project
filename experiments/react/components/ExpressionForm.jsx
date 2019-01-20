import React from "react";

export function ExpressionForm({ onSubmit, onChange, value }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label for="expressionInput">Funkcia:</label>
        <input
          className="form-control"
          id="expressionInput"
          ariaDescribedBy="expression"
          type="text"
          name="expr"
          defaultValue={value}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary" type="submit">
          Vykresliť
        </button>
      </div>
    </form>
  );
}
