// import React, { useEffect, useState } from "react";
// import style from "./style.module.css";
// import Dashbord from "../dashbord";
// import { clintServer } from "@/config";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserChat, sendMessage } from "@/redux/action/userAction";
// import { current } from "@reduxjs/toolkit";
// import useDeepCompareEffect from "use-deep-compare-effect";

// export default function userId() {
//   const [message, setmessage] = useState("");

//   const userState = useSelector((state) => state.user);

//   const dispatch = useDispatch();
//   console.log(userState);

//   // useDeepCompareEffect(() => {

//   // }, [userState.userChat]);

//   return (
//     <Dashbord>
//       <div className={style.userChat}>
//         <div className={style.chatNav}>
//           <div className={style.chat_user}>
//             <img src="" alt="" />
//             <div>
//               <h3>@{userState.chatusername}</h3>
//               <p>Online</p>
//             </div>
//           </div>
//           <div>. . .</div>
//         </div>

//         <div className={style.chat}>
//           {userState.userChat?.map((chat) => {
//             if (chat.from != userState.userInfo.username) {
//               return (
//                 <div className={style.leftChat}>
//                   <p>
//                     {chat.message}
//                     <br />
//                     <span>{chat.data}</span>
//                   </p>
//                 </div>
//               );
//             } else {
//               return (
//                 <div className={style.RightChat}>
//                   <p>
//                     {chat.message}
//                     <br />
//                     <span>{chat.data}</span>
//                   </p>
//                 </div>
//               );
//             }
//           })}
//         </div>
//         <div className={style.inputfiled}>
//           <input
//             type="text"
//             name=""
//             id=""
//             value={message}
//             onChange={(e) => {
//               setmessage(e.target.value);
//             }}
//           />
//           <button
//             onClick={() => {
//               dispatch(
//                 sendMessage({
//                   friendUserId: userState.chatUserId,
//                   message,
//                   currentUserId: userState.userInfo._id,
//                 })
//               );

//               dispatch(
//                 getUserChat({
//                   userChatId: userState.chatUserId,
//                   currentUserId: userState.userInfo._id,
//                 })
//               );

//               setmessage("");
//             }}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//       ;
//     </Dashbord>
//   );
// }

// import React, { useEffect, useState } from "react";
// import style from "./style.module.css";
// import Dashbord from "../dashbord";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserChat, sendMessage } from "@/redux/action/userAction";

// export default function UserId() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]); // Local messages state
//   const dispatch = useDispatch();
//   const userState = useSelector((state) => state.user);

//   useEffect(() => {
//     setMessages(userState.userChat || []); // Update local messages when redux changes
//   }, [userState.userChat]);

//   const handleSendMessage = async () => {
//     if (!message.trim()) return; // Prevent empty messages

//     const newMessage = {
//       message,
//       from: userState.userInfo.username,
//       data: new Date().toLocaleString(), // You can improve this date format later
//     };

//     // 1️⃣ Immediately update UI
//     setMessages((prev) => [...prev, newMessage]);

//     // 2️⃣ Send message to server
//     dispatch(
//       sendMessage({
//         friendUserId: userState.chatUserId,
//         message,
//         currentUserId: userState.userInfo._id,
//       })
//     );

//     setMessage(""); // Clear input
//   };

//   return (
//     <Dashbord>
//       <div className={style.userChat}>
//         <div className={style.chatNav}>
//           <div className={style.chat_user}>
//             <img src="" alt="" />
//             <div>
//               <h3>@{userState.chatusername}</h3>
//               <p>Online</p>
//             </div>
//           </div>
//           <div>. . .</div>
//         </div>

//         <div className={style.chat}>
//           {messages.map((chat, index) =>
//             chat.from !== userState.userInfo.username ? (
//               <div className={style.leftChat} key={index}>
//                 <p>
//                   {chat.message}
//                   <br />
//                   <span>{chat.data}</span>
//                 </p>
//               </div>
//             ) : (
//               <div className={style.RightChat} key={index}>
//                 <p>
//                   {chat.message}
//                   <br />
//                   <span>{chat.data}</span>
//                 </p>
//               </div>
//             )
//           )}
//         </div>

//         <div className={style.inputfiled}>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//           />
//           <button onClick={handleSendMessage}>Send</button>
//         </div>
//       </div>
//     </Dashbord>
//   );
// }

import React, { useEffect, useRef, useState } from "react"; // 👈 import useRef
import style from "./style.module.css";
import Dashbord from "../dashbord";
import { useDispatch, useSelector } from "react-redux";
import { getUserChat, sendMessage } from "@/redux/action/userAction";
import { useRouter } from "next/router";

export default function UserId() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const router = useRouter();
  const chatContainerRef = useRef(null); // 👈 ref for the chat container

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        getUserChat({
          userChatId: userState.chatUserId,
          currentUserId: userState.userInfo._id,
        })
      );
    }, 3000); // Fetch every 3 seconds

    return () => clearInterval(interval); // Cleanup when component unmounts
  }, [dispatch, userState.chatUserId, userState.userInfo._id]);

  useEffect(() => {
    setMessages(userState.userChat || []);
  }, [userState.userChat]);

  useEffect(() => {
    // 👇 Auto scroll to bottom whenever messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      message,
      from: userState.userInfo.username,
      data: new Date().toLocaleString(),
    };

    setMessages((prev) => [...prev, newMessage]);

    dispatch(
      sendMessage({
        friendUserId: userState.chatUserId,
        message,
        currentUserId: userState.userInfo._id,
      })
    );

    setMessage("");
  };

  return (
    <Dashbord>
      <div className={style.userChat}>
        <div className={style.chatNav}>
          <div className={style.chat_user}>
            <button
              onClick={() => {
                router.push("/dashbord");
              }}
            >
              Back
            </button>
            <img src="" alt="" />
            <div>
              <h3>@{userState.chatusername}</h3>
              <p>Online</p>
            </div>
          </div>
          <div>. . .</div>
        </div>

        {/* 👇 Add ref to chat container */}
        <div className={style.chat} ref={chatContainerRef}>
          {messages.map((chat, index) =>
            chat.from !== userState.userInfo.username ? (
              <div className={style.leftChat} key={index}>
                <p>
                  {chat.message}
                  <br />
                  <span>{chat.date}</span>
                </p>
              </div>
            ) : (
              <div className={style.RightChat} key={index}>
                <p>
                  {chat.message}
                  <br />
                  <span>{chat.date}</span>
                </p>
              </div>
            )
          )}
        </div>

        <div className={style.inputfiled}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </Dashbord>
  );
}
