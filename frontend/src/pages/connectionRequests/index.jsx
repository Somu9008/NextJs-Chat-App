import React, { useEffect } from "react";
import Dashbord from "../dashbord";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  getMyConnectionRequest,
  whatareMyConnectionrequests,
} from "@/redux/action/userAction";

export default function index() {
  const userState = useSelector((state) => state.user);

  const dispatch = useDispatch();
  console.log(userState);

  return (
    <Dashbord>
      <div className={style.connectionRequest}>
        <div>
          <button>Back</button>
          <h3 className={style.head}>User Connection Requests</h3>
        </div>
        <hr />
        {userState.userRequests.map((user) => {
          if (user.isContected == false) {
            return (
              <div className={style.userRequest}>
                <img src="" alt="" />
                <div className={style.userRequestInfo}>
                  <h4>@{user.userId.username}</h4>
                </div>
                <button
                  onClick={() => {
                    dispatch(
                      acceptRequest({
                        acceptType: "accept",
                        connectionId: user.userId._id,
                      })
                    );
                    dispatch(whatareMyConnectionrequests());
                    dispatch(getMyConnectionRequest());
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    dispatch(
                      acceptRequest({
                        acceptType: "reject",
                        connectionId: user.userId._id,
                      })
                    );
                  }}
                >
                  Reject
                </button>
              </div>
            );
          }
        })}
      </div>
    </Dashbord>
  );
}
