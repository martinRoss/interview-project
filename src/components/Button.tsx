// Public
import React from 'react'
import styled from 'styled-components'

// Private
import { useTheme } from '../context/theme'

const StyledButton = styled.button<any>`
    padding: 9px 15px;
    border: none;
    border-radius: ${props => props.theme.buttonBorderRadius}px;
    margin-right ${props => props.theme.grid}px;
    height ${props => props.theme.grid * 3}px;

    &:hover {
        cursor: pointer;
        ${props => (!props.disabled && !props.flat) &&
        `
        box-shadow: 2px 5px 12px rgba(0, 0, 0, 0.35);
        `
        }
    }
`

interface IButtonProps {
    /**
     * primary: If true, use primary color
     */
    primary?: boolean
    /**
     * flat: If true, remove background color
     */
    flat?: boolean
    /**
     * onClick: on click handler
     */
    onClick?: () => void
    /**
     * children: Button children--compose as you wish!
     */
    children: React.ReactChild
    /**
     * type: button type
     */
    type?: "button" | "submit" | "reset" | undefined
    /**
     * disabled: disabled the button
     */
    disabled?: boolean
}


function Button(props: IButtonProps) {
    const { primary, children, disabled, flat } = props
    const { theme } = useTheme()
    let backgroundColor = theme.secondary as string | null
    if (primary) {
        backgroundColor = theme.primary
    }
    if (disabled) {
        backgroundColor = theme.containers
    }
    if (flat) {
        backgroundColor = 'rgba(0, 0, 0, 0)'
    }
    return (
        <StyledButton
        {...props}
        theme={theme}
        flat={flat}
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