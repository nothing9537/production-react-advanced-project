/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-useless-fragment */
export function RenderComponents(components: any[], currentIndex = 0) {
  if (currentIndex === components.length) {
    return <></>;
  }

  const CurrentComponent = components[currentIndex];

  return (
    <CurrentComponent>
      {RenderComponents(components, currentIndex + 1)}
    </CurrentComponent>
  );
}
