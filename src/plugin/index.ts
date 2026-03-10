import {
  type ConfigPlugin,
  withAppDelegate,
  withMainActivity,
} from 'expo/config-plugins';

const withReactNativeDetoxContextAndroid: ConfigPlugin = (rootConfig) => {
  rootConfig = withMainActivity(rootConfig, (config) => {
    const mainActivity = config.modResults;

    mainActivity.contents = mainActivity.contents
      .replace(
        'import expo.modules.ReactActivityDelegateWrapper',
        `import expo.modules.ReactActivityDelegateWrapper
import com.hudl.rn.detoxcontext.DetoxContext`
      )
      .replace(
        '){})',
        `){
              override fun getLaunchOptions() = DetoxContext.processLaunchArgs(intent)
          })`
      );

    return config;
  });

  return rootConfig;
};

const withReactNativeDetoxContextIOS: ConfigPlugin = (rootConfig) => {
  rootConfig = withAppDelegate(rootConfig, (config) => {
    config.modResults.contents = config.modResults.contents
      .replace(
        `import ReactAppDependencyProvider`,
        `import ReactAppDependencyProvider
#if os(iOS)
import RNDetoxContext
#endif`
      )
      .replace(
        `let delegate = ReactNativeDelegate()`,
        `let delegate = ReactNativeDelegate()
#if os(iOS)
    let initialProperties = DetoxContext.processLaunchArgs()
#else
    let initialProperties: [String: Any] = [:]
#endif`
      )
      .replace(
        'in: window,',
        `in: window,
      initialProperties: initialProperties,`
      );

    return config;
  });

  return rootConfig;
};

const withReactNativeDetoxContext: ConfigPlugin = (rootConfig) => {
  rootConfig = withReactNativeDetoxContextAndroid(rootConfig);
  rootConfig = withReactNativeDetoxContextIOS(rootConfig);

  return rootConfig;
};

export default withReactNativeDetoxContext;
