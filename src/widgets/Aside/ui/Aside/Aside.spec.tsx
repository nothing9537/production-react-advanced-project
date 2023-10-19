import { fireEvent, screen } from '@testing-library/react';
import { ComponentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Aside } from './Aside';

describe('aside', () => {
  test('text existing in DOM', () => {
    ComponentRender(<Aside />);
    expect(screen.getByTestId('aside')).toBeInTheDocument();
  });

  test('test toggle aside', () => {
    ComponentRender(<Aside />);
    const toggleButton = screen.getByTestId('aside-toggle');
    expect(screen.getByTestId('aside')).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('aside')).toHaveClass('collapsed');
  });
});
