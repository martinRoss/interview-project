import { IMaterial } from '../context/api'

/**
 * Calculates the total cost of an array of materials
 * Each material has a total cost that equals volume * cost
 * After each material cost is caluclated, the total of the list is reduced 
 * @param {IMaterial[]} materials Array of materials
 * @returns {number} total Total cost of the materials in the list
 */
export const calculateTotalCostOfMaterialList = (materials: IMaterial[]) => {
    return materials
        .map((material: IMaterial) => material.volume * material.cost)
        .reduce((a: number, b: number) => a + b, 0)
}