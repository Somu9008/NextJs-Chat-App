import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducer/userReducer";
import { getMyConnectionRequest } from "@/redux/action/userAction";

export default function Navbar() {
  const [countRequest, setCountRequest] = useState(0);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    const count = userState.userRequests.filter((user) => {
      if (user.isContected !== true) {
        return user;
      } else {
        return;
      }
    });
    console.log(count);
    setCountRequest(count.length);
  }, [userState.userRequests]);

  return (
    <nav className={style.navbar}>
      <div>
        <div className={style.nav_left}>
          <h1
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push("/dashbord");
            }}
          >
            Ai CHAT APPLICATION
          </h1>
        </div>

        <div className={style.nav_right}>
          {userState.isLoggedIn == false && (
            <button
              onClick={() => {
                router.push("/login");
              }}
            >
              Connect{" "}
            </button>
          )}

          {userState.isLoggedIn && (
            <>
              <button
                onClick={() => {
                  router.push("/connectionRequests");
                  dispatch(getMyConnectionRequest());
                }}
              >
                My Connection Req{" "}
                {countRequest > 0 ? (
                  <span
                    style={{
                      background: "red",
                      paddingInline: "0.4rem",
                      paddingBlock: "0.2rem",

                      borderRadius: "50%",
                    }}
                  >
                    {countRequest}
                  </span>
                ) : (
                  ""
                )}
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  dispatch(logout());
                  router.push("/login");
                }}
              >
                logout
              </button>
              <div className={style.userProfile}>
                <h3>{userState.userInfo.name}</h3>
                <div className={style.menu}>
                  <button
                    onClick={() => {
                      router.push("/connectionRequests");
                      dispatch(getMyConnectionRequest());
                    }}
                  >
                    My Connection Req{" "}
                    {countRequest > 0 ? (
                      <span
                        style={{
                          background: "red",
                          paddingInline: "0.4rem",
                          paddingBlock: "0.2rem",

                          borderRadius: "50%",
                        }}
                      >
                        {countRequest}
                      </span>
                    ) : (
                      ""
                    )}
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      dispatch(logout());
                      router.push("/login");
                    }}
                  >
                    logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
