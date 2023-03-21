import { NewArticle } from '@/components'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const Editor = () => {
  return (
    <Wrapper>
      <NewArticle />
    </Wrapper>
  )
}

export default Editor
