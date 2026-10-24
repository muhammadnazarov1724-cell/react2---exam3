import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { axiosRequest, handleLogout } from "../utils/token";
import { useUserStore } from "../store/useUserStore";

export default function DashboardHeader({
  sidebarOpen,
  onToggleSidebar,
  theme,
}: {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  theme?: {
    dark: boolean;
    setDark: (value: boolean) => void;
  };
}) {
  const { t, i18n } = useTranslation();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const viewProfileRef = useRef<HTMLAnchorElement>(null);

  const [localDark, setLocalDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  const dark = theme ? theme.dark : localDark;
  const setDark = theme ? theme.setDark : setLocalDark;

  useEffect(() => {
    if (user || !localStorage.getItem("token")) return;

    let active = true;

    async function loadUser() {
      try {
        const { data } = await axiosRequest.get("/users/me");
        if (active) setUser(data);
      } catch (error) {
        if (active) console.error("Не удалось загрузить профиль:", error);
      }
    }

    loadUser();
    return () => {
      active = false;
    };
  }, [user, setUser]);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (!profileOpen) return;

    viewProfileRef.current?.focus();

    function closeOutside(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !profileMenuRef.current?.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [profileOpen]);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const buttonStyle =
    "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-[var(--text-muted)] transition-[color,background-color,transform] duration-200 hover:bg-[var(--surface)] hover:text-[#477eff] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff] motion-reduce:transform-none motion-reduce:transition-none";

  return (
    <div
      className={`dashboard-header sticky top-0 flex min-h-[76px] flex-wrap items-center justify-between gap-2 bg-[var(--background)] px-4 py-3 font-[Arial,sans-serif] transition-colors duration-200 sm:px-10 ${profileOpen ? "z-50" : "z-30"}`}
    >
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={t(
          sidebarOpen ? "dashboardHeader.hideMenu" : "dashboardHeader.showMenu",
        )}
        aria-expanded={sidebarOpen}
        aria-controls="dashboard-sidebar"
        className={`${buttonStyle} bg-[var(--surface)]`}
      >
        <svg
          width="23"
          height="23"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="flex items-center gap-1 sm:gap-3">
        <select
          aria-label={t("header.language")}
          value={i18n.resolvedLanguage || "ru"}
          onChange={(event) => void i18n.changeLanguage(event.target.value)}
          className="h-10 cursor-pointer rounded-xl border border-[var(--features-border)] bg-[var(--card-background)] px-3 text-sm text-[var(--text-primary)] outline-none hover:border-[#477eff] focus:ring-2 focus:ring-[#477eff30]"
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
          <option value="tj">TJ</option>
        </select>

        <span
          className="hidden h-10 w-8 items-center justify-center text-[#82cbb3] sm:flex"
          title={t("sidebar.dashboard")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path
              d="m7.5 12 3 3 6-6"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <button
          type="button"
          onClick={() => setDark(!dark)}
          aria-label={t(dark ? "header.lightTheme" : "header.darkTheme")}
          title={t(dark ? "header.lightTheme" : "header.darkTheme")}
          className={buttonStyle}
        >
          {dark ? (
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M20 15.4A8.5 8.5 0 0 1 8.6 4 8.5 8.5 0 1 0 20 15.4Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="4"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        <span
          className="flex h-10 w-9 items-center justify-center text-[var(--text-muted)]"
          role="img"
          aria-label={t("dashboardHeader.notifications")}
          title={t("dashboardHeader.notifications")}
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2a2 2 0 0 1 2 2v.3a6 6 0 0 1 4 5.7v4l2 3v1H4v-1l2-3v-4a6 6 0 0 1 4-5.7V4a2 2 0 0 1 2-2Z" />
            <path d="M9 20h6a3 3 0 0 1-6 0Z" opacity="0.65" />
          </svg>
        </span>

        <button
          type="button"
          onClick={toggleFullscreen}
          className={buttonStyle}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
              fill="currentColor"
              opacity="0.3"
            />
            <path
              d="M13 7h4v4m0-4-6 6M7 17h4m-4 0v-4"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          ref={profileMenuRef}
          className="relative ml-1 shrink-0"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setProfileOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setProfileOpen(false);
              profileButtonRef.current?.focus();
            }
          }}
        >
          <button
            ref={profileButtonRef}
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            aria-label={t("dashboardHeader.profile")}
            title={t("dashboardHeader.profile")}
            aria-expanded={profileOpen}
            aria-haspopup="dialog"
            aria-controls={profileOpen ? "dashboard-profile-menu" : undefined}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-[#c5edff] to-[#66bcfa] text-[27px] ring-2 ring-[var(--background)] transition-[transform,box-shadow] duration-200 hover:scale-105 hover:shadow-[0_3px_12px_#477eff25] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#477eff] active:scale-95 motion-reduce:transform-none motion-reduce:transition-none"
          >
            <span aria-hidden="true">👨🏻‍💻</span>
          </button>

          {profileOpen && (
            <div
              id="dashboard-profile-menu"
              role="dialog"
              aria-labelledby="dashboard-profile-title"
              className="absolute top-[calc(100%+12px)] right-0 max-h-[calc(100dvh-132px)] w-[260px] max-w-[calc(100vw-32px)] origin-top-right overflow-y-auto overscroll-contain rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] shadow-[0_8px_32px_#172b4d14] transition-[opacity,translate,scale] duration-200 starting:translate-y-2 starting:scale-95 starting:opacity-0 motion-reduce:transition-none"
            >
              <div className="flex items-center gap-3 px-4 py-5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#c5edff] to-[#66bcfa] text-[27px]"
                  aria-hidden="true"
                >
                  👨🏻‍💻
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-[var(--text-primary)]">
                    {user?.name || t("sidebar.user")}
                  </p>
                  <p className="mt-1 text-[11px] text-[var(--text-muted)]">
                    {t("profilePage.owner")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label={t("sidebar.logout")}
                  title={t("sidebar.logout")}
                  className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-[#ed252a20] text-[#ed252a] transition-[background-color,color,transform] duration-200 hover:bg-[#dc2626] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed252a] active:scale-95 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4m5-13 5 5-5 5m-7-5h12"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2 border-b-2 border-[#477eff] px-5 pt-2 pb-3 text-[#477eff]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M5 20v-1a7 7 0 0 1 14 0v1H5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2
                  id="dashboard-profile-title"
                  className="text-[13px] font-medium"
                >
                  {t("dashboardHeader.profile")}
                </h2>
              </div>

              <div className="space-y-1 p-2">
                <button
                  type="button"
                  disabled
                  className="flex min-h-10 w-full cursor-not-allowed items-center gap-3 rounded-[8px] bg-[var(--surface)] px-3 text-left text-[12px] text-[#477eff]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <path
                      d="m14 5 5 5M4 20l4.5-1 11-11a3.2 3.2 0 0 0-4.5-4.5l-11 11L3 20h1Zm0 3h16"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{t("dashboardHeader.editProfile")}</span>
                </button>

                <NavLink
                  ref={viewProfileRef}
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="group flex min-h-10 items-center gap-3 rounded-[8px] px-3 text-[12px] text-[var(--text-muted)] outline-none transition-[color,background-color] duration-200 hover:bg-[var(--surface)] hover:text-[#477eff] focus-visible:bg-[var(--surface)] focus-visible:text-[#477eff] focus-visible:ring-2 focus-visible:ring-[#477eff] motion-reduce:transition-none"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <circle cx="12" cy="7" r="4" opacity="0.5" />
                    <path d="M4 20v-1a8 8 0 0 1 16 0v1H4Z" />
                  </svg>
                  <span>{t("dashboardHeader.viewProfile")}</span>
                </NavLink>

                <NavLink
                  ref={viewProfileRef}
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="group flex min-h-10 items-center gap-3 rounded-[8px] px-3 text-[12px] text-[var(--text-muted)] outline-none transition-[color,background-color] duration-200 hover:bg-[var(--surface)] hover:text-[#477eff] focus-visible:bg-[var(--surface)] focus-visible:text-[#477eff] focus-visible:ring-2 focus-visible:ring-[#477eff] motion-reduce:transition-none"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <circle cx="12" cy="7" r="4" opacity="0.5" />
                    <path d="M4 20v-1a8 8 0 0 1 16 0v1H4Z" />
                  </svg>
                  <span>{t("dashboardHeader.socialProfile")}</span>
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex min-h-10 w-full cursor-pointer items-center gap-3 rounded-[8px] px-3 text-left text-[12px] text-[var(--text-muted)] outline-none transition-[color,background-color] duration-200 hover:bg-[#ed252a10] hover:text-[#ed252a] focus-visible:bg-[#ed252a10] focus-visible:text-[#ed252a] focus-visible:ring-2 focus-visible:ring-[#ed252a] motion-reduce:transition-none"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0"
                  >
                    <path
                      d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4m5-13 5 5-5 5m-7-5h12"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{t("sidebar.logout")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
