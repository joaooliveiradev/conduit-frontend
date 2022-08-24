import styled from 'styled-components'

const Spinner = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  border: 2px solid #595a5b;
  border-top: 2px solid #f3f6f9;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const Loading = () => {
  return <Spinner />
}
