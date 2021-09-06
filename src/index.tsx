import React from 'react';
import { LogBox } from 'react-native';

export type DetoxPropMap = { [key: string]: string | boolean | undefined };
export type DetoxProps = { detoxContext: DetoxPropMap };

export default class DetoxContext {
  public static isAutomatedTest = false;
  public static automationProps: DetoxPropMap = {};

  public static init(automationProps: DetoxPropMap | undefined): void {
    DetoxContext.isAutomatedTest = !!automationProps;
    DetoxContext.automationProps = automationProps ?? {};

    if (__DEV__ && DetoxContext.isAutomatedTest) {
      console.log('Disabling LogBox during automated test');
      LogBox.ignoreAllLogs(true);
    }
  }

  public static getString(key: string): string | undefined {
    if (!DetoxContext.isAutomatedTest) {
      return undefined;
    }

    const value = DetoxContext.automationProps[key];
    return value !== undefined && typeof value === 'string' ? value : undefined;
  }

  public static getBool(key: string): boolean | undefined {
    if (!DetoxContext.isAutomatedTest) {
      return undefined;
    }

    const value = DetoxContext.automationProps[key];
    return value !== undefined && typeof value === 'boolean'
      ? value
      : undefined;
  }

  public static getObject<T>(key: string): T | undefined {
    if (!DetoxContext.isAutomatedTest) {
      return undefined;
    }

    const value = DetoxContext.getString(key);

    return value !== undefined ? JSON.parse(value) : undefined;
  }
}

export function withDetoxContext<P>(
  Component: React.ComponentType<P>
): React.FunctionComponent<P & DetoxProps> {
  return function ComponentWithDetoxSupport(
    props: P & DetoxProps
  ): React.ReactElement {
    DetoxContext.init(props.detoxContext);
    return <Component {...props} />;
  };
}

export const detoxContextArgs = (argMap: {
  [key: string]: object | string | boolean;
}) => {
  Object.keys(argMap).forEach((key) => {
    const value = argMap[key];

    if (typeof value === 'object') {
      argMap[key] = JSON.stringify(value);
    }
  });

  return {
    isAutomatedTest: true,
    ...argMap,
  };
};
