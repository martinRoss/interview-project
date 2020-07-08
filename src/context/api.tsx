import React, { createContext, useContext, useState } from 'react'

/**
 * Api response status values
 */
enum Status {
    /**
     * success: Status of the API request when operation compeletes without error
     */
    success = 'success',
    /**
     * error: Status of the API request when operation compeletes with error
     */
    error = 'error'
}

/**
 * Interface/object structure of materials use throughout the application
 */
export interface IMaterial {
    /**
     * id: Unqiue identifier for each material
     */
    id?: number
    /**
     * name: Name of the material 
     */
    name: string
    /**
     * cost: Cost of the material in cubic meters
     */
    cost: number
    /**
     * volume: Volume of the material in cubic meters
     */
    volume: number
    /**
     * color: User defined color to identify the material. For example, used as a visual tag
     */
    color: string
    /**
     * date: Date of material delivery
     */
    delivery: string | Date
}

/**
 * Interface that the ApiContext provides to context consumers
 */
export interface IApiContext {
    /**
     * materials: array of materials currently in memory
     */
    materials: IMaterial[]
    /**
     * getMaterials: fetches materials from server and loads them into memory
     */
    getMaterials: () => { data: IMaterial[], status: Status }
    /**
     * addMaterial: posts a new material to the server and updates local store on success, non-optimistically 
     */
    addMaterial: (material: IMaterial) =>  { material: IMaterial, status: Status }
    /**
     * deleteMaterial: Deletes material from server and updates local store on success, non-optimistically
     */
    deleteMaterial: (id: number) => { id: number, status: Status }
    /**
     * editMaterial: Edits material from server and updates local store on success, non-optimistically
     */
    editMaterial: (material: IMaterial) => { material: IMaterial, status: Status }
    /**
     * loading: Returns true if waiting on response from server
     */
    loading: boolean
}

interface IApiProvider {
    /**
     * children: Props passed to the provider
     */
    children: React.ReactChild
}

/**
 * Creates an auto-incrementing id generator
 * @returns {Function} id generator, initialized to 1
 * @constructor
 */
const idGenerator = () => {
    let current = 1
    return () => {
        current += 1
        return current
    }
}
// Creates an idGenerator
const generateId = idGenerator()
/**
 * Exported ApiContext
 * @returns {Context} ApiContext 
 */
export const ApiContext = createContext({
    materials: [] as IMaterial[],
} as IApiContext)
/**
 * Hook to directly access context in functional components
 * @returns {Function} useApi Api hook
 */
export const useApi = () => useContext(ApiContext)

/**
 * Fake backend API provider
 * @param {IApiProvider} param0: Props passed to the provider
 * @constructor
 */
export const ApiProvider = ({ children } : IApiProvider) => {
    // Material state (acting as store for the application) and setter
    const [materials, setMaterials] = useState<IMaterial[]>([])
    // Loading state and setter
    const [loading, setLoading] = useState(false)

    /**
     * @typedef {Object} GetMaterialsResponse
     * @property {IMaterials[]} materials: List of materials
     * @property {Status} status: Status of operation 
     */
    /**
     * Fetch materials from "server"
     * @returns {GetMaterialsResponse} Response object from fetching materials
     */
    const getMaterials = () => {
        setLoading(true)
        // await call Api
        const data = [] as IMaterial[]
        setMaterials(data)
        setLoading(false)
        // Status would come from server
        const status: Status = Status.success
        return { data, status }
    }
   
    /**
     * @typedef {Object} RemoteMaterialOperationResponse response from either a POST or PATCH/PUT operation on /materials
     * @property {IMaterial} material: created material
     * @property {Status} status: Status of operation 
     */
    /**
     * Adds a material to the "server" and updates local store "on success" 
     * @param {IMaterial} material: material to add
     * @returns {RemoteMaterialOperationResponse}
     */
    const addMaterial = (material: IMaterial) => {
        // Status would come from server
        let status: Status = Status.success
        setLoading(true)
        // Mock call api, returns from server with an ID
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

    /**
     * Edits a material to the "server" and updates local store "on success" 
     * @param {IMaterial} material: material to update
     * @returns {RemoteMaterialOperationResponse}
     */
    const editMaterial = (material: IMaterial) => {
        let status: Status
        setLoading(true)
        // mock call to api
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

    /**
     * @typedef {Object} RemoteMaterialDeletionResponse response from either a POST or PATCH/PUT operation on /materials
     * @property {number} id: id of deleted id
     * @property {Status} status: Status of operation 
     */
    /**
     * Delets a material to the "server" and updates local store "on success" 
     * @param {number} id: Id of material to delete
     * @returns {RemoteMaterialDeletionResponse}
     */
    const deleteMaterial = (id: number) => {
        let status: Status
        setLoading(true)
        // Fake back end
        const idx = materials.findIndex((material: IMaterial) => material.id === id) as number
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