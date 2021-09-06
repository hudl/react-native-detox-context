import React from 'react';

import DetoxContext from './DetoxContext';
import type { DetoxProps } from './Types';

export default function withDetoxContext<P>(
  Component: React.ComponentType<P>
): React.FunctionComponent<P & DetoxProps> {
  return function ComponentWithDetoxSupport(
    props: P & DetoxProps
  ): React.ReactElement {
    DetoxContext.init(props.detoxContext);
    return <Component {...props} />;
  };
}
