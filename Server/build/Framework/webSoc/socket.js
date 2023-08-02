"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let activeUsers = [];
const socketConfig = (io) => {
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
        socket.on("disconnect", () => {
            // remove user from active users
            activeUsers = activeUsers.filter((user) => user?.socketId !== socket.id);
            // send all active users to all users
            console.log("disconnectUsers", activeUsers);
            io.emit("get-users", activeUsers);
        });
    });
};
exports.default = socketConfig;
