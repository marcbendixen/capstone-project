import React from 'react'
import PosterList from './PosterList'

export default {
  title: 'PosterList',
  component: PosterList,
}

const Template = args => <PosterList {...args} />

export const Default = Template.bind({})
Default.args = {
  list: [
    { id: 1, alt: 'Poster of Title 1' },
    { id: 2, alt: 'Poster of Title 2' },
    { id: 3, alt: 'Poster of Title 3' },
    { id: 4, alt: 'Poster of Title 4' },
    { id: 5, alt: 'Poster of Title 5' },
  ],
}
