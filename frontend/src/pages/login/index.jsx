import Loader from "@/components/loder";
import Layout from "@/layout";
import { userLogin, userRegister } from "@/redux/action/userAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";
import PopUp from "@/components/popUp";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUserName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const router = useRouter();

  console.log(userState);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(userState);
    dispatch(userRegister({ email, username, password, name }));
    setLogin(true);
    setEmail("");
    setName("");
    setUserName("");
    setPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
    setEmail("");
    setPassword("");
    router.push("/dashbord");
  };

  useEffect(() => {
    if (userState.isLoggedIn) {
      router.push("/dashbord");
    }
  }, [userState.isLoggedIn]);

  return (
    <Layout>
      <div className={style.loginAndSignUp}>
        <div className={style.leftLogin}></div>
        <div className={style.rightLogin}>
          <form action="">
            <h1>{login ? "Login" : "Register"}</h1>
            {login === false && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="name"
                    value={name}
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="username"
                    value={username}
                    required
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </div>
              </>
            )}

            <div>
              <input
                type="email"
                placeholder="email"
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="password"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button
              onClick={(e) => {
                if (login) {
                  handleLogin(e);
                } else {
                  handleRegister(e);
                }
              }}
              className={style.loginBtn}
              disabled={userState.isLoading}
            >
              {/* {userState.isLoading ? "loading.." : "submit"} */}
              {login ? "signIn" : "signUp"}
            </button>
            <div>
              <p>
                {login
                  ? "if you dont have an account . please "
                  : "if You have an account . please "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setLogin(!login);
                  }}
                  className={style.anchorLink}
                >
                  {login ? "signUp" : "signIn"}
                </button>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
