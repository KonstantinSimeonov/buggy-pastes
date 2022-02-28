import { render } from '@testing-library/react'
import CreatePaste from './create'

describe('Create Paste', () => {
  it('renders without crashing', () => {
    expect(render(<CreatePaste />)).toMatchSnapshot()
  })
})
