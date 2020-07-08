import React, { createContext, useContext, useState } from 'react'

enum ThemeType {
    dark = 'dark',
    light = 'light'
}

interface IThemeProvider {
    children?: React.ReactChild
    type?: ThemeType
}

const commonThemeElements = {
    grid: 12,
    buttonBorderRadius: 26,
    inputBorderRadius: 4
}
const themes = {
    dark: {
        primary: '#0075DB', // Primary action items such as buttons
        secondary: '#FF444C', // Secondary action items
        foreground: 'rgba(255, 255, 255, 0.85)', // Contrasted foreground (text)
        background: '#29292F', // Main background color
        containers: '#1D1D21', // Contrast to background
        ...commonThemeElements
    },
    light: {
        primary: '#0075DB', // Primary action items such as buttons
        secondary: '#FF444C', // Secondary action items
        background: '#FFFFFF', // Contrasted foreground (text)
        foreground: '#29292F', // Main background color
        containers: '#DDDDDD', // Contrast to background
        ...commonThemeElements
    }
}

export const ThemeContext = createContext({
    theme: themes.dark,
    toggleTheme: () => {}
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children, type = ThemeType.dark } : IThemeProvider) => {
    // Set theme based on value passed to provider
    const [theme, setTheme] = useState(themes[type])
    // Provide a method ot update theme
    const toggleTheme = () => {
        if (theme === themes.dark) {
            setTheme(themes.light)
        } else {
            setTheme(themes.dark)
        }
    }
    return (
        <ThemeContext.Provider
        value={{
            theme,
            toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}