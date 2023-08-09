import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let activeUsers: any[] = [];
let activeVideoCalls: any[] = [];
const socketConfig = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.on("connection", (socket) => {
    console.log(`users connected ${socket.id}`);
    //add user if user is not added previously
    socket.on("new-user-add", (newUserId) => {
      if (!activeUsers.some((user) => user?.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
      }
      console.log("activeUsers", activeUsers);

      io.emit("get-users", activeUsers);
    });

    socket.on("send-message", (data) => {
      const { recieverId } = data;
      console.log(recieverId, "recieverId");

      const user = activeUsers.find((user) => user?.userId === recieverId);
      console.log("sending message", recieverId);
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });

    socket.on("sendNotification", async(data) => {
   console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
   
      const { receiverId } = data;
      const user =await activeUsers.find((user) => user.userId == receiverId);
      console.log(activeUsers);
      
      console.log("Sending from socket to:", receiverId);
      console.log("Data:", data);
      console.log(user);
      
      if (user) {
        
        io.to(user.socketId).emit("getNotifications", data);
      }
      
    });

    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user?.socketId !== socket.id);
      // send all active users to all users
      console.log("disconnectUsers", activeUsers);
      io.emit("get-users", activeUsers);

      activeVideoCalls = activeVideoCalls.filter(
        (user) => user.socketId !== socket.id
      );
      io.emit("activeforcall", activeVideoCalls);
    });
  });
};

export default socketConfig;
