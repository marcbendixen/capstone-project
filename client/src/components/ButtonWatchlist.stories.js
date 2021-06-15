import React from 'react'
import ButtonWatchlist from './ButtonWatchlist'

export default {
  title: 'ButtonWatchlist',
  component: ButtonWatchlist,
}

const Template = args => <ButtonWatchlist {...args} />

export const Add = Template.bind({})
Add.args = { isOnWatchlist: false }

export const Remove = Template.bind({})
Remove.args = { isOnWatchlist: true }
