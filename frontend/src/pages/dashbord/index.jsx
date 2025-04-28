import Layout from "@/layout";
import React, { Children, useEffect, useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  connectedUser,
  getAllUsers,
  getMyConnectionRequest,
  getUserChat,
  sendConnectionRequest,
  sendRequest,
  whatareMyConnectionrequests,
} from "@/redux/action/userAction";

export default function Dashbord({ children }) {
  const [message, setMessage] = useState("");
  const [isConnect, setIsConnect] = useState(false);
  const [acceptedConnection, setAcceptedConnection] = useState(false);
  const [count, setCount] = useState(false);

  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  console.log(userState);

  console.log(isConnect, acceptedConnection);

  useEffect(() => {
    dispatch(getAllUsers({ currentUserId: userState.userInfo._id }));
    if (!userState.isLoggedIn) {
      router.push("/login");
    }
    dispatch(getMyConnectionRequest());
    dispatch(whatareMyConnectionrequests());
  }, []);

  // useEffect(() => {
  //   dispatch(getMyConnectionRequest());
  //   dispatch(whatareMyConnectionrequests());
  // }, [userState.myRequests, userState.userRequests]);

  return (
    <Layout>
      <div className={style.container}>
        <div className={style.leftSideBar}>
          <h3>Your Contacts</h3>
          <br />
          <hr />

          {userState.userRequests.map((user) => {
            if (
              user.isContected == true &&
              userState.userInfo.username != user.userId.username
            ) {
              return (
                <div
                  className={style.userContact}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(`/chatuser/${user.userId._id}`);
                    dispatch(
                      getUserChat({
                        userChatId: user.userId._id,
                        currentUserId: userState.userInfo._id,
                      })
                    );
                  }}
                >
                  <img src="" alt="" />
                  <div className={style.userInfo}>
                    <h4>@{user.userId.username}</h4>
                    <div>
                      <p style={{ color: "gray" }}>hi</p>
                      <p style={{ color: "gray" }}>12-04-2025</p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
          {userState.myRequests.map((user) => {
            if (
              user.isContected == true &&
              userState.userInfo.username != user.connectionId.username
            ) {
              return (
                <div
                  className={style.userContact}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push(`/chatuser/${user.connectionId._id}`);
                    dispatch(
                      getUserChat({
                        userChatId: user.connectionId._id,
                        currentUserId: userState.userInfo._id,
                      })
                    );
                  }}
                >
                  <img src="" alt="" />
                  <div className={style.userInfo}>
                    <h4>@{user.connectionId.username}</h4>
                    <div>
                      <p style={{ color: "gray" }}>hi</p>
                      <p style={{ color: "gray" }}>12-04-2025</p>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className={style.middleBox}>{children}</div>

        <div className={style.rightSideBar}>
          <h3>Request Contacts</h3>
          <br />
          {count && <p style={{ color: "orange" }}>No Requests</p>}

          {userState.myRequests.map((user) => {
            if (user.isContected == false) {
              return (
                <div className={style.topUserContact}>
                  <div className={style.topUserInfo}>
                    <img src="" alt="" />
                    <h4>@{user.connectionId.username}</h4>
                  </div>

                  <button
                    style={{
                      background: "transparent",
                      border: "1px solid silver",
                    }}
                    onClick={() => {
                      dispatch(
                        sendConnectionRequest({ connectionId: user._id })
                      );
                      dispatch(whatareMyConnectionrequests());
                    }}
                  >
                    {user.isContected ? "Message" : "requested"}
                  </button>
                </div>
              );
            }
          })}
          <hr />
          <br />
          <h3>Top Users</h3>
          {userState.all_users.map((user) => {
            if (user.username !== userState.userInfo.username) {
              return (
                <div className={style.topUserContact}>
                  <div className={style.topUserInfo}>
                    <img src="" alt="" />
                    <h4>@{user.username}</h4>
                  </div>

                  <button
                    onClick={() => {
                      dispatch(
                        sendConnectionRequest({ connectionId: user._id })
                      );
                      dispatch(getMyConnectionRequest());
                      dispatch(whatareMyConnectionrequests());
                    }}
                  >
                    connect
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    </Layout>
  );
}
