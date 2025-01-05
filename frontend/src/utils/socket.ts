import io from "socket.io-client";
import {baseUrl} from "../constants/url";

export const socket = io(baseUrl);

socket.on("connect", () => console.log("Connected to socket server"));
socket.on("disconnect", () => console.log("Disconnected from socket server"));
