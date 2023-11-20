"use client"
import socket from "@/utils/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";
import { ReactElement, useEffect, useRef } from "react";

export default function SubLayout({
    children,
  }: {
    children: ReactElement;
  }) {
    const pathname = usePathname();
  const queryClient = useQueryClient();
  const {data} = useSession()
  const roomRef = useRef<null | string>(null);
  useEffect(() => {
    const inRoom = match("/:lang*/home/battles/:roomId")(pathname);
    console.log(inRoom, roomRef.current)
    console.log({pathname});
    if (inRoom) {
      // @ts-ignore
      roomRef.current = inRoom.params.roomId as string;
    } else {
      if (roomRef.current) {
        console.log("exit");
        socket.emit("exit", data?.user.id);
      }
    }
    socket.on("userExit", (userId) => {
      if(userId === data?.user.id){
      queryClient.invalidateQueries({queryKey: ["rooms", 'currentRoom']});
      queryClient.invalidateQueries({queryKey: ["rooms"]});
      roomRef.current = null;
    }
    });
  }, [pathname, queryClient, data?.user.id]);
    return (children)
  }