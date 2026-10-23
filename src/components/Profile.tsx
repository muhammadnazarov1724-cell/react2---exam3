import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import AddDebtButton from "./AddDebtButton";
import { handleLogout } from "../utils/token";
import { useUserStore } from "../store/useUserStore";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  return (
    <div className="flex min-h-screen bg-[var(--background)] font-[Arial,sans-serif] text-[var(--text-primary)] transition-colors duration-200">
      <div
        id="dashboard-sidebar"
        inert={!sidebarOpen}
        className={`shrink-0 overflow-clip transition-[width] duration-300 ease-in-out motion-reduce:transition-none ${sidebarOpen ? "w-[76px] sm:w-[252px]" : "w-0"}`}
      >
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          theme={{ dark, setDark }}
        />

        <div className="flex-1 px-5 pt-5 pb-12 sm:px-10 sm:pt-7">
          <h1 className="text-[24px] font-semibold tracking-tight">
            {t("sidebar.profile")}
          </h1>

          <div className="mt-4 space-y-3.5">
            <div className="dashboard-chart flex min-h-[190px] flex-col items-center justify-center rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] px-5 py-8 transition-[background-color,box-shadow] duration-200 hover:shadow-[0_8px_28px_#477eff08] motion-reduce:transition-none">
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#b8e7ff] to-[#66bcfa] text-[42px] ring-2 ring-[#477eff] ring-offset-2 ring-offset-[var(--card-background)] transition-transform duration-200 hover:scale-105 motion-reduce:transform-none"
                role="img"
                aria-label={t("profilePage.avatar")}
              >
                👨🏻‍💻
              </span>
              <div className="mt-4 flex max-w-full items-center gap-2">
                <h2 className="min-w-0 truncate text-[20px] font-semibold">
                  {user?.name || t("sidebar.user")}
                </h2>
                <button
                  type="button"
                  disabled
                  aria-label={t("profilePage.editName")}
                  className="flex h-6 w-6 shrink-0 cursor-not-allowed items-center justify-center rounded text-[#477eff]"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m14 5 5 5M4 20l4.5-1 11-11a3.2 3.2 0 0 0-4.5-4.5l-11 11L3 20h1Zm0 3h16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <span className="mt-1.5 rounded-full bg-[var(--surface)] px-2 py-0.5 text-[11px] font-medium text-[#477eff]">
                {t("profilePage.owner")}
              </span>
            </div>

            <button
              type="button"
              disabled
              className="dashboard-chart flex min-h-[62px] w-full cursor-not-allowed items-center gap-3.5 rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] px-4 py-3 text-left"
              style={{ animationDelay: "220ms" }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#32c5d415] text-[#32c5d4]">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="6" r="3" />
                  <circle cx="17" cy="7" r="2.5" opacity="0.75" />
                  <ellipse cx="8" cy="14" rx="5" ry="3" />
                  <ellipse cx="18" cy="14" rx="3.5" ry="2.5" opacity="0.75" />
                  <circle cx="12" cy="19" r="3.5" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold">
                  {t("profilePage.users")}
                </span>
                <span className="mt-0.5 block text-[11px] leading-4 text-[var(--text-muted)]">
                  {t("profilePage.usersDescription")}
                </span>
              </span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-[var(--text-muted)]"
              >
                <path
                  d="m9 5 7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <NavLink
              to="/contact"
              className="dashboard-chart group flex min-h-[62px] items-center gap-3.5 rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] px-4 py-3 transition-[border-color,box-shadow] duration-200 hover:border-[var(--border)] hover:shadow-[0_6px_20px_#2aaf870a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff] motion-reduce:transition-none"
              style={{ animationDelay: "260ms" }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#2aaf8715] text-[#2aaf87]">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="7" r="4" />
                  <ellipse cx="9" cy="18" rx="8" ry="4" />
                  <path
                    d="M15 3a4 4 0 0 1 0 8m3 3c3 0 5 2 5 4s-2 3-5 3"
                    opacity="0.6"
                  />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold">
                  {t("sidebar.contacts")}
                </span>
                <span className="mt-0.5 block text-[11px] leading-4 text-[var(--text-muted)]">
                  {t("profilePage.contactsDescription")}
                </span>
              </span>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-[var(--text-muted)] transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:text-[#2aaf87] motion-reduce:translate-x-0 motion-reduce:transition-none"
              >
                <path
                  d="m9 5 7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>

            <div
              className="dashboard-chart overflow-hidden rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)]"
              style={{ animationDelay: "300ms" }}
            >
              <h2 className="border-b border-[var(--features-border)] px-4 py-4 text-[13px] font-semibold">
                {t("profilePage.settings")}
              </h2>
              <div className="px-4 pb-6 sm:px-5">
                <div className="flex min-h-[68px] items-center gap-3.5 border-b border-[var(--features-border)] px-1 sm:px-3">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-[var(--text-muted)]"
                  >
                    <path
                      d="M20 15.4A8.5 8.5 0 0 1 8.6 4 8.5 8.5 0 1 0 20 15.4Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="flex-1 text-[13px] text-[var(--text-muted)]">
                    {t("profilePage.darkMode")}
                  </span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={dark}
                    aria-label={t("profilePage.darkMode")}
                    onClick={() => setDark(!dark)}
                    className={`flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                      dark ? "bg-[#477eff]" : "bg-[#bcc7d0]"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        dark ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="px-1 pt-3 sm:px-3">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-medium">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="text-[#477eff]"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="22"
                        height="22"
                        rx="6"
                        fill="currentColor"
                      />
                      <path
                        d="M6 8h12M12 5v3m3 0c-.8 5-3.7 7.6-7 9m1-6c1.5 3 4 5 7 6"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{t("header.language")}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {[
                      { value: "en", label: "🇬🇧 English" },
                      { value: "ru", label: "🇷🇺 Русский" },
                      { value: "tj", label: "🇹🇯 Тоҷикӣ" },
                    ].map((language) => (
                      <button
                        key={language.value}
                        type="button"
                        onClick={() => i18n.changeLanguage(language.value)}
                        aria-pressed={i18n.resolvedLanguage === language.value}
                        className={`min-h-9 min-w-0 cursor-pointer rounded-[12px] border px-3 py-2 text-[11px] ${i18n.resolvedLanguage === language.value ? "border-[#477eff] bg-[var(--surface)] font-semibold text-[#477eff] shadow-[0_0_0_1px_#477eff20]" : "border-[var(--features-border)] text-[var(--text-primary)]"}`}
                      >
                        {language.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              type="button"
              className="dashboard-chart group flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-[#ed252a80] bg-transparent px-4 py-2 text-[13px] font-medium text-[#ed252a] transition-[translate,scale,color,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#dc2626] hover:bg-[#dc2626] hover:text-white hover:shadow-[0_8px_20px_#ed252a25] active:translate-y-0 active:scale-[0.99] active:bg-[#b91c1c] active:shadow-[0_2px_6px_#ed252a20] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ed252a] motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:transition-none"
              style={{ animationDelay: "340ms" }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0 transition-[translate] duration-200 group-hover:translate-x-0.5 motion-reduce:translate-x-0 motion-reduce:transition-none"
              >
                <path
                  d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4m5-13 5 5-5 5m-7-5h12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("sidebar.logout")}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-28 text-[11px] text-[var(--text-muted)] sm:px-10">
          <p>{t("footer.copyright")}</p>
          <NavLink
            to="/"
            className="rounded py-1 transition-colors duration-200 hover:text-[#477eff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff]"
          >
            {t("sidebar.home")}
          </NavLink>
        </div>
      </div>

      <AddDebtButton />
    </div>
  );
}
