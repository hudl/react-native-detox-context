import type { DetoxPropMap } from './Types';

export default class DetoxContext {
  public static isAutomatedTest = false;

  public static automationProps: DetoxPropMap = {};

  public static init(automationProps: DetoxPropMap | undefined): void {
    DetoxContext.isAutomatedTest = !!automationProps;
    DetoxContext.automationProps = automationProps ?? {};

    if (__DEV__ && DetoxContext.isAutomatedTest) {
      console.log('[DetoxContext] Disabling LogBox during automated test');
      require('react-native').LogBox.ignoreAllLogs(true);
    }
  }

  public static getNumber(key: string): number | undefined {
    if (!DetoxContext.isAutomatedTest) {
      return undefined;
    }

    const value = DetoxContext.automationProps[key];

    if (value && typeof value === 'string') {
      const numValue = Number(value);

      if (!isNaN(numValue)) {
        return numValue;
      }
    }

    return !!value && typeof value === 'number' ? value : undefined;
  }

  public static getString(key: string): string | undefined {
    if (!DetoxContext.isAutomatedTest) {
      return undefined;
    }

    const value = DetoxContext.automationProps[key];

    return !!value && typeof value === 'string' && value !== 'null'
      ? value
      : undefined;
  }

  public static getBool(key: string): boolean | undefined {
    if (!DetoxContext.isAutomatedTest) {
      return undefined;
    }

    const value = DetoxContext.automationProps[key];

    if (value && typeof value === 'string') {
      if (value === 'true' || value === 'false') {
        return value === 'true';
      }
    }

    return !!value && typeof value === 'boolean' ? value : undefined;
  }

  public static getObject<T>(key: string): T | undefined {
    if (!DetoxContext.isAutomatedTest) {
      return undefined;
    }

    const value = DetoxContext.getString(key);

    return value ? JSON.parse(value) : undefined;
  }
}
