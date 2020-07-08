import { calculateTotalCostOfMaterialList } from '../utils'

const materials = [
    {
        id: 1,
        name: "earth",
        volume: 10,
        delivery: "7/10/2020",
        cost: 100,
        color: "#232323"
    },
    {
        id: 2,
        name: "steel",
        volume: 14,
        delivery: "7/10/2020",
        cost: 14,
        color: "#262626"
    }
]

test('calculateTotalCostOfMaterialList calculates correct total', () => {
    const total = calculateTotalCostOfMaterialList(materials)
    expect(total).toEqual(1196)
})