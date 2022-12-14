import clsx from 'clsx';
import React from 'react';
import { useMergedClasses } from 'tss-react';
import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';
import { PxPopover, type Props as PxPopoverProps } from './px-popover';
import {
  PxSelectPopoverButton,
  type Props as PxSelectPopoverButtonProps,
} from './px-select-popover-button';

interface OwnProps extends Omit<PxPopoverProps, 'renderer' | 'classes'> {
  buttonContent?: React.ReactNode;
}

/**
 * Definition of PopoverButton Props type.
 */
export type Props = React.PropsWithChildren<OwnProps> &
  Omit<PxSelectPopoverButtonProps, 'classes'> &
  StyleProps;

/**
 *
 * render a popover with button
 *
 * @public
 * @param {Props} props
 * @returns {JSX.Element}
 *
 * @example
 * Here's an example:
 *
 * ```ts
 * import { PopoverButton } from '@front.zen/mui'
 *
 * export function MyComponent() {
 *      return <PopoverButton buttonContent='click me'>
 *        <div>Hi</div>
 *      </PopoverButton>;
 * }
 * ```
 */
export function PopoverButton(props: Props) {
  const {
    fullWidth,
    fixWidth,
    placement,
    children,
    buttonContent = '',
    popperProps,
    ...buttonProps
  } = props;

  let { classes } = useStyles();
  classes = useMergedClasses(classes, props.classes);

  return (
    <PxPopover
      {...{
        fullWidth,
        fixWidth,
        placement,
        classes: {
          root: classes.root,
          popper: classes.popper,
          rootFullWidth: classes.rootFullWidth,
        },
        popperProps,
      }}
      renderer={({ onOpen }) => (
        <PxSelectPopoverButton
          {...buttonProps}
          onClick={onOpen}
          classes={{
            root: clsx(classes.buttonRoot, {
              [classes.buttonRootFullWidth]: fullWidth,
            }),
          }}
        >
          {buttonContent}
        </PxSelectPopoverButton>
      )}
    >
      {children}
    </PxPopover>
  );
}

const useStyles = makeStyles({ name: 'PopoverButton' })(() => ({
  buttonRoot: {},
  buttonRootFullWidth: {
    minWidth: '100%',
  },
  root: {},
  label: {},
  disabled: {},
  popper: {},
  rootFullWidth: {},
}));
type StyleProps = Styles<typeof useStyles>;
