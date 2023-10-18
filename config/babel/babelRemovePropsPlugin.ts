import { PluginItem } from '@babel/core';

export default function babelRemovePropsPlugin(): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        const uselessProps = state.opts.props || [];

        path.traverse({
          JSXIdentifier(currentJSX) {
            const propName = currentJSX.node.name;

            if (uselessProps.includes(propName)) {
              currentJSX.parentPath.remove();
            }
          },
        });
      },
    },
  };
}
