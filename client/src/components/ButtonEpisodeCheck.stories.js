import React from 'react'
import ButtonEpisodeCheck from './ButtonEpisodeCheck'

export default {
  title: 'ButtonEpisodeCheck',
  component: ButtonEpisodeCheck,
}

const Template = args => <ButtonEpisodeCheck {...args} />

export const Active = Template.bind({})
Active.args = { isWatched: true }
Active.parameters = {
  backgrounds: { default: 'light' },
}

export const Inactive = Template.bind({})
Inactive.args = { isWatched: false }
Inactive.parameters = {
  backgrounds: { default: 'light' },
}
