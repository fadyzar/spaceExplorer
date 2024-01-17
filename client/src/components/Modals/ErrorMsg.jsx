import React from "react";
import "./ErrorMsg.css";
import { forwardRef } from "react";
import { useLogInContext } from "../context/LoginContext";

const ErrorModal = forwardRef(function Dialog({ children }, ref) {
  const { errMsg, setErrMsg } = useLogInContext();

  function closeDialog() {
    setErrMsg("");
  }

  return (
    <dialog ref={ref} className="ErrorMsg">
      <form method="dialog">
        <h3>{errMsg}</h3>
        <button className="close-dialog" onClick={closeDialog}>
          Close
        </button>
      </form>
    </dialog>
  );
});

export default ErrorModal;
