import React from "react";
import "./Modals.css";
import { useDispatch } from "react-redux";
import { setFormToRender } from "../Slices/uiSlice";
const Succesfull = ({ text, setIsSent }) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsSent(false);
    dispatch(setFormToRender(null));
  };

  return (
    <div className="modal-container">
      <div>
        <div className="modal-content success">
          <h1>{text} succesfully!</h1>
          <button onClick={() => closeModal}>Ok</button>
        </div>
      </div>
    </div>
  );
};

export default Succesfull;
