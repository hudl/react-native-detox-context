# react-native-detox-context

**Easily pass data from your Detox e2e tests to the JS layer of your React Native application.**

* Minimal setup.
* Dynamically pass strings, booleans or objects.
* Android and iOS support.
* Access context data in any of your React components.
* Written in TypeScript.

**Example Detox e2e test**

```typescript
import { contextArgs } from 'react-native-detox-context';

describe('Some Test suite', () => {
    it('should test my feature', async () => {
        // This args will automatically be available in your 
        // React Native app during the e2e test.
        const args = contextArgs({
            someString: 'a string',
            someBool: true,
            someObject: { prop1: 'value1', prop2: 'value2' },
        });

        await device.launchApp({ 
            newInstance: true, 
            launchArgs: args 
        });
  });
});
```

**Example RN app**

```tsx
import React from 'react';
import { withDetoxContext, DetoxContext } from 'react-native-detox-context';

function App() {
  console.log('isAutomatedTest:', DetoxContext.isAutomatedTest); // true during e2e tests

  console.log('String value from context:', DetoxContext.getString('someString'));
  console.log('Boolean value from context:', DetoxContext.getBool('someBool'));
  console.log('Object value from context:', DetoxContext.getObject<SomeType>('someObject'));

  return <View />;
}

export default withDetoxContext(App);
```

## Motivation

When writing end-to-end tests with [Detox](https://github.com/wix/Detox), there usually comes a time when you need to supply some flag and/or data to your React components (_such as test data, or some flag to disable a feature, or perhaps authentication details etc_). The standard way to achieve this in Detox is by using its [Launch Arguments](https://github.com/wix/Detox/blob/master/docs/APIRef.LaunchArgs.md) API. This API works great (and `react-native-detox-context` makes use of it), but it involves developers having to work in native code, and understand things like working with Android Bundles and iOS Process Info arguments. Not only that, you usually end up having to revisit your native code each time you have a new piece of data you'd like to send. 

The `react-native-detox-context` library removes the need for native knowlegde and greatly simplifies how you pass data to your React Native application. You set it up once at the native layer and never need to revisit it again.

## Installation

**Note: These steps assume you have a React Native project that's already setup with [Detox](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md).**

```sh
yarn add react-native-detox-context
```
### JS setup

Wrap your root component in the `withDetoxContext` higher order component:

```typescript
import { withDetoxContext } from 'react-native-detox-context';

function App() {
    ...
}

export default withDetoxContext(App);
```

### Android setup

Update your `MainActivity.java` with the following changes:

```diff
package com.somepackage;

import com.facebook.react.ReactActivity;
+ import android.os.Bundle;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.hudl.rn.detoxcontext.DetoxContext;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "somecomponent";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected Bundle getLaunchOptions() {
+        return DetoxContext.processLaunchArgs(getIntent());
+      }
+    };
+  }
}
```

### iOS setup

First run a pod install (e.g. `npx pod-install`) so that the `react-native-detox-context` library gets linked.

Secondly update your `AppDelegate.m` with these changes:

1. Add the following import

```objectivec
@import react_native_detox_context;
```

2. Update the `initialProperties` param:

```objectivec

// Before (initialProperties is nil)
RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                 moduleName:@"somecomponent"
                                          initialProperties:nil];

// After (i.e. update the initialProperties from nil to [DetoxContext processLaunchArgs])
RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                 moduleName:@"somecomponent"
                                          initialProperties:[DetoxContext processLaunchArgs]];
```

## Usage

### Send arguments from e2e tests

Use the `contextArgs` function, passing an object. The object can have string values, boolean values or object values.

Pass the object returned from `contextArgs()` to the `launchArgs` prop in the Detox `device.launchApp` function.

```javascript
import { contextArgs } from 'react-native-detox-context';

describe('Some Test suite', () => {
    it('should test my feature', async () => {
        // This args will automatically be available in your 
        // React Native app during the e2e test.
        const args = contextArgs({
            someString: 'a string',
            someBool: true,
            someObject: { prop1: 'value1', prop2: 'value2' },
        });

        await device.launchApp({ 
            newInstance: true, 
            launchArgs: args 
        });
  });
});
```

### Use arguments in your React Native application

```jsx
import { withDetoxContext, DetoxContext } from 'react-native-detox-context';

interface SomeType {
    prop1: string;
    prop2: string;
}

function App() {
    console.log('isAutomatedTest:', DetoxContext.isAutomatedTest); // true during e2e tests

    // If the key you pass is present in the Detox Context then the value will 
    // be returned, otherwise 'undefined' will be returned.
    //
    // You can use these functions anywhere in your component tree.
    console.log('String value', DetoxContext.getString('someString'));
    console.log('Boolean value', DetoxContext.getBool('someBool'));
    console.log('Object value', DetoxContext.getObject<SomeType>('someObject'));
    
    ...
}

export default withDetoxContext(App);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
