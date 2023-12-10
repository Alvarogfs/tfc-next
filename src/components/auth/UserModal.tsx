"use client";

import {
  Avatar,
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { User } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useRef, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { editUser, revalidateLayout } from "@/utils/actions";
import { useI18n } from "@/locales/client";

const UserModal: FC<{ user?: User }> = ({ user }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const [name, setName] = useState(user?.name!);
  const [imageName, setImageName] = useState("");
  const searchParams = useSearchParams();
  const t = useI18n()
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession()
  function onCloseModal() {
    router.replace(pathname);
  }
  const updateUser = async() => {
    const newUser = await editUser(name, preview ? { content: preview, name: imageName } : undefined);
    await session.update(newUser)
    await revalidateLayout()
    onCloseModal()
  };
  const changeImage = async () => {
    if (!inputRef.current?.files?.[0]) return setPreview(undefined);
    const base64 = await getBase64(inputRef.current?.files[0]);
    const fileNameArray = inputRef.current?.files[0].name.split(".");
    const fileName = `${crypto.randomUUID()}.${
      fileNameArray[fileNameArray.length - 1]
    }`;
    setImageName(fileName);
    // @ts-ignore
    setPreview(base64);
  };
  const getBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString());
      reader.onerror = reject;
    });
  if (!user) return null;
  return (
    <Modal
      className="z-50 bg-gray-900 bg-opacity-50"
      show={searchParams.get("editUser") === "true"}
      size="md"
      onClose={onCloseModal}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {t("user-modal.title")}
          </h3>

          <Avatar
            img={() => (
              <div
                className="relative hover:opacity-75 transition-opacity cursor-pointer"
                onClick={() => inputRef.current?.click()}
              >
                <Image
                  src={preview ?? user.image ?? "/img/avatar_placeholder.jpg"}
                  alt="User image"
                  width={128}
                  height={128}
                  className="rounded-full w-32 h-32 object-cover"
                />
                <FontAwesomeIcon
                  className="absolute left-[37%] top-[40%] text-xl opacity-85  bg-black text-white p-2 rounded-full bg-opacity-40"
                  icon={faImage}
                />
              </div>
            )}
          ></Avatar>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            onChange={changeImage}
            ref={inputRef}
          />
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value={t("user-modal.your-email")} />
            </div>
            <TextInput
              id="email"
              placeholder="name@company.com"
              value={user?.email!}
              disabled
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value={t("user-modal.name")} />
            </div>
            <TextInput
              id="name"
              placeholder="Jane doe"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-row justify-between">
            <Button color="failure" className="border-0" onClick={onCloseModal}>
            {t("user-modal.cancel")}
            </Button>
            <Button color="success" className="border-0" onClick={updateUser}>
            {t("user-modal.edit")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
const UserModalWrapper:FC<{ user?: User }> = ({ user }) => <SessionProvider><UserModal user={user}></UserModal></SessionProvider>
export default UserModalWrapper;
