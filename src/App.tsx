// Public
import React from 'react'
import styled from 'styled-components'

// Private
import { ThemeProvider, ThemeContext } from './context/theme'
import { ApiProvider } from './context/api'
import MaterialsManagement from './containers/MaterialsManagement'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.foreground};
`

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
