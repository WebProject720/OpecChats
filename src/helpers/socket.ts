import { io } from "socket.io-client";

const socketServer=()=>{
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_PATH_ || 'http://localhost:5000';
    const  socket = io(SERVER_URL, { transports: ['websocket'] });
    return socket;
}
export default socketServer;
