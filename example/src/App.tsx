import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { DetoxContext, withDetoxContext } from 'react-native-detox-context';

function App() {
  console.log('isAutomatedTest:', DetoxContext.isAutomatedTest);
  console.log(
    'String value from context:',
    DetoxContext.getString('someString')
  );
  console.log('Boolean value from context:', DetoxContext.getBool('someBool'));
  console.log(
    'Object value from context:',
    DetoxContext.getObject<{ prop1: string; prop2: string }>('someObject')
  );

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

export default withDetoxContext(App);
