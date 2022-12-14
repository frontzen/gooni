import * as React from 'react';

interface OwnProps {
  useRender: () => React.ReactElement | void;
}

export type Props = OwnProps;

export function IsolatedComponent(props: Props) {
  return props.useRender() || null;
}
