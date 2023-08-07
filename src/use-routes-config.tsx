import { useRoutes } from 'react-router-dom';
import React, { useMemo } from 'react';
import { ComponentConfig } from './import-components';
import WithRouteParams from './with-route-params';

/**
 * A custom hook to create route configurations and use them with React Router's `useRoutes` hook.
 *
 * @param components - An array of component configurations used to generate the route configurations.
 * @returns A routes configuration object to be used with `useRoutes` from `react-router-dom`.
 *
 * @remarks
 * The `useRoutesConfig` hook takes an array of `ComponentConfig` objects as input, where each object
 * contains the following properties:
 * - `name` (string): The name of the component.
 * - `path` (string): The route path for the component.
 * - `Component` (React.FC): The React functional component to be rendered for the route.
 * - `paramKeys` (string[]): An array of strings representing the dynamic parameter names in the route path.
 *   The component will receive these dynamic parameters as props using the `useRouteParams` hook.
 *
 * The hook uses `useMemo` to generate the route configurations based on the provided `components`.
 * It then returns the route configuration object, which can be used with `useRoutes` from `react-router-dom`
 * to set up the application's routes.
 *
 * @example
 * const components = [
 *   {
 *     path: '/blog/page/:id',
 *     Component: BlogPage,
 *     paramKeys: ['id'],
 *   },
 *   {
 *     path: '/solution/:solutionId/workspace/:workspaceId',
 *     Component: WorkspacePage,
 *     paramKeys: ['solutionId', 'workspaceId'],
 *   },
 *   // Add more component configurations as needed
 * ];
 *
 * function App() {
 *   const routesConfig = useRoutesConfig(components);
 *   return (
 *     <Router>
 *       <Outlet routes={routesConfig} />
 *     </Router>
 *   );
 * }
 */
const useRoutesConfig = (components: ComponentConfig[]) => {
  const routesConfig = useMemo(
    () =>
      components.map(
        ({
          path,
          Component,
          paramKeys,
        }: {
          path: string;
          Component: React.FC;
          paramKeys: string[];
        }) => ({
          path,
          element: (
            <WithRouteParams Component={Component} paramKeys={paramKeys} />
          ),
        })
      ),
    [components]
  );

  return useRoutes(routesConfig);
};

export default useRoutesConfig;
