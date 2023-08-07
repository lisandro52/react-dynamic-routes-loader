import React from 'react';
import { useParams } from 'react-router-dom';

const WithRouteParams = ({
  Component,
  paramKeys,
}: {
  Component: React.FC;
  paramKeys: string[];
}) => {
  const params = useParams();
  const routeParams = paramKeys.reduce(
    (acc: Record<string, string>, key: string) => {
      acc[key] = params[key] ?? '';
      return acc;
    },
    {} as Record<string, string>
  );

  return <Component {...routeParams} />;
};

export default WithRouteParams;
