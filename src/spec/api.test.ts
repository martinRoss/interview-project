import { useApi }  from '../context/api'
import { renderHook } from '@testing-library/react-hooks'

export const mockMaterials = [
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

test('ApiContext consumer defaults to an empty array of materials', () => {
    const { result } = renderHook(() => useApi())
    expect(result.current.materials.length).toEqual(0)
})