import { render } from '@testing-library/react';

import { Button } from './button';
import { Tag } from './tag';
import { Text } from './text';
import { Title } from './title';

describe('Atoms', () => {
  it('renders shared primitives', () => {
    const { baseElement, getByText } = render(
      <div>
        <Title>Title</Title>
        <Text muted>Text</Text>
        <Tag>Tag</Tag>
        <Button>Button</Button>
      </div>,
    );

    expect(baseElement).toBeTruthy();
    expect(getByText('Title')).toBeTruthy();
    expect(getByText('Text')).toBeTruthy();
    expect(getByText('Tag')).toBeTruthy();
    expect(getByText('Button')).toBeTruthy();
  });
});
