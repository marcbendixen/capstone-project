import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PosterList from './PosterList'

export default {
  title: 'PosterList',
  component: PosterList,
}

const Template = args => (
  <Router>
    <PosterList {...args} />
  </Router>
)

export const Default = Template.bind({})
Default.args = {
  list: [
    { id: 1, name: 'Title 1' },
    { id: 2, name: 'Title 2' },
    { id: 3, name: 'Title 3' },
    { id: 4, name: 'Title 4' },
    { id: 5, name: 'Title 5' },
  ],
}
