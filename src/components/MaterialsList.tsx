// Public
import React from 'react'
import styled from 'styled-components'

// Private
import { IMaterial } from '../context/api'
import { useTheme } from '../context/theme'

interface IMaterialsListProps {
    materials: IMaterial[]
    selectedMaterial?: IMaterial
    setSelectedMaterial: any
}

const Container = styled.div`
  min-width: 220px;
  height: 284px;
  margin-right: ${props => props.theme.grid * 2}px;
  border: 1px solid #565664;
  background: ${props => props.theme.containers};
  overflow-x: hidden;
  overflow-y: auto;
`

const ListItem = styled.div<any>`
  padding: ${props => props.theme.grid}px;
  display: flex;
  border: 1px solid ${props => props.selected ? props.theme.primary : 'rgba(0, 0, 0, 0)'};
  border-bottom: 1px solid ${props => !props.selected ? props.theme.background : props.theme.primary};
`
const ColorTag = styled.div`
  border-radius: 50%;
  background-color: ${props => props.color};
  height: ${props => props.theme.grid * 2}px;
  width: ${props => props.theme.grid * 2}px;
  margin-right: ${props => props.theme.grid}px;
`
// I would normally pull typography styles out into a typography module
const ListItemTitle = styled.h3`
  font-size: 14px;
  margin: 0;
`
const ListItemDetails = styled.span`
  font-size: 12px;
`

function MaterialsList (props: IMaterialsListProps) {
    const { theme } = useTheme()
    return (
        <Container theme={theme}>
            {props.materials.map((material: IMaterial) => (
                <ListItem
                onClick={ () => props.setSelectedMaterial(material)}
                theme={theme}
                key={material.id}
                selected={material === props.selectedMaterial}>
                    <ColorTag color={material.color} theme={theme} />
                    <div>
                        <ListItemTitle>{ material.name }</ListItemTitle>
                        <ListItemDetails>{ `${material.volume} m3` }</ListItemDetails>
                    </div>
                </ListItem>
            ))}
        </Container>
    )
}

export default MaterialsList