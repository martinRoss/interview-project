// Public
import React from 'react'
import styled from 'styled-components'

// Private
import { IMaterial } from '../context/api'
import { useTheme } from '../context/theme'

interface IMaterialsListProps {
    materials: IMaterial[]
}

const Container = styled.div`
  width: 220px;
  height: 284px;
  margin-right: ${props => props.theme.grid * 2}px;
  border: 1px solid #565664;
  background: ${props => props.theme.containers};
`

const ListItem = styled.div`
  padding: ${props => props.theme.grid}px;
  border-bottom: 1px solid ${props => props.theme.background};
  display: flex;
`
const Color = styled.div`
  border-radius: 50%;
  background-color: ${props => props.color};
  height: ${props => props.theme.grid * 2}px;
  width: ${props => props.theme.grid * 2}px;
  margin-right: ${props => props.theme.grid}px;
`
// I would normally pull these out into a typography module
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
                <ListItem theme={theme} key={material.id}>
                    <Color color={material.color} theme={theme} />
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