"use client";
import { getRoomById } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Avatar, Spinner } from "flowbite-react";
import { notFound, useParams } from "next/navigation";
import React from "react";

const BattleRoom = () => {
  const { id } = useParams() as { id: string };
  const {
    data: room,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoomById(id),
    retry: false,
  });
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
  );
};

export default BattleRoom;
