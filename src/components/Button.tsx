// Public
import React from 'react'
import styled from 'styled-components'

// Private
import { useTheme } from '../context/theme'

const StyledButton = styled.button`
    padding: 9px 15px;
    border: none;
    borderRadius: ${props => props.theme.buttonBorderRadius}
`

interface IButtonProps {
    primary?: boolean
    onClick?: () => {}
    children: React.ReactChild
}


function Button(props: IButtonProps) {
    const { primary, children } = props
    const { theme } = useTheme()
    return (
        <StyledButton
        {...props}
        theme={theme}
        style={{
            color: theme.foreground,
            backgroundColor: primary ? theme.primary : theme.secondary,
        }}>
            { children }
        </StyledButton>
    )
}

export default Button