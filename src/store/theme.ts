/* eslint-disable no-console */
import { defineStore } from 'pinia'

export function updateTheme(themeName: string, themeColor: string) {
  const newValue = `https://cdn.jsdelivr.net/npm/primevue@3.15.0/resources/themes/${themeName}-${themeColor}/theme.css`
  const relElements = Array.prototype.slice.call(document.getElementsByTagName('link'))
  relElements.forEach((element: HTMLElement) => {
    if (element.getAttribute('href') && element.getAttribute('href').includes('/themes/'))
      element.setAttribute('href', newValue)
  })
}

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useThemeStore = defineStore('theme', {
  // a function that returns a fresh state
  state: () => ({
    themeName: 'vela',
    themeColor: 'blue',
    menuClosed: true,
  }),
  // optional getters
  getters: {
    theme: (state) => {
      return `${state.themeName}-${state.themeColor}`
    },
    isDarkMode: state => state.themeName !== 'saga',
  },
  // optional actions
  actions: {
    init() {
      console.log(this.theme)
      updateTheme(this.themeName, this.themeColor)
    },
    setDark() {
      this.themeName = 'arya'
      updateTheme(this.themeName, this.themeColor)
    },
    setDim() {
      this.themeName = 'vela'
      updateTheme(this.themeName, this.themeColor)
    },
    setLight() {
      console.log('setting light', this.themeColor)
      this.themeName = 'saga'
      updateTheme(this.themeName, this.themeColor)
    },
    setColor(colorName: string) {
      this.themeColor = colorName
      updateTheme(this.themeName, this.themeColor)
    },
    setMenu(value: boolean) {
      this.menuClosed = value
    },
  },

  persistedState: {
    persist: true,
  },
})
// import { defineStore } from 'pinia';

// export type ThemeType = 'light' | 'dark' | 'auto';

// interface ThemeState {
//   theme: ThemeType;
// }

// export const useThemeStore = defineStore('theme', {
//   state: (): ThemeState => {
//     return {
//       theme: 'light',
//     };
//   },
//   actions: {
//     toggleTheme(theme: ThemeType) {
//       this.theme = theme;
//     },
//   },
//   getters: {
//     getTheme: (state): 'light' | 'dark' => {
//       let theme = state.theme;
//       if (state.theme === 'auto') {
//         const mediaQueryListDark = window.matchMedia('(prefers-color-scheme: dark)');
//         if (mediaQueryListDark.matches) {
//           // 系统当前是暗色(dark)主题
//           theme = 'dark';
//         } else {
//           theme = 'light';
//         }
//       }
//       return theme as 'light' | 'dark';
//     },
//   },

//   persistedState: {
//     persist: true,
//   },
// });
