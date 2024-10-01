import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

const AuthGuard: FC<{ children: ReactElement }> = ({ children }) => {
  const { isAuthorized } = useSelector(
    (state: RootState) => state.authentication
  );

  if (!isAuthorized) {
    return <Navigate replace to="/" />;
  }

  return children;
};

export default AuthGuard;
