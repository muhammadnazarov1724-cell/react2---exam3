import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import DashboardHeader from '../../components/DashboardHeader'
import AddDebtButton from '../../components/AddDebtButton'
import ContactDialog from '../../components/ContactDialog'
import { useContactStore, type Contact as ContactData } from '../../store/useContactStore'
import { useDebtStore } from '../../store/useDebtStore'
import { useUserStore } from '../../store/useUserStore'

export default function Contact() {
  const { t, i18n } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [search, setSearch] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<ContactData | undefined>()
  const [menuContact, setMenuContact] = useState<ContactData | null>(null)
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 16 })
  const [deletingContact, setDeletingContact] = useState<ContactData | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState(false)
  const deleteDialogRef = useRef<HTMLDialogElement>(null)
  const userId = useUserStore((state) => state.user?.id)
  const contacts = useContactStore((state) => state.contacts)
  const balances = useContactStore((state) => state.balances)
  const isLoading = useContactStore((state) => state.isLoading)
  const error = useContactStore((state) => state.error)
  const getContacts = useContactStore((state) => state.getContacts)
  const saveContact = useContactStore((state) => state.saveContact)
  const deleteContact = useContactStore((state) => state.deleteContact)
  const debts = useDebtStore((state) => state.debts)
  const getDebts = useDebtStore((state) => state.getDebts)
  const query = search.trim().toLowerCase()
  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(query))
  const locale = i18n.resolvedLanguage === 'tj' ? 'tg' : i18n.resolvedLanguage

  // Добавление или изменение долга сразу обновляет контакты и их остатки.
  useEffect(() => {
    void getContacts()
  }, [getContacts, userId, debts])

  useEffect(() => {
    if (deletingContact && deletingContact.user_id === userId) {
      deleteDialogRef.current?.showModal()
    } else {
      deleteDialogRef.current?.close()
    }
  }, [deletingContact, userId])

  function closeDeleteDialog() {
    if (isDeleting) return
    deleteDialogRef.current?.close()
    setDeletingContact(null)
    setDeleteError(false)
  }

  async function handleDeleteContact() {
    if (!deletingContact || deletingContact.user_id !== userId || isDeleting) return
    setIsDeleting(true)
    setDeleteError(false)
    try {
      await deleteContact(deletingContact.id)
      setDeletingContact(null)
    } catch (error) {
      console.error('Не удалось удалить контакт:', error)
      setDeleteError(true)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)] font-[Arial,sans-serif] text-[var(--text-primary)] transition-colors duration-200">
      <div
        id="dashboard-sidebar"
        inert={!sidebarOpen}
        className={`shrink-0 overflow-clip transition-[width] duration-300 ease-in-out motion-reduce:transition-none ${sidebarOpen ? 'w-[76px] sm:w-[252px]' : 'w-0'}`}
      >
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 px-5 pt-5 pb-12 sm:px-10 sm:pt-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-[24px] font-semibold tracking-tight">{t('sidebar.contacts')}</h1>
            <button
              type="button"
              disabled={!userId}
              onClick={() => { setEditingContact(undefined); setDialogOpen(true) }}
              className="flex min-h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#477eff] px-4 py-2 text-[13px] font-medium text-white shadow-[0_3px_8px_#477eff18] transition-colors hover:bg-[#386ff0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              {t('contactPage.add')}
            </button>
          </div>

          {error && (
            <div role="alert" className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#ed252a30] bg-[#ed252a08] px-4 py-3 text-[13px] text-[#ed252a]">
              <span>{t('contactPage.loadFailed')}</span>
              <button type="button" onClick={() => void getContacts()} className="cursor-pointer rounded px-2 py-1 underline focus-visible:outline-2 focus-visible:outline-[#ed252a]">{t('contactPage.retry')}</button>
            </div>
          )}

          <div className="dashboard-chart mt-5 min-w-0 overflow-hidden rounded-[12px] border border-[var(--features-border)] bg-[var(--card-background)] shadow-[0_2px_4px_#172b4d03] transition-[background-color,box-shadow] duration-300 hover:shadow-[0_8px_30px_#172b4d06] motion-reduce:transition-none">
            <div className="p-3.5">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t('contactPage.search')}
                aria-label={t('contactPage.search')}
                className="h-11 w-full rounded-[8px] border border-[var(--features-border)] bg-[var(--card-background)] px-3.5 text-[13px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] transition-[border-color,box-shadow,background-color] duration-200 hover:border-[#aebed8] focus:border-[#477eff] focus:ring-2 focus:ring-[#477eff20] motion-reduce:transition-none"
              />
            </div>

            {isLoading && contacts.length > 0 && <p role="status" className="px-5 pb-3 text-[12px] text-[var(--text-muted)]">{t('contactPage.loading')}</p>}
            <div className="overflow-x-auto" aria-busy={isLoading}>
              <table aria-label={t('sidebar.contacts')} className="w-full min-w-[760px] table-fixed border-collapse text-left">
                <colgroup><col className="w-[31%]" /><col className="w-[15%]" /><col className="w-[21%]" /><col className="w-[21%]" /><col className="w-[12%]" /></colgroup>
                <thead className="border-y border-[var(--features-border)] bg-[var(--background)] text-[11px] uppercase">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-semibold">{t('debtsPage.fullName')}</th>
                    <th scope="col" className="px-4 py-4 font-semibold">{t('contactPage.phone')}</th>
                    <th scope="col" className="px-4 py-4 font-semibold">{t('dashboardStats.net')}</th>
                    <th scope="col" className="px-4 py-4 font-semibold">{t('contactPage.notes')}</th>
                    <th scope="col" className="px-5 py-4 text-right font-semibold">{t('debtsPage.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="border-b border-[var(--features-border)] text-[13px] transition-colors last:border-b-0 hover:bg-[var(--background)]">
                      <td className="truncate px-5 py-4" title={contact.name}>{contact.name}</td>
                      <td className="truncate px-4 py-4 text-[var(--text-muted)]" title={contact.phone || ''}>{contact.phone || '—'}</td>
                      <td className="px-4 py-4">
                        {Object.entries(balances[contact.id] ?? { TJS: 0 }).map(([currency, amount]) => (
                          <p key={currency} className="flex flex-wrap items-baseline gap-1 tabular-nums">
                            <span className={`font-medium ${amount > 0 ? 'text-[#2aaf87]' : amount < 0 ? 'text-[#ed252a]' : 'text-[var(--text-muted)]'}`}>{amount > 0 ? '+' : ''}{amount.toLocaleString(locale, { maximumFractionDigits: 2 })}</span>
                            <span className="text-[11px] text-[var(--text-muted)]">{currency}</span>
                          </p>
                        ))}
                      </td>
                      <td className="truncate px-4 py-4 text-[var(--text-muted)]" title={contact.note || ''}>{contact.note || '—'}</td>
                      <td className="px-5 py-3 text-right">
                        <button
                          type="button"
                          aria-label={t('debtsPage.actionsFor', { name: contact.name })}
                          aria-haspopup="menu"
                          aria-expanded={menuContact?.id === contact.id}
                          onClick={(event) => {
                            const rect = event.currentTarget.getBoundingClientRect()
                            setMenuPosition({ top: Math.max(16, Math.min(rect.bottom + 6, window.innerHeight - 128)), right: Math.max(16, window.innerWidth - rect.right) })
                            setMenuContact(contact)
                          }}
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[#477eff] focus-visible:outline-2 focus-visible:outline-[#477eff]"
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredContacts.length === 0 && (
                    <tr><td colSpan={5} className="h-[180px] px-5 py-10 text-center text-[14px] text-[var(--text-muted)]">{t(isLoading ? 'contactPage.loading' : error ? 'contactPage.loadFailed' : query ? 'debtsPage.noResults' : 'contactPage.empty')}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-28 text-[11px] text-[var(--text-muted)] sm:px-10">
          <p>{t('footer.copyright')}</p>
          <NavLink to="/" className="rounded py-1 transition-colors duration-200 hover:text-[#477eff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#477eff]">{t('sidebar.home')}</NavLink>
        </div>
      </div>

      {menuContact && userId === menuContact.user_id && (
        <div className="fixed inset-0 z-[60]" onClick={() => setMenuContact(null)} onKeyDown={(event) => { if (event.key === 'Escape') setMenuContact(null) }}>
          <div role="menu" aria-label={t('debtsPage.actions')} style={menuPosition} className="fixed w-[208px] rounded-xl border border-[var(--features-border)] bg-[var(--card-background)] p-1.5 shadow-[0_10px_35px_#172b4d20]">
            <button type="button" role="menuitem" autoFocus onClick={() => { setEditingContact(menuContact); setMenuContact(null); setDialogOpen(true) }} className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-[#477eff]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m15 5 4 4M4 20l4-1L20 7a2.8 2.8 0 0 0-4-4L4 15l-1 6m0 0h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {t('debtsPage.edit')}
            </button>
            <button type="button" role="menuitem" onClick={() => { setDeletingContact(menuContact); setDeleteError(false); setMenuContact(null) }} className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] text-[#ed252a] hover:bg-[#ed252a10] focus-visible:outline-2 focus-visible:outline-[#ed252a]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14M10 10v6m4-6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {t('debtsPage.delete')}
            </button>
          </div>
        </div>
      )}

      {dialogOpen && userId && (!editingContact || editingContact.user_id === userId) && (
        <ContactDialog
          key={`${userId}:${editingContact?.id ?? 'new'}`}
          contact={editingContact}
          onClose={() => setDialogOpen(false)}
          onSubmit={async (data) => {
            await saveContact(editingContact?.id ?? null, data)
            if (editingContact) await getDebts()
            else await getContacts()
          }}
        />
      )}

      <dialog
        ref={deleteDialogRef}
        aria-labelledby="contact-delete-title"
        aria-describedby="contact-delete-message"
        aria-busy={isDeleting}
        onCancel={(event) => { event.preventDefault(); closeDeleteDialog() }}
        onClick={(event) => { if (event.target === event.currentTarget) closeDeleteDialog() }}
        className="add-debt-dialog fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-[440px] overflow-y-auto rounded-[14px] border border-[var(--features-border)] bg-[var(--card-background)] p-0 text-[var(--text-primary)] shadow-xl backdrop:bg-black/40"
      >
        <div className="p-6">
          <h2 id="contact-delete-title" className="text-[18px] font-semibold">{t('contactPage.deleteTitle')}</h2>
          <p id="contact-delete-message" className="mt-5 text-[14px] leading-6 text-[var(--text-muted)]">{t('contactPage.deleteMessage', { name: deletingContact?.name ?? '' })}</p>
          {deleteError && <p role="alert" className="mt-4 text-[13px] text-[#ed252a]">{t('contactPage.deleteFailed')}</p>}
          <div className="mt-7 flex justify-end gap-2">
            <button type="button" autoFocus disabled={isDeleting} onClick={closeDeleteDialog} className="cursor-pointer rounded-lg px-4 py-2 text-[14px] text-[var(--text-muted)] hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-[#477eff] disabled:cursor-wait disabled:opacity-60">{t('addDebtDialog.cancel')}</button>
            <button type="button" disabled={isDeleting || !userId || deletingContact?.user_id !== userId} onClick={handleDeleteContact} className="cursor-pointer rounded-lg bg-[#ed252a] px-4 py-2 text-[14px] text-white hover:bg-[#d61f24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ed252a] disabled:cursor-wait disabled:opacity-60">{t(isDeleting ? 'debtsPage.deleting' : 'debtsPage.delete')}</button>
          </div>
        </div>
      </dialog>

      <AddDebtButton />
    </div>
  )
}
