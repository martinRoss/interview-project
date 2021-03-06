// Public
import React, { useState } from 'react'
import styled from 'styled-components'

// Private
// I would normally define the material interface in a separate @types folder
import { IMaterial, IApiContext } from '../context/api'
import { useTheme } from '../context/theme'
import Button from './Button'
import MaterialsList from './MaterialsList'
import MaterialsForm from './MaterialsForm'
import {calculateTotalCostOfMaterialList} from '../utils'

interface IMaterialsManagementProps {
    materials: IMaterial[]
    addMaterial: IApiContext["addMaterial"]
    deleteMaterial: IApiContext["deleteMaterial"]
    editMaterial: IApiContext["editMaterial"]
}

const RootContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
`

const H1 = styled.h1`
  font-weight: bold
`

const Container = styled.div`
  display: flex;
`

const Placeholder = styled.div`
  background-color: ${props => props.theme.containers};
  height: 100%;
  flex: 1;
`

const ViewContainer = styled.div`
  flex: 1;
`

const Controls = styled.div`
  margin: 0 0 ${props => props.theme.grid * 2}px 0;
`

const TotalCost = styled.div`
  margin-top: ${props => props.theme.grid * 2}px;
  display: flex;
  width: 222px;
`
const Spacer = styled.div`
  flex: 1;
`

enum Views {
    blank = "blank",
    form = "form"
}

function MaterialsManagement(props: IMaterialsManagementProps) {
    const { materials, deleteMaterial } = props
    const { theme } = useTheme()
    const [currentView, setCurrentView] = useState(Views.blank)
    const [selectedMaterial, setSelectedMaterial] = useState()

    const getCurrentView = (view: Views) => {
        switch (view) {
            case Views.blank:
                return <Placeholder theme={theme} />
            case Views.form:
                return <MaterialsForm
                selectedMaterial={selectedMaterial}
                // @ts-ignore
                key={!!selectedMaterial ? selectedMaterial.id : 'new'} />
            default:
                return null
        }
    }

    const onClickAdd = () => setCurrentView(Views.form)
    const onClickDelete = () => {
        // @ts-ignore
        if (!!selectedMaterial) deleteMaterial(selectedMaterial.id)
    }

    return (
        <RootContainer>
            <H1>Materials</H1>
            <Controls theme={theme}>
                {/* Ideally these control strings would come from a language context
                that defines static labels based on localization */}
                <Button onClick={ onClickAdd } primary>Add</Button>
                <Button
                onClick={onClickDelete}
                disabled={ typeof selectedMaterial === 'undefined' }>
                    Delete
                </Button>
            </Controls>
            <Container>
                <MaterialsList
                materials={materials}
                selectedMaterial={selectedMaterial}
                setSelectedMaterial={setSelectedMaterial}
                />
                <ViewContainer>
                    { getCurrentView(currentView) }
                </ViewContainer>
            </Container>
            <TotalCost theme={theme}><span>Total cost:</span><Spacer />${ calculateTotalCostOfMaterialList(materials).toFixed(2) }</TotalCost>
        </RootContainer>
    )
}

export default MaterialsManagement