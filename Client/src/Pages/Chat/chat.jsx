import { useEffect, useRef, useState } from "react";
import "./chat.css";
import Chats from "../../Components/chat/chats";
import ChatBox from "../../Components/chat/chatBox";
import { useDispatch, useSelector } from "react-redux";
import { getUserChats } from "../../Redux/chatSlice/chatSlice";
import { io } from "socket.io-client";

const Chat = () => {
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessages, setsendMessages] = useState(null);
  const [recieveMessages, setRecieveMessages] = useState(null);
  const user = useSelector((state) =>
    state?.seekers?.seekers?.profile
      ? state?.seekers?.seekers?.profile
      : state?.recruiters?.recruiters?.profile
  );
  const socket = useRef();

  //send messages to socket server
  useEffect(() => {
    if (sendMessages !== null) {
      socket.current.emit("send-message", sendMessages);
    }
  }, [sendMessages]);

  useEffect(() => {
    socket.current = io("https://careerlink.cloud");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    socket.current.on("recieve-message", (data) => {
      setRecieveMessages(data);
    });
  }, [user, recieveMessages]);

  useEffect(() => {
    const getChats = async () => {
      const response = await dispatch(getUserChats(user._id));
      if (response?.payload?.data?.status == "success") {
        setChats(response?.payload?.data?.chats);
      }
    };
    getChats();
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((id) => id !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  return (
    <>
      <div className="conversation" style={{ backgroundColor: "#e6e6e6" }}>
        {/* left side */}
        <div className="left-side-chat">
          <div className="chat-container">
            <h2>Chats</h2>
            <div className="chat-list">
              {chats.length > 0
                ? chats.map((chat, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setCurrentChat(chat);
                        }}
                      >
                        <Chats data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}/>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>

        {/* right side */}

        <div className="Right-side-chat">
          <ChatBox
            chat={currentChat}
            currentUserId={user._id}
            setsendMessages={setsendMessages}
            recieveMessages={recieveMessages}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
