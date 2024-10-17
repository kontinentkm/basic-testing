type LinkedListNode<T> = {
  value: T | null;
  next: LinkedListNode<T> | null;
};

export const generateLinkedList = <T>(elements: T[]): LinkedListNode<T> => {
  if (!elements.length) {
    return { value: null, next: null };
  }

  const [head, ...rest] = elements;

  return {
    value: head ?? null,
    next: generateLinkedList(rest),
  };
};

  // Check match by comparison with snapshot
  // test('should generate linked list from values 2', () => {
  //   const input = ['a', 'b', 'c'];
  //   const result = generateLinkedList(input);

  //   expect(result).toMatchSnapshot();
  // });