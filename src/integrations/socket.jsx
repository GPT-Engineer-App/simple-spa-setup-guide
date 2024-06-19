import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useToast } from '@chakra-ui/react';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const newSocket = io('http://localhost:4000'); // Replace with your server URL
    setSocket(newSocket);

    newSocket.on('connect', () => {
      toast({
        title: "Connected",
        description: "You are connected to the server.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });

    newSocket.on('disconnect', () => {
      toast({
        title: "Disconnected",
        description: "You have been disconnected from the server.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });

    return () => newSocket.close();
  }, [toast]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};