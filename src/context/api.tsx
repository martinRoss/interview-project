import React, { createContext, useContext, useState } from 'react'

enum Status {
    success = 'success',
    error = 'error'
}

export interface IMaterial {
    id?: number
    name: string
    cost: number
    volume: number
    color: string
    delivery: string | Date
}


export interface IApiContext {
    materials: IMaterial[]
    getMaterials: () => IMaterial[]
    addMaterial: (material: IMaterial) =>  { material: IMaterial, status: Status }
    deleteMaterial: (id: number) => { id: number, status: Status }
    editMaterial: (material: IMaterial) => { material: IMaterial, status: Status }
    loading: boolean
}

interface IApiProvider {
    children: React.ReactChild
}

// Fake id generator
const idGenerator = () => {
    let current = 1
    return () => {
        current += 1
        return current
    }
}
// create a closure
const generateId = idGenerator()

export const ApiContext = createContext({} as IApiContext)

export const useApi = () => useContext(ApiContext)

export const ApiProvider = ({ children } : IApiProvider) => {
    const [materials, setMaterials] = useState<IMaterial[]>([])
    const [loading, setLoading] = useState(false)

    const getMaterials = () => {
        setLoading(true)
        // await call Api
        const data = [] as IMaterial[]
        setMaterials(data)
        setLoading(false)
        return data
    }

    const addMaterial = (material: IMaterial) => {
        // Status would come from server
        let status: Status = Status.success
        setLoading(true)
        // call api to get an ID
        const savedMaterial = { ...material, id: generateId() }
        setMaterials([
            ...materials,
            savedMaterial
        ])
        setLoading(false)
        
        return {
            material: savedMaterial,
            status
        }
    }

    const deleteMaterial = (id: number) => {
        let status: Status
        setLoading(true)
        // call api here
        const idx = materials.findIndex((material: IMaterial) => material.id === id) as number
        console.log(idx)
        if (idx !== -1) {
            const newMaterials = [...materials]
            newMaterials.splice(idx, 1)
            setMaterials(newMaterials)
            status = Status.success
        } else {
            status = Status.error
        }
        setLoading(false)

        return {
            id,
            status
        }
    }
    
    const editMaterial = (material: IMaterial) => {
        let status: Status
        setLoading(true)
        // call api
        const idx = materials.find((m: IMaterial) => m.id === material.id) as number | undefined
        if (idx) {
            setMaterials(materials.splice(idx, 1))
            status = Status.success
        } else {
            status = Status.error
        }
        setLoading(false)

        return {
            material,
            status
        }
    }
    return (
        <ApiContext.Provider
        value={{
            loading,
            materials,
            getMaterials,
            addMaterial,
            deleteMaterial,
            editMaterial
        }}>
            {children}
        </ApiContext.Provider>
    )
}