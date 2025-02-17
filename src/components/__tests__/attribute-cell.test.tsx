import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AttributeCell } from '../attribute-cell.component';

describe('AttributeCell', () => {
  const renderAttributeCell = (attribute: string, value: string) => {
    return render(<AttributeCell attribute={attribute} value={value} />);
  };

  it('renders attribute name correctly', () => {
    renderAttributeCell('Height', '7 m');
    expect(screen.getByText('Height')).toBeInTheDocument();
  });

  it('renders attribute value correctly', () => {
    renderAttributeCell('Weight', '69 kg');
    expect(screen.getByText('69 kg')).toBeInTheDocument();
  });

  it('applies correct styling to attribute title', () => {
    renderAttributeCell('Height', '7 m');
    const title = screen.getByText('Height');
    expect(title).toHaveStyle({
      color: '#30a7d7',
      textTransform: 'capitalize',
    });
  });

  it('applies correct styling to attribute value', () => {
    renderAttributeCell('Weight', '69 kg');
    const value = screen.getByText('69 kg');
    expect(value).toHaveStyle({
      color: '#212121',
    });
  });

  it('renders within a grid item', () => {
    renderAttributeCell('Height', '7 m');
    const gridItem = screen.getByText('Height').closest('div');
    expect(gridItem).toBeInTheDocument();
  });

  it('applies hover styles to card', () => {
    renderAttributeCell('Height', '7 m');
    const card = screen.getByText('Height').closest('div');
    expect(card).toHaveStyle({
      transition: 'transform 0.2s ease-in-out,box-shadow 0.2s ease-in-out',
    });
  });

  it('renders with correct layout structure', () => {
    renderAttributeCell('Height', '7 m');
    const card = screen.getByText('Height').closest('div');
    expect(card).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    });
  });
}); 