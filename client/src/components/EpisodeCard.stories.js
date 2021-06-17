import React from 'react'
import EpisodeCard from './EpisodeCard'

export default {
  title: 'EpisodeCard',
  component: EpisodeCard,
}

const Template = args => <EpisodeCard {...args} />

export const Default = Template.bind({})
Default.args = {
  episode: {
    name: 'Title',
    overview:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat dignissimos dolorum nulla id officiis voluptatibus sed assumenda nihil sit aliquam.',
    episode_number: 1,
  },
}
