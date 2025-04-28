import React, { useState } from "react";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetMessage } from "@/redux/reducer/userReducer";

export default function PopUp({ message, isSuccess }) {
  const [popUp, setPopUp] = useState(true);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return popUp ? (
    <div className={style.popUp}>
      <div className={style.message}>
        <p>{message}</p>
        <button
          onClick={() => {
            setPopUp(false);
            dispatch(resetMessage());
          }}
        >
          X
        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
