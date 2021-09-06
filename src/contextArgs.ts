const contextArgs = (argMap: { [key: string]: object | string | boolean }) => {
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

export default contextArgs;
