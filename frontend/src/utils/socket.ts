import io from "socket.io-client";

export const socket = io("http://localhost:5200");

socket.on("connect", () => console.log("Connected to socket server"));
socket.on("disconnect", () => console.log("Disconnected from socket server"));
