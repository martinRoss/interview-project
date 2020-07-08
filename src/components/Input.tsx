// Public
import React from 'react'
import styled from 'styled-components'

// Private
import { useTheme } from '../context/theme'

const StyledInput = styled.input`
    padding: 9px 15px;
    border: none;
    borderRadius: ${props => props.theme.inputBorderRadius}
    background: ${props => props.theme.background}
`

interface IInputProps {
    onClick?: () => {}
    children: React.ReactChild
}


function Input(props: IInputProps) {
    const { children } = props
    const { theme } = useTheme()
    return (
        <StyledInput
        {...props}
        theme={theme}
        style={{
            color: theme.foreground,
        }}>
            { children }
        </StyledInput>
    )
}

export default Input