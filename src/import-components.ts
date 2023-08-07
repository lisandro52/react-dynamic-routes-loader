import React from 'react';

function extractDynamicParams(route: string) {
  const regex = /:(\w+)/g;
  const matches = route.match(regex);
  if (matches) {
    return matches.map((match) => match.substring(1)); // Remove the leading ":"
  }
  return [];
}

/**
 * Represents a configuration for a component to be used in route setup.
 */
export type ComponentConfig = {
  /**
   * The name of the component.
   */
  name: string;

  /**
   * The React functional component to be rendered for the route.
   */
  Component: React.FC;

  /**
   * The react router path for the component. It can include dynamic parameters.
   */
  path: string;

  /**
   * An array of strings representing the dynamic parameter names in the route path.
   */
  paramKeys: string[];
};

// I don't know the type of require.context, so I'm using any
export function importComponents(context: any, rootDir: string) {
  const keys = context.keys();
  const components: ComponentConfig[] = [];

  keys.forEach((key: string) => {
    const component = context(key);
    const componentName = key.replace(/^.*[\\\/]/, '').replace(/\.\w+$/, '');
    const componentPath = key.replace(/\.\//, '');
    const { config } = component;
    if (!config) {
      // eslint-disable-next-line no-console
      console.warn(`Component ${componentName} does not have a config object`);
      return;
    }
    components.push({
      name: componentName,
      Component: React.lazy(() => import(`${rootDir}/${componentPath}`)),
      path: config.path,
      paramKeys: extractDynamicParams(config.path),
      ...config,
    });
  });

  return components;
}
