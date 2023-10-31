/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-useless-fragment */
export const DrawComponentsTree = (components: any[], currentIndex = 0) => {
  if (currentIndex === components.length) {
    return <></>;
  }

  const CurrentComponent = components[currentIndex];

  return (
    <CurrentComponent>
      {DrawComponentsTree(components, currentIndex + 1)}
    </CurrentComponent>
  );
};
