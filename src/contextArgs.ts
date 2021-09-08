const contextArgs = (argMap: {
  [key: string]: object | string | number | boolean | null | undefined;
}) => {
  Object.keys(argMap).forEach((key) => {
    const value = argMap[key];

    if (typeof value === 'object') {
      argMap[key] = JSON.stringify(value);
    } else if (value === undefined) {
      // Detox doesn't like undefined values on Android and will crash
      argMap[key] = null;
    }
  });

  return {
    isAutomatedTest: true,
    ...argMap,
  };
};

export default contextArgs;
