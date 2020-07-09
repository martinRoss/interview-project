// Public
import React, { useEffect } from 'react'

// Private
import { useApi } from '../context/api'
import MaterialsManagementComponent from '../components/MaterialsManagement'

function MaterialsManagement() {
    const {
        materials,
        getMaterials,
        addMaterial,
        editMaterial,
        deleteMaterial
    } = useApi()

    // On mount, fetch materials
    useEffect(() => {
        getMaterials()
        // eslint-disable-next-line
    }, [])

    return (
        <MaterialsManagementComponent
            materials={materials}
            addMaterial={addMaterial}
            editMaterial={editMaterial}
            deleteMaterial={deleteMaterial}
        />
    )
}

export default MaterialsManagement