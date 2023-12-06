"use client"
import React from "react";
import { Pokemon, PokemonStats as PokemonStatsType  } from "@/types/pokemon.types";
import { useI18n } from "@/locales/client";
import { getBorderColor, getColorType, getStats } from "@/utils/filters";
const PokemonStats = ({pokemon} : {pokemon: Pokemon}) => {
    const t = useI18n();
    const stats = getStats(pokemon)
  return (
    <div
      className={`${getColorType(
        pokemon.types[0].type.name
      )} flex flex-col items-center px-2 rounded-lg pb-2 border-4 ${getBorderColor(
        pokemon.types[0].type.name
      )}`}
    >
      <h5
        className={`font-bold border-b-2 w-full text-center ${getBorderColor(
          pokemon.types[0].type.name
        )} my-1`}
      >
        {t("pokemonStats.stats")}
      </h5>
      <table
        className={`w-96 text-left h-[288px] border-spacing-x-0 border-spacing-y-0.5 border-separate`}
      >
        <tbody>
          <tr className="bg-red-500">
            <th className="w-32 px-2">
              <div className="flex flex-row justify-between w-full">
                <span>{t("pokemonStats.health")}: </span>
                <span>{stats.hp}</span>
              </div>
            </th>
            <td>
              <div
                style={{ width: `${(stats.hp * 100) / 255}%` }}
                className={`bg-red-600 h-full border-2 border-red-700`}
              ></div>
            </td>
          </tr>
          <tr className="bg-orange-400">
            <th className="w-32 px-2">
              <div className="flex flex-row justify-between w-full">
                <span>{t("pokemonStats.attack")}: </span>
                <span>{stats.attack}</span>
              </div>
            </th>
            <td>
              <div
                style={{ width: `${(stats.attack * 100) / 255}%` }}
                className={`bg-orange-500 h-full border-2 border-orange-600`}
              ></div>
            </td>
          </tr>
          <tr className="bg-amber-300">
            <th className="w-32 px-2">
              <div className="flex flex-row justify-between w-full">
                <span>{t("pokemonStats.defense")}: </span>
                <span>{stats.defense}</span>
              </div>
            </th>
            <td>
              <div
                style={{ width: `${(stats.defense * 100) / 255}%` }}
                className={`bg-amber-400 h-full border-2 border-amber-500`}
              ></div>
            </td>
          </tr>
          <tr className="bg-blue-300">
            <th className="w-32 px-2">
              <div className="flex flex-row justify-between w-full">
                <span>{t("pokemonStats.sp-attack")}: </span>
                <span>{stats.special_attack}</span>
              </div>
            </th>
            <td>
              <div
                style={{ width: `${(stats.special_attack * 100) / 255}%` }}
                className={`bg-blue-400 h-full border-2 border-blue-500`}
              ></div>
            </td>
          </tr>
          <tr className="bg-green-600">
            <th className="w-32 px-2">
              <div className="flex flex-row justify-between w-full">
                <span>{t("pokemonStats.sp-defense")}: </span>
                <span>{stats.special_defense}</span>
              </div>
            </th>
            <td>
              <div
                style={{ width: `${(stats.special_defense * 100) / 255}%` }}
                className={`bg-green-700 h-full border-2 border-green-800`}
              ></div>
            </td>
          </tr>
          <tr className="bg-rose-300">
            <th className="w-32 px-2">
              <div className="flex flex-row justify-between w-full">
                <span>{t("pokemonStats.speed")}: </span>
                <span>{stats.speed}</span>
              </div>
            </th>
            <td>
              <div
                style={{ width: `${(stats.speed * 100) / 255}%` }}
                className={`bg-rose-400 h-full border-2 border-rose-500`}
              ></div>
            </td>
          </tr>
          <tr className="bg-purple-300">
            <th className="w-32 px-2">
              <div className="flex flex-row justify-between w-full">
                <span>Total: </span>
                <span>
                  {stats.hp +
                    stats.attack +
                    stats.defense +
                    stats.special_attack +
                    stats.special_defense +
                    stats.speed}
                </span>
              </div>
            </th>
            <td>
              <div
                style={{
                  width: `${
                    ((stats.hp +
                      stats.attack +
                      stats.defense +
                      stats.special_attack +
                      stats.special_defense +
                      stats.speed) *
                      100) /
                    1530
                  }%`,
                }}
                className={`bg-purple-400 h-full border-2 border-purple-500`}
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokemonStats;
