import { useApi }  from '../context/api'
import { renderHook } from '@testing-library/react-hooks'

test('ApiContext consumer defaults to an empty array of materials', () => {
    const { result } = renderHook(() => useApi())
    expect(result.current.materials.length).toEqual(0)
})