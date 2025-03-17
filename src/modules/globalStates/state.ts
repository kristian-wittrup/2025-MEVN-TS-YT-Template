import { reactive, watch } from 'vue'

// initialize isLoggedIn from localStorage or default to false
const isLoggedInFromtStorage = localStorage.getItem('isLoggedIn') === 'true'

export const state = reactive({
  isLoggedIn: isLoggedInFromtStorage
})

// watch for changes in isLoggedIn and update localStorage
watch(() => state.isLoggedIn, (newValue) => {
  localStorage.setItem('isLoggedIn', String(newValue))
})
