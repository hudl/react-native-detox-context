import { contextArgs } from 'react-native-detox-context';
import { device } from 'detox';

describe('Test DetoxContext', () => {
  it('should send args to JS layer', async () => {
    await device.launchApp({
      newInstance: true,
      launchArgs: contextArgs({
        someString: 'a string',
        someBool: true,
        someObject: { prop1: 'value1', prop2: 'value2' },
        someNumber: 45,
        someUndefined: undefined,
        someNull: null,
      }),
    });
  });
});
