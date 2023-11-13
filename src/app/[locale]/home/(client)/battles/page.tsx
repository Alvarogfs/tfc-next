"use client";
import React, { useEffect } from "react";
import { Button, Card } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { getRooms, wsApi } from "@/utils/api";
import { useI18n } from "@/locales/client";
import socket from '@/utils/socket'
import { useSession } from "next-auth/react";
const Lobby = () => {
  const {data} = useSession()
  const {
    data: rooms,
    isLoading,
    refetch,
  } = useQuery({ queryKey: ["rooms"], queryFn: () => getRooms() });
  useEffect(() => {
    if(data?.user) socket.connect()
    socket.on("connect", () => {
      socket.emit("authenticate", {
        user: data?.user
      });
    });
    socket.on("userConnected", (data) => {
      console.log(data)
    })
    socket.on('roomCreated', () => {
      refetch()
    })
    socket.on('userDisconnected', () => {
      refetch()
    })
    return () => {socket.removeAllListeners('connect')}
  },[data, refetch])
  const handleCreateRoom = async () => {
    if(!data?.user) return
    socket.emit("createRoom", data.user)
  };
  const t = useI18n()
  return (
    <div className="px-6">
      <Button onClick={handleCreateRoom}>Create Room</Button>
      <div className="grid xl:grid-cols-6 gap-6 sm:grid-cols-1 justify-center items-center md:grid-cols-3 my-7">
        {rooms?.map((room) => (
          <Card key={room.id}>
            <div className="flex flex-col divide-y">
              {room.users.map((user) => (
                <span key={user.id}>{user.name}</span>
              ))}
            </div>
            <div>{room.users.length}/2</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
