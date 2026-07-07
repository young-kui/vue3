export const useDarkMode = () => {
  const isDarkMode = useState<boolean>('darkMode', () => false)

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    updateDOMClass()
    saveToLocalStorage()
  }

  const initDarkMode = () => {
    if (import.meta.client) {
      const savedMode = localStorage.getItem('darkMode')
      if (savedMode !== null) {
        isDarkMode.value = savedMode === 'true'
      } else {
        // 시스템 다크모드 감지
        isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      updateDOMClass()
    }
  }

  const setDarkMode = (value: boolean) => {
    isDarkMode.value = value
    updateDOMClass()
    saveToLocalStorage()
  }

  const updateDOMClass = () => {
    if (import.meta.client) {
      document.body.classList.toggle('dark', isDarkMode.value)
    }
  }

  const saveToLocalStorage = () => {
    if (import.meta.client) {
      localStorage.setItem('darkMode', isDarkMode.value.toString())
    }
  }

  const darkModeClass = computed(() => isDarkMode.value ? 'dark' : 'light')

  return {
    isDarkMode: readonly(isDarkMode),
    darkModeClass,
    toggleDarkMode,
    setDarkMode,
    initDarkMode
  }
}