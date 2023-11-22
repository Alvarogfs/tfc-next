"use client";
import { getRoomById } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Avatar, Spinner, Toast } from "flowbite-react";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import socket from "@/utils/socket";
//import RoomNotification from "@/components/battles/roomNotification";
import { User } from "next-auth";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const BattleRoom = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data } = useSession();
  const {
    data: room,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["rooms", "currentRoom"],
    queryFn: async () => {
      if (isLoading) {
        console.log("loadin");
        socket.emit("joinRoom", id, data?.user);
      }
      return await getRoomById(id);
    },
    retry: false,
  });
  useEffect(() => {
    socket.connect();
    socket.on(`joinedRoom-${id}`, (user: User) => {
      if (data?.user.id && user.id !== data.user.id) {
        toast.custom(
          (t) => (
            <div
              className={`flex flex-row bg-white px-6 py-4 shadow-md rounded mb-7 ms-3 gap-2 ${
                t.visible ? "animate-enter" : "animate-leave"
              }`}
            >
              <span>{ user.name } joined</span>
              <button onClick={() => toast.remove(`joined-${user.id}`) }><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></button>
            </div>
          ),
          { id: `joined-${user.id}`, duration: 3000 }
        );
      }
      refetch();
    });
    socket.on(`disconnect-${id}`, (user: User) => {
      if (data?.user.id && user.id !== data.user.id) {
        toast.custom(
          (t) => (
            <div
              className={`flex flex-row bg-white px-6 py-4 shadow-md rounded mb-7 ms-3 gap-2 ${
                t.visible ? "animate-enter" : "animate-leave"
              }`}
            >
              <span>{ user.name } left</span>
              <button onClick={() => toast.remove(`disconnect-${user.id}`) }><FontAwesomeIcon icon={faClose}></FontAwesomeIcon></button>
            </div>
          ),
          { id: `disconnect-${user.id}`, duration: 3000 }
        );
      }
      refetch();
    });
    socket.on("userDisconnected", () => {
      refetch();
    });
    socket.on("userExit", () => {
      refetch();
    });

    return () => {
      socket.removeAllListeners("connect");
      socket.removeAllListeners("joinedRoom");
      socket.removeAllListeners("userDisconnected");
      socket.removeAllListeners("userExit");
    };
  }, [room, refetch, router, id]);
  console.log(error);
  if (isLoading)
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner className="fill-yellow-300" size={"xl"}></Spinner>
      </div>
    );
  const err = error as AxiosError;
  if (err) {
    if (err.response?.status === 404) notFound();
    return (
      <div className="flex flex-1 text-red-600 justify-center items-center text-2xl">
        Error
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-1 flex-row gap-8 px-4 pb-8">
        <div className="flex flex-col items-start gap-4 dark:bg-neutral-900 bg-neutral-300 rounded p-4">
          {room?.users.map((element) => (
            <div key={element.id} className="relative">
              <Avatar
                rounded
                img={element.image ?? "/img/avatar_placeholder.jpg"}
              >
                <span className="px-2">{element.name}</span>
              </Avatar>

              <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-blue-400">ADIOS</div>
      </div>
      {/* <RoomNotification></RoomNotification> */}
    </>
  );
};

export default BattleRoom;
