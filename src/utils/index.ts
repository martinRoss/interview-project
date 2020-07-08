import { IMaterial } from '../context/api'

export const calculateTotalCostOfMaterialList = (materials: IMaterial[]) => {
    return materials
        .map((material: IMaterial) => material.volume * material.cost)
        .reduce((a: number, b: number) => a + b, 0)
}