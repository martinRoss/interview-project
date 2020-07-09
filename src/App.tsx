// Public
import React from 'react'
import styled from 'styled-components'

// Private
import { ThemeProvider, ThemeContext } from './context/theme'
import { ApiProvider } from './context/api'
import MaterialsManagement from './containers/MaterialsManagement'
import Button from './components/Button'

// Button to toggle the theme
const ThemeButton = styled(Button)`
  position: fixed;
  top: ${props => props.theme.grid * 2}px;
  right: ${props => props.theme.grid * 2}px;
`

/**
 * Top level visual component that uses the current theme selection to display the application
 */
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
`
/**
 * After mount point, this is the root node of the application
 * Wraps application in context proivders
 * @constructor
 */
function App() {
  return (
    <ThemeProvider>
        <ApiProvider>
            <ThemeContext.Consumer>
            {({ theme, toggleTheme }) => (
                <AppContainer theme={theme}>
                    <ThemeButton flat onClick={() => toggleTheme()} theme={theme}>
                        Toggle Theme
                    </ThemeButton>
                    <MaterialsManagement />
                </AppContainer>
            )}
            </ThemeContext.Consumer>
        </ApiProvider>
    </ThemeProvider>
  )
}

export default App
