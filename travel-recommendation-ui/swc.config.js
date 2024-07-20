module.exports = {
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: true,
        dynamicImport: true,
      },
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  };
  