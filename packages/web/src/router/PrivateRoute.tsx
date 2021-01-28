import { Redirect, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  isAuthenticated?: boolean;
}

export function PrivateRoute({
  component: Component,
  isAuthenticated,
  ...rest
}: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={(props) =>
        Component && isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
}
