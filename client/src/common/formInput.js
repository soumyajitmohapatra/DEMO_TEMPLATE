import React from "react";

const formInput=({ lable, placeholder,id,type, formikProps})=> {
  return (
    <div>
      <label>{lable}</label>
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        {...formikProps}
      />
    </div>
  );
}

export default formInput;

