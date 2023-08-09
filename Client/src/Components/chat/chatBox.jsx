import { useEffect, useRef, useState } from "react";
import UserImage from "./userImage";
import "./chatBox.css";
import { Box, Typography } from "@mui/material";
import InputImoji from "react-input-emoji";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { format } from "timeago.js";
import {
  addMessage,
  fetchMessages,
  getRecruiter,
  getSeeker,
} from "../../Redux/chatSlice/chatSlice";
const ChatBox = ({ chat, currentUserId, setsendMessages, recieveMessages }) => {
  const dispatch = useDispatch();
  const [recruiterData, setRecruiterData] = useState(null);
  const [seekerData, setSeekerData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll=useRef()

  useEffect(() => {
    if(recieveMessages!==null && recieveMessages.chatId==chat._id){
      setMessages([...messages, recieveMessages]);
    }
  }, [recieveMessages]);

  useEffect(() => {
    const userId = chat?.members.find((id) => id !== currentUserId);
    const userIdIndex = chat?.members.indexOf(userId);
    const getUserData = async () => {
      try {
        if (userIdIndex == 0) {
          const response = await dispatch(getRecruiter(userId));
          if (response?.payload?.data?.status == "success") {
            setRecruiterData(response?.payload?.data?.profile);
          }
        } else {
          const response = await dispatch(getSeeker(userId));
          if (response?.payload?.data?.status == "success") {
            setSeekerData(response?.payload?.data?.profile);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  useEffect(() => {
    const fetchingMessages = async () => {
      try {
        const response = await dispatch(fetchMessages(chat._id));
        if (response?.payload?.data?.status == "success") {
          setMessages(response?.payload?.data?.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchingMessages();
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUserId,
      message: newMessage,
      chatId: chat._id,
    };
    const recieverId = chat.members.find((id) => id !== currentUserId);
    setsendMessages({...message, recieverId});

    try {
      const response = await dispatch(addMessage(message));
      if (response?.payload?.data?.status == "success") {
        setMessages([...messages, response?.payload?.data?.savedMessage]);
        setNewMessage("");
      }
      
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:'smooth'});
  },[messages])

  return (
    <>
      <div className="ChatBox-container" style={{ height: "67vh" }}>
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower"></div>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <UserImage
                  image={
                    seekerData
                      ? seekerData?.profilePicture
                      : recruiterData?.companylogo
                  }
                  size="55px"
                />
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="500"
                    sx={{ padding: "1rem" }}
                  >
                    {seekerData
                      ? seekerData?.firstName
                      : recruiterData?.companyName}
                  </Typography>
                </Box>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>

            {/* chat */}
            <div className="chat-body" >
              {messages &&
                messages.map((message, index) => {
                  return (
                    <div ref={scroll}
                      key={index}
                      className={
                        message?.senderId == currentUserId
                          ? "message own"
                          : "message"
                      }
                    >
                      <span>{message?.message}</span>
                      <span>{format(message?.createdAt)}</span>
                    </div>
                  );
                })}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputImoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">Tap a chat to start</span>
        )}
      </div>
    </>
  );
};

ChatBox.propTypes = {
  chat: PropTypes.object.isRequired,
  currentUserId: PropTypes.string.isRequired,
  setsendMessages: PropTypes.func.isRequired,
  recieveMessages: PropTypes.array.isRequired,
};

export default ChatBox;
