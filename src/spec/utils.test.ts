import { calculateTotalCostOfMaterialList } from '../utils'
import { mockMaterials } from './api.test'

test('calculateTotalCostOfMaterialList calculates correct total', () => {
    const total = calculateTotalCostOfMaterialList(mockMaterials)
    expect(total).toEqual(1196)
})