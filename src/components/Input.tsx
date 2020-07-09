// Public
import React from 'react'
import styled from 'styled-components'

// Private
// eslint-disable-next-line
import { useTheme, ITheme } from '../context/theme'

/**
 * Input styled with styled components
 * @param {ITheme} theme Current theme
 * @constructor
 */
const StyledInput = styled.input`
    padding: 9px 15px;
    border: none;
    border-radius: ${props => props.theme.inputBorderRadius}px;
    background: ${props => props.theme.background};
    margin-top: ${props => props.theme.grid}px;
    margin-bottom: ${props => props.theme.grid}px;
    color: ${props => props.theme.foreground};
`

// Would not use the 'any' type, simplying things for times sake
const Input = React.forwardRef((props: any, ref: any) => {
    const { children } = props
    const { theme } = useTheme()
    return (
        <StyledInput
        {...props}
        theme={theme}
        ref={ref}
        style={{
            color: theme.foreground,
        }}>
            { children }
        </StyledInput>
    )
})

export default Input