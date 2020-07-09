import React from 'react'
import { render, screen } from '@testing-library/react'

import MaterialsList from '../components/MaterialsList'
import { mockMaterials } from './api.test'

test('renders an App component with a "Materials" heading', () => {
    const { getAllByText } = render(
        <MaterialsList materials={mockMaterials} setSelectedMaterial={ () => {} }/>
    )
    const listItems = getAllByText("", { selector: "li" })
    // We'd have to update this quantity and render actual sizes
    // if we needed to use virtualized lists for performance
    expect(listItems.length).toEqual(2)
})
