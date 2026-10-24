import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardStats from "../../components/DashboardStats";
import AddDebtButton from "../../components/AddDebtButton";
import { useDebtStore } from "../../store/useDebtStore";
import EditDebtDialog from "../../components/EditDebtDialog";

export default function Dolgi() {
  const { t, i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate()

  const [openMenuId, serOpenMenuId] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [deleteDebtId, setDeleteDebtId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  const [editDebtId, setEditDebtId] = useState<string | null>(null);
  const editDialogRef = useRef<HTMLDialogElement>(null);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    right: 16,
  });

  const getDebts = useDebtStore((state) => state.getDebts);
  const updateDebt = useDebtStore((state) => state.updateDebt);
  const deleteDebt = useDebtStore((state) => state.deleteDebt);
  const debts = useDebtStore((state) => state.debts);
  
  const query = search.trim().toLowerCase();

  const filteredDebts = debts.filter((debt) => {
  const name = (debt.contact_name ?? "").toLowerCase();

  return name.includes(query);
});

  const editingDebt = debts.find((debt) => debt.id === editDebtId);

  useEffect(() => {
    getDebts();
  }, [getDebts]);

  useEffect(() => {
    const dialog = deleteDialogRef.current;

    if (deleteDebtId !== null) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [deleteDebtId]);

  useEffect(() => {
    if (editDebtId !== null) {
      editDialogRef.current?.showModal();
    }
  }, [editDebtId]);

  function closeDeleteDialog() {
    if (isDeleting) return;
    setDeleteDebtId(null);
    setDeleteError(false);
  }

  async function handleDeleteDebt() {
    if (deleteDebtId === null || isDeleting) return;

    setIsDeleting(true);
    setDeleteError(false);

    try {
      await deleteDebt(deleteDebtId);
      setDeleteDebtId(null);
    } catch (error) {
      console.error("Не удалось удалить долг:", error);
      setDeleteError(true);
    } finally {
      setIsDeleting(false);
    }
  }

  const fieldStyle =
    "h-10 w-full rounded-[15px] border border-[var(--features-border)] bg-[var(--background)] text-[14px] text-[var(--text-muted)] outline-none transition-[border-color,box-shadow,background-color] duration-200 hover:border-[#aebed8] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff20] motion-reduce:transition-none";
  const iconButtonStyle =
    "flex h-10 w-10 shrink-0 cursor-not-allowed items-center justify-center rounded-[14px] border border-[var(--features-border)] bg-[var(--background)] text-[var(--text-muted)]";
  const rowStyle =
    "grid grid-cols-[1.25fr_0.7fr_1.6fr_1.45fr_32px] items-center gap-4 px-5";
  const locale = i18n.resolvedLanguage === "tj" ? "tg" : i18n.resolvedLanguage;

  function formatDate(value: string) {
    const date = new Date(value.length === 10 ? `${value}T00:00:00` : value);
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

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
        />

        <div className="flex-1 px-5 pt-7 pb-12 sm:px-10 sm:pt-9">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-[24px] font-semibold tracking-tight">
              Adl 5:8
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled
                className="flex min-h-9 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[var(--features-border)] bg-[var(--card-background)] px-3.5 py-2 text-[13px] font-medium"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3v12m-4-4 4 4 4-4M5 14v4a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t("debtsPage.export")}
              </button>
              <button
                type="button"
                disabled
                className="flex min-h-9 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#477eff] px-4 py-2 text-[13px] font-medium text-white shadow-[0_3px_8px_#477eff18]"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" fill="currentColor" />
                  <path
                    d="M12 5v14m3-11h-4a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4H9"
                    stroke="#477eff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                {t("debtsPage.quickPayment")}
              </button>
            </div>
          </div>

          <DashboardStats />

          <div className="mt-7 border-t border-[var(--features-border)] pt-4 sm:mt-8">
            <div className="dashboard-chart min-w-0 rounded-[22px] border border-[var(--features-border)] bg-[var(--card-background)] p-3.5 shadow-[0_2px_4px_#172b4d03] transition-[background-color,box-shadow] duration-300 hover:shadow-[0_8px_30px_#172b4d06] motion-reduce:transition-none">
              <div className="relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[var(--text-muted)]"
                >
                  <circle
                    cx="10.5"
                    cy="10.5"
                    r="7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="m16 16 5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t(
                    debts.length === 0
                      ? "debtsPage.empty"
                      : "debtsPage.noResults",
                  )}
                  className={`${fieldStyle} pr-4 pl-11`}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <div className="relative w-full min-w-0 sm:w-auto sm:flex-1">
                  <select
                    aria-label={t("debtsPage.allContacts")}
                    disabled
                    className={`${fieldStyle} cursor-not-allowed appearance-none pr-9 pl-3`}
                  >
                    <option>{t("debtsPage.allContacts")}</option>
                  </select>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--text-muted)]"
                  >
                    <path d="m4 6 4 4 4-4" fill="currentColor" />
                  </svg>
                </div>
                <div className="relative w-full min-w-0 sm:w-auto sm:flex-1">
                  <select
                    aria-label={t("debtsPage.allFolders")}
                    disabled
                    className={`${fieldStyle} cursor-not-allowed appearance-none pr-9 pl-3`}
                  >
                    <option>{t("debtsPage.allFolders")}</option>
                  </select>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[var(--text-muted)]"
                  >
                    <path d="m4 6 4 4 4-4" fill="currentColor" />
                  </svg>
                </div>
                <div className="ml-auto flex gap-2">
                  <button
                    type="button"
                    disabled
                    aria-label={t("debtsPage.filters")}
                    title={t("debtsPage.filters")}
                    className={iconButtonStyle}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 6h18M6 12h12m-9 6h6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    disabled
                    aria-label={t("debtsPage.sort")}
                    title={t("debtsPage.sort")}
                    className={iconButtonStyle}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 21V3m-4 4 4-4 4 4m6-4v18m-4-4 4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                role="table"
                aria-label={t("sidebar.debts")}
                className="mt-3 overflow-x-auto rounded-b-[14px]"
              >
                <div className="min-w-[900px]">
                  <div role="rowgroup">
                    <div
                      role="row"
                      className={`${rowStyle} min-h-12 border-y border-[var(--features-border)] bg-[var(--background)] py-3 text-[10px] font-medium tracking-wide text-[var(--text-muted)] uppercase`}
                    >
                      <div
                        role="columnheader"
                        className="border-r border-[var(--features-border)]"
                      >
                        {t("debtsPage.fullName")}
                      </div>
                      <div
                        role="columnheader"
                        className="border-r border-[var(--features-border)]"
                      >
                        {t("debtsPage.amount")}
                      </div>
                      <div
                        role="columnheader"
                        className="border-r border-[var(--features-border)]"
                      >
                        {t("debtsPage.progress")}
                      </div>
                      <div
                        role="columnheader"
                        className="border-r border-[var(--features-border)]"
                      >
                        {t("debtsPage.dueDate")}
                      </div>
                      <div role="columnheader">
                        <span className="sr-only">
                          {t("debtsPage.actions")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div role="rowgroup">
                    {filteredDebts.map((debt) => {
                      const incoming = debt.direction === "they_owe_me";
                      const name = debt.contact_name || t("sidebar.user");

                      return (
                        <div
                          key={debt.id}
                          onClick={()=> navigate(`/dolgi/${debt.id}`)}
                          role="row"
                          className={`${rowStyle} group min-h-[58px] border-b border-[var(--features-border)] py-3 text-[12px] transition-colors duration-200 last:border-b-0 hover:bg-[var(--background)] focus-within:bg-[var(--surface)] motion-reduce:transition-none`}
                        >
                          <div
                            role="cell"
                            className="flex min-w-0 items-center gap-3"
                          >
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[13px] transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none ${incoming ? "bg-[#2aaf8710] text-[#2aaf87]" : "bg-[#ed252a10] text-[#ed252a]"}`}
                            >
                              <svg
                                width="21"
                                height="21"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                              >
                                <path
                                  d="m8 3 2 4h4l2-4H8Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M9 8c-2 2-5 5-5 8a8 8 0 0 0 16 0c0-3-3-6-5-8H9Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M12 11v9m2-7h-3a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 1 0 3h-3"
                                  stroke="var(--card-background)"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d={
                                    incoming
                                      ? "M21 3h-4v4m0-4 4 4"
                                      : "M17 3h4v4m0-4-4 4"
                                  }
                                  stroke="var(--card-background)"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d={
                                    incoming
                                      ? "M21 3h-4v4m0-4 4 4"
                                      : "M17 3h4v4m0-4-4 4"
                                  }
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span
                              className="min-w-0 truncate font-semibold"
                              title={name}
                            >
                              {name}
                            </span>
                          </div>

                          <div
                            role="cell"
                            className="flex min-w-0 flex-wrap items-baseline gap-1 tabular-nums"
                          >
                            <span
                              className={`text-[13px] font-semibold ${incoming ? "text-[#2aaf87]" : "text-[#ed252a]"}`}
                            >
                              {incoming ? "+" : "-"}
                              {Number(debt.amount).toLocaleString(locale, {
                                maximumFractionDigits: 2,
                              })}
                            </span>
                            <span className="text-[11px] text-[var(--text-muted)]">
                              {debt.currency}
                            </span>
                          </div>

                          <div
                            role="cell"
                            className="min-w-0"
                            aria-label={t("debtsPage.progress")}
                          >
                            <div className="mb-2 text-right text-[11px] text-[var(--text-muted)]">
                              —
                            </div>
                            <div
                              aria-hidden="true"
                              className={`h-[3px] rounded-full ${incoming ? "bg-[#2aaf8720]" : "bg-[#ed252a20]"}`}
                            />
                          </div>

                          <div
                            role="cell"
                            className="flex min-w-0 items-start gap-1.5 text-[11px] leading-5 text-[var(--text-muted)]"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              aria-hidden="true"
                              className="mt-0.5 shrink-0"
                            >
                              <rect
                                x="3"
                                y="5"
                                width="18"
                                height="16"
                                rx="3"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M7 3v4m10-4v4M3 10h18M8 14h1m3 0h1m3 0h1m-9 3h1m3 0h1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span>
                              {formatDate(debt.created_at)}
                              {" – "}
                              {debt.due_date ? formatDate(debt.due_date) : "—"}
                            </span>
                          </div>

                          <div role="cell" className="flex justify-center">
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                 if (openMenuId === debt.id) {
                                 serOpenMenuId(null);
                                 return;
                               }

                                const rect =
                                  event.currentTarget.getBoundingClientRect();

                                setMenuPosition({
                                  top: Math.max(
                                    16,
                                    Math.min(
                                      rect.bottom + 8,
                                      window.innerHeight - 112,
                                    ),
                                  ),
                                  right: Math.max(
                                    16,
                                    Math.min(
                                      window.innerWidth - rect.right,
                                      window.innerWidth - 256,
                                    ),
                                  ),
                                });

                                serOpenMenuId(debt.id);
                              }}
                              type="button"
                              aria-label={t("debtsPage.actionsFor", { name })}
                              title={t("debtsPage.actions")}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] transition-[background-color,color,transform] duration-200 hover:bg-[var(--surface)] hover:text-[#477eff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff] active:scale-90 motion-reduce:transform-none motion-reduce:transition-none"
                            >
                              <svg
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                              >
                                <circle
                                  cx="12"
                                  cy="5"
                                  r="1.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="1.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                                <circle
                                  cx="12"
                                  cy="19"
                                  r="1.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {debts.length === 0 && (
                      <div role="row">
                        <div
                          role="cell"
                          aria-colspan={5}
                          className="flex min-h-[180px] items-center justify-center px-4 py-10 text-center text-[14px] text-[var(--text-muted)]"
                        >
                          {t("debtsPage.empty")}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
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

      {openMenuId !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/25"
          onClick={() => serOpenMenuId(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              serOpenMenuId(null);
            }
          }}
        >
          <div
            style={menuPosition}
            onClick={(event) => event.stopPropagation()}
            className="fixed w-[240px] rounded-[14px] border border-[var(--features-border)] bg-[var(--card-background)] p-2 shadow-xl"
          >
            <button
              type="button"
              onClick={() => {
                setEditDebtId(openMenuId);
                serOpenMenuId(null);
              }}
              className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-[14px] text-[var(--text-muted)]"
            >
              <span aria-hidden="true">✎</span>
              {t("debtsPage.edit")}
            </button>

            <button
              type="button"
              autoFocus
              onClick={() => {
                setDeleteError(false);
                setDeleteDebtId(openMenuId);
                serOpenMenuId(null);
              }}
              className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-left text-[14px] text-[#ed252a] transition-colors hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-[#ed252a]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6m4-6v6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("debtsPage.delete")}
            </button>
          </div>
        </div>
      )}

      <dialog
        ref={deleteDialogRef}
        aria-labelledby="delete-debt-title"
        aria-describedby="delete-debt-message"
        aria-busy={isDeleting}
        onCancel={(event) => {
          event.preventDefault();
          closeDeleteDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDeleteDialog();
        }}
        className="add-debt-dialog fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[420px] overflow-y-auto rounded-[14px] border border-[var(--features-border)] bg-[var(--card-background)] p-0 text-[var(--text-primary)] shadow-xl backdrop:bg-black/40"
      >
        <div className="p-6">
          <h2 id="delete-debt-title" className="text-[18px] font-semibold">
            {t("debtsPage.deleteTitle")}
          </h2>

          <p
            id="delete-debt-message"
            className="mt-5 text-[14px] text-[var(--text-muted)]"
          >
            {t("debtsPage.deleteMessage")}
          </p>

          {deleteError && (
            <p role="alert" className="mt-4 text-[14px] text-[#ed252a]">
              {t("debtsPage.deleteFailed")}
            </p>
          )}

          <div className="mt-7 flex justify-end gap-2">
            <button
              type="button"
              autoFocus
              disabled={isDeleting}
              onClick={closeDeleteDialog}
              className="cursor-pointer rounded-lg px-4 py-2 text-[14px] text-[var(--text-muted)] hover:bg-[var(--surface)] disabled:cursor-wait disabled:opacity-60"
            >
              {t("addDebtDialog.cancel")}
            </button>

            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteDebt}
              className="cursor-pointer rounded-lg bg-[#ed252a] px-4 py-2 text-[14px] text-white hover:bg-[#d61f24] disabled:cursor-wait disabled:opacity-60"
            >
              {t(isDeleting ? "debtsPage.deleting" : "debtsPage.delete")}
            </button>
          </div>
        </div>
      </dialog>

      {editingDebt && (
        <EditDebtDialog
          key={editingDebt.id}
          dialogRef={editDialogRef}
          currency={editingDebt.currency}
          defaultValues={{
            name: editingDebt.contact_name ?? "",
            amount: editingDebt.amount,
            direction: editingDebt.direction,
            due_date: editingDebt.due_date?.slice(0, 10) ?? "",
            description: editingDebt.description ?? "",
          }}
          onClose={() => {
            editDialogRef.current?.close();
            setEditDebtId(null);
          }}
          onSubmit={async (data) => {
            if (!editingDebt) return;

            await updateDebt(editingDebt.id, {
              name: data.name,
              contact_id: editingDebt.contact_id,
              amount: data.amount,
              direction: data.direction,
              description: data.description,
              due_date: data.due_date || undefined,
            });

            editDialogRef.current?.close();
            setEditDebtId(null);
          }}
        />
      )}

      <AddDebtButton />
    </div>
  );
}
