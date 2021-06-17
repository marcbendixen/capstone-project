import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

EpisodeCard.propTypes = {
  episode: PropTypes.object.isRequired,
}

export default function EpisodeCard({ episode }) {
  const { name, episode_number: episodeNumber, overview } = episode
  return (
    <Wrapper>
      <Heading>
        <span>{episodeNumber}</span>
        <h4>{name}</h4>
      </Heading>
      <p>{overview}</p>
    </Wrapper>
  )
}

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 4px;
  background: #3c4b5b;
  margin-bottom: 16px;
  position: relative;

  p {
    margin: 0;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 1.1rem;
  margin-bottom: 4px;

  span {
    font-size: 1rem;
    font-weight: bold;
    color: #14171a;
    width: calc(2ch + 16px);
    text-align: center;
    background-color: #38b4f2;
    padding: 4px 8px;
    border-radius: 4px;
  }

  h4 {
    margin: 0;
  }
`
