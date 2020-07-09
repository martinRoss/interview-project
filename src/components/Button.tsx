// Public
import React from 'react'
import styled from 'styled-components'

// Private
import { useTheme } from '../context/theme'

const StyledButton = styled.button`
    padding: 9px 15px;
    border: none;
    border-radius: ${props => props.theme.buttonBorderRadius}px;
    margin-right ${props => props.theme.grid}px;
    height ${props => props.theme.grid * 3}px;

    &:hover {
        ${props => !props.disabled && 
        `
        box-shadow: 2px 5px 12px rgba(0, 0, 0, 0.35);
        cursor: pointer;
        `
        }
    }
`

interface IButtonProps {
    primary?: boolean
    onClick?: () => void
    children: React.ReactChild
    type?: "button" | "submit" | "reset" | undefined
    disabled?: boolean
}


function Button(props: IButtonProps) {
    const { primary, children, disabled } = props
    const { theme } = useTheme()
    let backgroundColor = theme.secondary
    if (primary) {
        backgroundColor = theme.primary
    }
    if (disabled) {
        backgroundColor = theme.containers
    }
    return (
        <StyledButton
        {...props}
        theme={theme}
        disabled={disabled}
        style={{
            color: theme.foreground,
            backgroundColor
        }}>
            { children }
        </StyledButton>
    )
}

export default Button