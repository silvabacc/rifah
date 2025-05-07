import { TourProps } from "antd";
import Azhar from "../assets/azhar.avif";
import { RefObject } from "react";

export const getCreateDuaSteps = (
  ref1: RefObject<HTMLElement | null>,
  ref2: RefObject<HTMLElement | null>,
  ref3: RefObject<HTMLElement | null>
): TourProps["steps"] => {
  return [
    {
      title: <div className="text-2xl">Welcome to Rifah!</div>,
      description: (
        <div className="space-y-2">
          <p>
            In this powerful tool, you can create personalized supplications
            (duas) using only authentic sources from the Qur'an and Sunnah.
          </p>
          <p>
            Whether you're seeking forgiveness, asking for guidance, or making
            dua for loved ones, this builder helps you find the exact words
            taught by the Prophet ﷺ and mentioned in the Qur'an.
          </p>
          <p className="font-bold">💡 How it works:</p>
          <ul className="list-disc pl-6">
            <li>
              Browse or search authentic duas by theme (e.g., anxiety,
              gratitude, health).
            </li>
            <li>
              Select your favorite duas to add them to your personal collection.
            </li>
            <li>
              Build a custom dua sequence that you can read daily or share with
              others.
            </li>
          </ul>
          <p>
            Let's get started crafting meaningful, authentic duas that speak
            from the heart — and follow the guidance of revelation.
          </p>
        </div>
      ),
      cover: <img alt="tour.png" src={Azhar} />,
    },
    {
      title: "Dua list",
      description: (
        <div>
          Here is a list of authentic duas from the Quran and Sunnah. You can
          drag a card over to the next column to start building your dua. You
          can drag and drop in whichever order you like
        </div>
      ),
      ...(ref2.current ? { target: () => ref2.current as HTMLElement } : {}),
    },
    {
      title: "Name your dua",
      description: <div>Once you are happy, name your dua</div>,
      ...(ref1.current ? { target: () => ref1.current as HTMLElement } : {}),
    },
    {
      title: "Saved Duas",
      description: <div>You will be able to find your saved duas here!</div>,
      ...(ref3.current ? { target: () => ref3.current as HTMLElement } : {}),
    },
  ];
};
