import React from 'react'
import ButtonEpisodeCheck from './ButtonEpisodeCheck'

export default {
  title: 'ButtonEpisodeCheck',
  component: ButtonEpisodeCheck,
}

const Template = args => <ButtonEpisodeCheck {...args} />

export const Active = Template.bind({})
Active.args = { isEpisodeWatched: true, id: 123 }
Active.parameters = {
  backgrounds: { default: 'light' },
}

export const Inactive = Template.bind({})
Inactive.args = { isEpisodeWatched: false, id: 123 }
Inactive.parameters = {
  backgrounds: { default: 'light' },
}
