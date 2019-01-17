import * as React from 'react';

interface Props {
  onEffect: () => void | (() => void);
}

export const OnMount = ({onEffect}: Props) => {
  React.useEffect(onEffect, []);
  return null;
}