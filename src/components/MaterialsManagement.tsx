// Public
import React from 'react'

// Private
// I would normally define the material interface in a separate @types folder
import { IMaterial, IApiContext } from '../context/api'
import Button from './Button'

interface IMaterialsManagementProps {
    materials: IMaterial[]
    addMaterial: IApiContext["addMaterial"]
    deleteMaterial: IApiContext["deleteMaterial"]
    editMaterial: IApiContext["editMaterial"]
}

function MaterialsManagement(props: IMaterialsManagementProps) {
    return (
        <div>
            <Button primary>Add</Button>
        </div>
    )
}

export default MaterialsManagement