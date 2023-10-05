/* eslint-disable react/jsx-no-useless-fragment */
export function renderComponents(components: any[], currentIndex = 0) {
  if (currentIndex === components.length) {
    return <></>;
  }

  const CurrentComponent = components[currentIndex];

  return (
    <CurrentComponent>
      {renderComponents(components, currentIndex + 1)}
    </CurrentComponent>
  );
}
