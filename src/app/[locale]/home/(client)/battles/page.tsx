"use client";
import { createRoom } from "@/utils/actions";
import React from "react";
import { Button, Card } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "@/utils/api";
import { useI18n } from "@/locales/client";
const Lobby = () => {
  const {
    data: rooms,
    isLoading,
    refetch,
  } = useQuery({ queryKey: ["rooms"], queryFn: () => getRooms() });

  const handleCreateRoom = async () => {
    await createRoom();
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
