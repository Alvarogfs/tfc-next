"use client";
import { getRoomById } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Avatar, Button, Spinner, Toast } from "flowbite-react";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import socket from "@/utils/socket";
//import RoomNotification from "@/components/battles/roomNotification";
import { User } from "next-auth";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { BattleStatus } from "@/types/battles.types";
import { generateTeam } from "@/utils/actions";
import { Pokemon } from "@/types/pokemon.types";
import Image from "next/image";
import TypeBadge from "@/components/pokemon/TypeBadge";
import PokemonStats from "@/components/pokemon/PokemonStats";
import { capitalize } from "@/utils/filters";

const BattleRoom = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data: session } = useSession();
  const [status, setStatus] = useState<BattleStatus>("pending");
  const [team, setTeam] = useState<Pokemon[]>([]);
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
        socket.emit("joinRoom", id, session?.user);
      }
      return await getRoomById(id);
    },
    retry: false,
  });
  const player = room?.users?.find((user) => user.id === session?.user.id)
  const rival = room?.users?.find((user) => user.id !== session?.user.id)
  useEffect(() => {
    socket.connect();
    socket.on(`joinedRoom-${id}`, (user: User) => {
      if (session?.user.id && user.id !== session.user.id) {
        toast.custom(
          (t) => (
            <div
              className={`flex flex-row bg-white px-6 py-4 shadow-md rounded mb-7 ms-3 gap-2 ${
                t.visible ? "animate-enter" : "animate-leave"
              }`}
            >
              <span>{user.name} joined</span>
              <button onClick={() => toast.remove(`joined-${user.id}`)}>
                <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
              </button>
            </div>
          ),
          { id: `joined-${user.id}`, duration: 3000 }
        );
      }
      refetch();
    });
    socket.on(`disconnect-${id}`, (user: User) => {
      if (session?.user.id && user.id !== session.user.id) {
        toast.custom(
          (t) => (
            <div
              className={`flex flex-row bg-white px-6 py-4 shadow-md rounded mb-7 ms-3 gap-2 ${
                t.visible ? "animate-enter" : "animate-leave"
              }`}
            >
              <span>{user.name} left</span>
              <button onClick={() => toast.remove(`disconnect-${user.id}`)}>
                <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
              </button>
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
    socket.on("allReady", async () => {
      setStatus("choosing");
      const pokemon = await generateTeam();
      setTeam(pokemon);
    });
    socket.on("allChosen", async () => {
      setStatus("battling");
      refetch()
    });

    return () => {
      socket.removeAllListeners("connect");
      socket.removeAllListeners("joinedRoom");
      socket.removeAllListeners("userDisconnected");
      socket.removeAllListeners("userExit");
      socket.removeAllListeners("allReady");
      socket.removeAllListeners("allChosen");
    };
  }, [room, refetch, router, id, session?.user.id]);

  const choosePokemon = (pokemon: Pokemon) => {
    setStatus("chosen")
    socket.emit("pokemonChosen", session?.user, pokemon)
  };
  const renderRoom = () => {
    switch (status) {
      case "pending":
        return (
          <div>
            <button onClick={handleReady}>Ready</button>
          </div>
        );
      case "ready":
        return <div>Waiting for opponent...</div>;
      case "choosing":
        return (
          <div className="flex xl:flex-row flex-col gap-4">
            {team.map((pokemon) => (
              <div className="flex flex-col items-center" key={pokemon.id}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  height={90}
                  width={90}
                ></Image>
                <span className="dark:text-white">
                  {capitalize(pokemon.name)}
                </span>
                <div className="flex flex-row gap-3 rounded-lg p-2">
                  {pokemon.types.map((type) => (
                    <TypeBadge
                      key={type.slot}
                      pokemonType={type.type}
                    ></TypeBadge>
                  ))}
                </div>
                <PokemonStats pokemon={pokemon}></PokemonStats>
                <Button className="mt-3" onClick={() => choosePokemon(pokemon)}>
                  Choose
                </Button>
              </div>
            ))}
          </div>
        );
      case "chosen":
        return <div className="dark:text-white">Waiting for opponent...</div>;
      case "battling":
        console.log({player}, {rival});
        if(!player?.pokemon || !rival?.pokemon) return
        return <div className="flex flex-row justify-between flex-1 px-4">
          <Image alt={player.pokemon.name} width={128} height={128} src={player.pokemon.sprites.back_default}></Image>
          <Image alt={rival.pokemon.name} width={128} height={128} src={rival.pokemon.sprites.front_default}></Image>
        </div>;
      case "finished":
        return;
    }
  };
  const handleReady = () => {
    setStatus("ready");
    socket.emit("playerReady", session?.user);
  };
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
      <div className="flex flex-1 flex-row gap-8 px-4 pb-8 ">
        <div className="flex flex-col items-start gap-4 dark:bg-neutral-900 bg-neutral-300 rounded p-4">
          {room?.users.map((element) => (
            <div key={element.id} className="relative">
              <Avatar
                rounded
                img={element.image ?? "/img/avatar_placeholder.jpg"}
              >
                <span className="px-2 dark:text-white">{element.name}</span>
              </Avatar>

              <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
          ))}
        </div>
        <div className="flex flex-1 justify-center items-center dark:bg-neutral-900 bg-neutral-300">
          {room?.users.length! > 1 ? (
            renderRoom()
          ) : (
            <div>Waiting for opponent...</div>
          )}
        </div>
      </div>
      {/* <RoomNotification></RoomNotification> */}
    </>
  );
};

export default BattleRoom;
