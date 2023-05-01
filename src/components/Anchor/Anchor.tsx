import { default as NextLink } from 'next/link'
import styled from 'styled-components'

export type AnchorProps = {
  href: string
  children: React.ReactNode
  prefetch?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const Link = styled.a`
  cursor: pointer;
  user-select: none;
`

export const Anchor = ({
  href,
  children,
  prefetch = false,
  ...rest
}: AnchorProps) => (
  <NextLink href={href} passHref prefetch={prefetch}>
    <Link {...rest}>{children}</Link>
  </NextLink>
)
