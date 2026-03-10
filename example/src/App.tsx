import { StyleSheet, Text, View } from 'react-native';
import { DetoxContext, withDetoxContext } from 'react-native-detox-context';

function Row({ label, value }: { label: string; value: unknown }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {value === undefined ? 'undefined' : JSON.stringify(value)}
      </Text>
    </View>
  );
}

function App() {
  const stringVal = DetoxContext.getString('someString');
  const boolVal = DetoxContext.getBool('someBool');
  const numberVal = DetoxContext.getNumber('someNumber');
  const undefinedVal = DetoxContext.getString('someUndefined');
  const nullVal = DetoxContext.getString('someNull');
  const objectVal = DetoxContext.getObject<{ prop1: string; prop2: string }>(
    'someObject'
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DetoxContext Values</Text>
      <Row label="isAutomatedTest" value={DetoxContext.isAutomatedTest} />
      <Row label="getString('someString')" value={stringVal} />
      <Row label="getBool('someBool')" value={boolVal} />
      <Row label="getNumber('someNumber')" value={numberVal} />
      <Row label="getString('someUndefined')" value={undefinedVal} />
      <Row label="getString('someNull')" value={nullVal} />
      <Row label="getObject('someObject')" value={objectVal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
});

export default withDetoxContext(App);
