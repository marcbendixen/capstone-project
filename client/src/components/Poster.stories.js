import React from 'react'
import Poster from './Poster'

export default {
  title: 'Poster',
  component: Poster,
}

const Template = args => <Poster {...args} />

export const Default = Template.bind({})
Default.args = {
  path: 'poster.png',
  alt: 'Poster of Series',
}
