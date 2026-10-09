import { useAppUpdates } from '../app/useAppUpdates'

export function AppUpdateBanner() {
  const { available, applying, error, applyUpdate } = useAppUpdates()
  if (!available) return null

  return <aside className="app-update-banner" role="status" aria-live="polite" aria-label="Обновление приложения">
    <div className="app-update-symbol" aria-hidden="true">↻</div>
    <div className="app-update-copy">
      <strong>Новая версия sENG</strong>
      <p>{error
        ? 'Не удалось подключиться. Проверь интернет и попробуй ещё раз.'
        : 'Обновление готово. Твой прогресс обучения сохранится.'}</p>
    </div>
    <button type="button" className="app-update-action" disabled={applying} onClick={applyUpdate}>
      {applying ? 'Обновляем…' : 'Обновить'}
    </button>
  </aside>
}
