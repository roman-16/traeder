export default <T>(maxLength: number) => {
  const values: Array<T> = [];

  return {
    values,
    add: (value: T) => {
      values.unshift(value);

      if (values.length > maxLength) {
        values.pop();
      }

      return values;
    },
  };
};
