import { Title } from './index'

import { storiesOf } from '@storybook/react'

storiesOf('Title', module)
  .add('Red', () => {
    return <Title color="red" />
  })
  .add('Blue', () => {
    return <Title color="blue" />
  })
