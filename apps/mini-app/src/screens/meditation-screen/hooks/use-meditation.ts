import * as React from "react";
import { getIsTimer } from "../utils";
import { useMeditationTimer } from "./use-meditation-timer";
import { useGetPet, useUpdateUser } from "@/data";
import { useAuth } from "@/shared";
import { vkBridge } from "@/shared";
import toast from "react-hot-toast";
import { useCreateMeditation } from "@/data/meditation";

const GEMS_TO_ADD = 5;

export const useMeditation = () => {
  const { user } = useAuth();
  const { timeLeft, isRunning, isFinished, startTimer, stopTimer, toggleTimer, finishSession, progress } = useMeditationTimer();

  const { data: petData, isLoading: isPetDataLoading } = useGetPet({ userId: user.id });
  const { mutate: createMeditation, isPending: isMeditationLoading } = useCreateMeditation();

  const { mutate: updateUser, isPending: isUpdateUserLoading } = useUpdateUser({
    onSuccess: () => {
      finishSession();
      createMeditation({ userId: user.id });
    },
    onError: () => {
      toast.error("Что-то пошло не так!")
      finishSession();
    },
  });

  const [adsState, setAdsState] = React.useState({ isLoading: false, isSuccess: false, error: null });

  const finishMeditation = React.useCallback(() => {
    updateUser({ userId: user.id, gems: user.gems + GEMS_TO_ADD });
  }, [updateUser, user]);

  const loadAds = React.useCallback(async () => {
    setAdsState({ isLoading: true, isSuccess: false, error: null });
    try {
      // @ts-ignore
      const response = await vkBridge.send("VKWebAppShowNativeAds", { ad_format: "reward" });
      if (!response.result) {
        throw new Error("Ошибка при показе рекламы");
      }
      setAdsState({ isLoading: false, isSuccess: true, error: null });
      finishMeditation();
    } catch (error) {
      console.error(error);
      toast.error("Что-то пошло не так!")
      finishSession();
      setAdsState({ isLoading: false, isSuccess: false, error: null });
    }
  }, [finishMeditation]);

  const title = `Медитация с ${petData?.pet?.name || "питомцем"}`;
  const description = "Медитируя с питомцем, вы успокаиваете его и себя. Это снижает уровень стресса и улучшает эмоциональное состояние.";
  const buttonText = getIsTimer() ? (isRunning ? "Завершить медитацию" : "Продолжить медитацию") : "Начать медитацию";

  const isFinishingLoading = isUpdateUserLoading || isMeditationLoading || adsState.isLoading;

  return {
    finishMeditation,
    loadAds,
    isFinishingLoading,
    isAdsSuccess: adsState.isSuccess,
    adsError: adsState.error,
    buttonText,
    title,
    description,
    petData,
    isLoading: isPetDataLoading,
    timeLeft,
    isRunning,
    isFinished,
    startTimer,
    stopTimer,
    toggleTimer,
    finishSession,
    progress,
  };
};
