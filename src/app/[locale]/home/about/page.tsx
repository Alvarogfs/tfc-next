import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { getI18n } from "@/locales/server";

const About = async() => {
  const t = await getI18n()
  return (
    <main className="bg-white px-8 min-h-[80vh]">
      <div className="container flex flex-col gap-12 py-7">
        <h2 className="text-2xl font-bold">{t("about.title")}</h2>
        <a href="https://www.iestrassierra.com">
        <Image
          src={
            "https://www.iestrassierra.com/wp-content/uploads/2020/07/Logo-Trassierra-Letras.jpg"
          }
          alt="trassierra"
          width={274}
          height={194}
        ></Image>
        </a>
        <p>
          {t("about.p1")}
        </p>
        <p>
        {t("about.p2")}
        </p>
      </div>
      <div className="flex flex-row w-full gap-12">
        <div>
          <span>
        <FontAwesomeIcon icon={faEnvelope} />{" "}
            <a href="mailto:alvarogomesalferes@gmail.com">alvarogomesalferes@gmail.com</a></span>
        </div>
        <div>
          <span>
        <FontAwesomeIcon icon={faPhone} />{" "}
            <a href="tel:+34659887051">659887051</a></span>
        </div>
        <div>
          <span>
            {/* @ts-ignore */}
          <FontAwesomeIcon icon={faGithub} />{" "}
            <a href="https://github.com/Alvarogfs/tfc-next">Github</a>
          </span>
        </div>
      </div>
    </main>
  );
};

export default About;
