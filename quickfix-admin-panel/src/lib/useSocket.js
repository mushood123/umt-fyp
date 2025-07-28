import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (userId) => {
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Connecting");

  useEffect(() => {
    const connectSocket = async () => {
      try {
        const serverUrl =
        (process.env.REACT_APP_SERVER_URL || "") + "/notification";
        const authToken = process.env.REACT_APP_AUTH_KEY || "";
        const socketInstance = io(serverUrl, {
          query: {
            token: authToken,
            groupId: userId,
          },
        });

        socketInstance.on("connect", () => {
          setStatus("Connected");
          setError(null);
        });

        socketInstance.on("connect_error", (err) => {
          setError(`connect_error due to ${err}`);
          setStatus("Error");
        });

        socketInstance.on("disconnected", (error) => {
          setStatus("Disconnected");
        });

        socketInstance.on("error", (error) => {
          setError(`Connect Error, Check your internet connection`);
          setStatus("Error");
        });

        setSocket(socketInstance);
      } catch (err) {
        setError("Socket connection error");
        setStatus("Error");
      }
    };

    connectSocket();

    return () => {
      socket?.disconnect();
    };
  }, [userId]);

  return { socket, status, error };
};

export default useSocket;
