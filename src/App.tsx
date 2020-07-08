// Public
import React from 'react'
import styled from 'styled-components'

// Private
import { ThemeProvider, ThemeContext } from './context/theme'
import { ApiProvider } from './context/api'
import MaterialsManagement from './containers/MaterialsManagement'

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
            {({ theme }) => (
                <AppContainer theme={theme}>
                    <MaterialsManagement />
                </AppContainer>
            )}
            </ThemeContext.Consumer>
        </ApiProvider>
    </ThemeProvider>
  )
}

export default App
