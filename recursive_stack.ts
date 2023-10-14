export type Stack<T> = {
  top: () => null | T;
  pop: () => Stack<T>;
  push: (element: T) => Stack<T>;
};

const makeStack = <T>(stack: ReadonlyArray<T>): Stack<T> => ({
  top: () => (stack.length > 0 ? stack[stack.length - 1] : null),
  pop: () => (stack.length > 0 ? makeStack(stack.slice(-1)) : makeStack<T>([])),
  push: (element: T) => makeStack(stack.concat(element)),
});

const _pushRStack = <T>(el: T, oldStack: Stack<T>): Stack<T> => ({
  top: () => el,
  pop: () => oldStack,
  push: (newEl) => _pushRStack(newEl, _pushRStack(el, oldStack)),
});
export const emptyRStack = <T>(el?: T): Stack<T> => ({
  top: () => null,
  pop: () => emptyRStack(),
  push: (newEl) => _pushRStack(newEl, emptyRStack(el)),
});

//////////////////////////////
// testing
const stack = makeStack<number>([]);
const stack2 = stack.push(1).push(2);
console.log("stack top: ", stack.top());
console.log("stack2 top: ", stack2.top());
const rStack = emptyRStack<number>();
const rStack1 = rStack.push(1);
const rStack2 = rStack.push(2);
const rStack3 = rStack2.push(3);
const rStack4 = rStack3.pop();
console.log("rStack", rStack.top());
console.log("rStack1", rStack1.top());
console.log("rStack2", rStack2.top());
console.log("rStack3", rStack3.top());
console.log("rStack4", rStack4.top());
console.log(
  emptyRStack(3).push(2).push(4).push(5).pop().pop().pop().pop().top()
);
