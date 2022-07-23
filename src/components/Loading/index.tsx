import * as S from './styles'

export type LoadingProps = {
  color?: 'primary' | 'secondary'
}

const Loading = ({ color = 'primary' }: LoadingProps) => (
  <S.Spinner color={color} aria-label="loading indicator">
    <div />
    <div />
    <div />
    <div />
  </S.Spinner>
)

export default Loading
