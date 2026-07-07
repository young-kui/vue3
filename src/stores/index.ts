import { ref } from 'vue'

export const useStore = () => {
  const darkMode = ref(false)

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }

  return {
    value: {
      darkMode
    },
    toggleDarkMode
  }
}
