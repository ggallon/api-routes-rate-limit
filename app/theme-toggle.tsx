"use client";

import { useEffect, useState, useCallback } from "react";
import { themeEffect } from "./theme-effect";

export function ThemeToggle(
  { themeName }: { themeName?: boolean } = { themeName: false },
) {
  // a `null` preference implies auto
  const [preference, setPreference] = useState<undefined | null | string>(
    undefined,
  );
  const [currentTheme, setCurrentTheme] = useState<null | string>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringOverride, setIsHoveringOverride] = useState(false);

  const onMediaChange = useCallback(() => {
    const current = themeEffect();
    setCurrentTheme(current);
  }, []);

  useEffect(() => {
    setPreference(localStorage.getItem("theme"));
    const current = themeEffect();
    setCurrentTheme(current);

    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    matchMedia.addEventListener("change", onMediaChange);
    return () => matchMedia.removeEventListener("change", onMediaChange);
  }, [onMediaChange]);

  const onStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === "theme") setPreference(event.newValue);
    },
    [setPreference],
  );

  // when the preference changes, whether from this tab or another,
  // we want to recompute the current theme
  useEffect(() => {
    setCurrentTheme(themeEffect());
  }, [preference]);

  useEffect(() => {
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  });

  return (
    <>
      {themeName && isHovering && (
        <span
          className={`
            /*
            mobile
            */
            mr-[-5px] hidden text-[9px]
            text-gray-400
            md:inline
          `}
        >
          {preference === null
            ? "System"
            : preference === "dark"
              ? "Dark"
              : "Light"}
        </span>
      )}

      {/*
        the `theme-auto:` plugin is registered in `tailwind.config.js` and
        works similarly to the `dark:` prefix, which depends on the `theme-effect.ts` behavior
      */}
      <button
        aria-label="Toggle theme"
        className={`inline-flex ${
          isHovering && !isHoveringOverride
            ? "bg-gray-200 dark:bg-[#313131]"
            : ""
        } theme-system:!bg-inherit rounded-full bg-gray-200 p-2
                  transition-[background-color]
                  active:bg-gray-300
                  dark:bg-[#313131]
                  dark:active:bg-[#242424]
                  dark:[&_.moon-icon]:hidden
                  [&_.sun-icon]:hidden
                dark:[&_.sun-icon]:inline`}
        onClick={(ev) => {
          ev.preventDefault();
          // prevent the hover state from rendering
          setIsHoveringOverride(true);

          let newPreference: string | null =
            currentTheme === "dark" ? "light" : "dark";
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";

          // if the user has their current OS theme as a preference (instead of auto)
          // and they click the toggle, we want to switch to reset the preference
          if (preference !== null && systemTheme === currentTheme) {
            newPreference = null;
            localStorage.removeItem("theme");
          } else {
            localStorage.setItem("theme", newPreference);
          }

          setPreference(newPreference);
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setIsHoveringOverride(false);
        }}
      >
        <span className="sun-icon size-4">
          <SunIcon />
        </span>
        <span className="moon-icon size-4">
          <MoonIcon />
        </span>
      </button>
    </>
  );
}

function MoonIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20.01 19.79"
      fill="currentColor"
      fillOpacity=".85"
      {...props}
    >
      <path d="M15.34 13.26c-5.38 0-8.72-3.24-8.72-8.45 0-1.48.25-2.79.6-3.5.15-.27.18-.41.18-.6C7.4.37 7.1 0 6.7 0c-.08 0-.26.03-.54.14A10.22 10.22 0 0 0 0 9.5c0 5.93 4.3 10.25 10.23 10.25 4.25 0 7.7-2.23 9.28-5.88.12-.26.14-.47.14-.58 0-.4-.34-.67-.65-.67-.15 0-.27 0-.5.1-.8.32-1.99.53-3.16.53ZM1.54 9.44a8.95 8.95 0 0 1 4.1-7.52c-.3.91-.47 1.92-.47 3.03 0 6.1 3.72 9.74 9.95 9.74 1 0 1.85-.12 2.66-.4-1.48 2.45-4.34 3.94-7.49 3.94-5.07 0-8.76-3.69-8.76-8.79Z" />
    </svg>
  );
}

function SunIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21.48 21.2"
      fill="currentColor"
      fillOpacity=".85"
      {...props}
    >
      <path d="M10.57 3.8c.46 0 .84-.38.84-.85V.85a.85.85 0 0 0-.84-.85.85.85 0 0 0-.85.85v2.1c0 .47.38.85.85.85Zm4.78 2c.33.32.87.33 1.2 0l1.5-1.5a.87.87 0 0 0 0-1.2.85.85 0 0 0-1.2 0l-1.5 1.5a.85.85 0 0 0 0 1.2Zm1.98 4.8c0 .45.4.84.85.84h2.1c.46 0 .84-.39.84-.84a.85.85 0 0 0-.84-.85h-2.1c-.46 0-.85.39-.85.85Zm-1.98 4.8a.85.85 0 0 0 0 1.18l1.5 1.52c.34.3.87.3 1.2-.01a.86.86 0 0 0 0-1.2l-1.5-1.5a.87.87 0 0 0-1.2 0Zm-4.78 2a.85.85 0 0 0-.85.83v2.11a.85.85 0 0 0 1.69 0v-2.1a.85.85 0 0 0-.84-.85Zm-4.8-2a.89.89 0 0 0-1.2 0l-1.5 1.48a.86.86 0 0 0 0 1.2c.32.3.87.32 1.2 0l1.5-1.5a.86.86 0 0 0 0-1.19ZM3.8 10.6c0-.46-.4-.85-.85-.85H.84c-.46 0-.84.39-.84.85 0 .45.38.84.84.84h2.1c.46 0 .85-.39.85-.84Zm1.97-4.8a.86.86 0 0 0 .01-1.2l-1.5-1.5a.86.86 0 0 0-1.18 0 .86.86 0 0 0-.01 1.2l1.49 1.5c.32.32.86.32 1.2 0ZM10.56 15.58a5.01 5.01 0 0 0 4.97-4.98 5.01 5.01 0 0 0-4.97-5 5.01 5.01 0 0 0-4.97 5 5.01 5.01 0 0 0 4.97 4.98Zm0-1.5a3.51 3.51 0 0 1-3.49-3.48c0-1.92 1.58-3.5 3.49-3.5 1.9 0 3.48 1.58 3.48 3.5 0 1.9-1.58 3.48-3.48 3.48Z" />
    </svg>
  );
}
