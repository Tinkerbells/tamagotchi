import * as React from "react";
import { WithResourcesPanel } from "../screen";
import { useGratitude } from "./hooks";
import { Heart } from "@/shared";
import { GratitudesWidget, GratitudeWidgetSkeleton } from "@/modules";

interface MessageInputProps {
  createGratitude: (message: string) => void;
  isGratitudeCreating: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ createGratitude, isGratitudeCreating }) => {
  const [message, setMessage] = React.useState("");

  const sendMessage = React.useCallback(() => {
    if (!message.trim()) return;
    createGratitude(message);
    setMessage("");
  }, [message, createGratitude]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "Done") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative flex items-center w-full h-11 rounded-[17px] overflow-hidden bg-[#fef5e9]">
      <input
        className="w-full h-full pl-4 pr-14 text-sm font-semibold tracking-tighter text-[#ce9c6a] placeholder:text-opacity-40 placeholder:text-[#ce9c6a] border-none outline-none bg-transparent"
        placeholder="Введите ваше сообщение"
        disabled={isGratitudeCreating}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="absolute right-2 flex items-center justify-center w-[34px] h-[34px] rounded-xl bg-[#ce9c6a] text-white disabled:opacity-50"
        onClick={sendMessage}
        disabled={isGratitudeCreating}
      >
        <Heart className="w-[18px] h-4" />
      </button>
    </div>
  );
};

export const GratitudeScreen = () => {
  const {
    data,
    isLoading,
    title,
    description,
    isGratitudeCreating,
    createGratitude,
    currentGratitudes
  } = useGratitude();


  return (
    <WithResourcesPanel
      panel={{
        variant: "gratitude",
        title,
        description,
        renderPrimaryButton: () => <MessageInput isGratitudeCreating={isGratitudeCreating} createGratitude={createGratitude} />,
      }}
      texture="meditation"
    >
      {data && !isLoading ? (
        <GratitudesWidget data={data} current={currentGratitudes} />
      ) : <GratitudeWidgetSkeleton />}
    </WithResourcesPanel>
  );
};
