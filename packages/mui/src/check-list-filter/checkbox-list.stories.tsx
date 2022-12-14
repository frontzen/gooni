import { CheckboxList, PxCheckListFilter, SelectOption } from '@front.zen/mui';
import { Box, Button } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';

export default {
  title: 'Check List Filter',
} as Meta;

const ITEMS: SelectOption[] = [
  { value: '1', label: 'آیتم شماره یک' },
  { value: '2', label: 'آیتم شماره دو' },
  { value: '3', label: 'آیتم شماره سه' },
];

export const CheckBoxListStory: Story = () => {
  return <CheckboxList items={ITEMS} />;
};

export const UnControlledCheckListFilter: Story = () => {
  return (
    <Box width={400}>
      <PxCheckListFilter
        items={ITEMS}
        buttonContent="click me"
        resetLabel="reset"
        onChange={action('onChange')}
        onReset={action('onReset')}
      />
    </Box>
  );
};

export const ControlledCheckListFilter: Story = () => {
  const [checked, setChecked] = React.useState<string[]>([]);

  return (
    <Box width={400}>
      <PxCheckListFilter
        checked={checked}
        onChange={setChecked}
        items={ITEMS}
        resetLabel="reset list"
        buttonContent="click me"
        onReset={action('onReset')}
      />
      {checked.join(', ')}
    </Box>
  );
};

export const ControlledCheckListFilterWithoutResetButton: Story = () => {
  const [checked, setChecked] = React.useState<string[]>([]);

  const handleReset = () => {
    setChecked([]);
  };

  return (
    <Box width={400}>
      <Button onClick={handleReset}>reset</Button>
      <PxCheckListFilter
        checked={checked}
        onChange={setChecked}
        items={ITEMS}
        showResetButton={false}
        buttonContent="click me"
        onReset={action('onReset')}
      />
      {checked.join(', ')}
    </Box>
  );
};
