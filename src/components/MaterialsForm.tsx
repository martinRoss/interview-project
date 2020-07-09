// Public
import React, { createRef } from 'react'
import styled from 'styled-components'

// Private
import Input from './Input'
import { useTheme } from '../context/theme'
import { useApi, IMaterial } from '../context/api'
import Button from './Button'

const Form = styled.form`
  background: ${props => props.theme.containers};
  padding: ${props => props.theme.grid * 2}px;
  height: 284px;
  box-sizing: border-box;
  display: flex;
`
const Label = styled.label`
  font-weight: bold;
  color: ${props => props.theme.foreground}
`
const Column = styled.div`
  margin-right: ${props => props.theme.grid * 4}px;
`
interface IMaterialsFormProps {
    /**
     * Current selected material to use as defaultValue
     */
    selectedMaterial?: IMaterial
}
/**
 * Form to add/edit a material  
 * @param {IMaterialsFormProps} props 
 * @constructor
 */
function MaterialsForm (props: IMaterialsFormProps) {
    const { theme } = useTheme()
    const defaultValue = props.selectedMaterial ? props.selectedMaterial : {} as IMaterial
    const api = useApi() // Might pass these down depending on the situation
    const name = createRef()
    const volume = createRef()
    const delivery = createRef()
    const color = createRef()
    const cost = createRef()

   
    /**
     * Form's onSubmit handler 
     * @param {React.FormEvent<HTMLFormElement>} event OnSubmit event
     */
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // In actual system, do some client side validation
        api.addMaterial({
            // @ts-ignore -- saving time
            name: name.current.value as string,
            // @ts-ignore
            volume: volume.current.value as number,
            // @ts-ignore
            delivery: delivery.current.value as Date,
            // @ts-ignore
            color: color.current.value as string,
            // @ts-ignore
            cost: cost.current.value as number
        })
    }
    return (
        <Form onSubmit={onSubmit} theme={theme} data-testid="material-form">
            <Column theme={theme}>
                {/* Ideally would pull Label into a component (beyond a styled component) 
                to not have to pass in theme for each one */}
                <Label theme={theme} htmlFor="name">Name</Label>
                <br />
                <Input
                required
                id="name"
                placeholder="New Material"
                ref={name}
                defaultValue={defaultValue.name}
                type="text" />
                <br />
                <Label theme={theme} htmlFor="volume">Volume (m<sup>3</sup>)</Label>
                <br />
                <Input
                required
                id="volume"
                type="number"
                min={0}
                step={1}
                ref={volume}
                defaultValue={defaultValue.volume} />
                <br />
                <Label theme={theme} htmlFor="delivery">Delivery Date</Label>
                <br />
                <Input
                required
                id="delivery"
                type="date"
                ref={delivery}
                defaultValue={defaultValue.delivery} />
            </Column>
            <Column theme={theme}>
                <Label theme={theme} htmlFor="color">Color</Label>
                <br />
                <Input
                required
                id="color"
                type="color"
                ref={color}
                defaultValue={defaultValue.color} />
                <br />
                <Label theme={theme} htmlFor="cost">Cost (USD per m<sup>3</sup>)</Label>
                <br />
                <Input
                required
                id="cost"
                type="number"
                step={1}
                ref={cost}
                defaultValue={defaultValue.cost} />
            </Column>
            {/* Would disable this until validation passes */}
            <Button type="submit" primary disabled={api.loading}>
                { api.loading ? 'loading...' : 'submit' }
            </Button>
        </Form>
    )
}

export default MaterialsForm