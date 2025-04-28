import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/layout";
import Dashbord from "./dashbord";
import Login from "./login";
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Layout>
        <div className="homePage">
          <div>
            <h3>Ai chat and Vedio Conferncing</h3>
            <p>
              this is help to make call and chat in reat time,plese signUp and
              use This Application
            </p>
            <br />
            <button
              onClick={() => {
                router.push("/login");
              }}
            >
              SignUp
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
