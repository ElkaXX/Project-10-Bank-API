import App from "./App.tsx";
import Profile from "./pages/Profile.tsx";
import SignIn from "./pages/SignIn.tsx";
import { createBrowserRouter } from "react-router-dom";
import Transactions from "./pages/Transactions.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AuthGuard from "./components/AuthGuard.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/profile",
    element: (
      <AuthGuard>
        <Profile />
      </AuthGuard>
    ),
  },
  {
    path: "/transactions",
    element: (
      <AuthGuard>
        <Transactions />
      </AuthGuard>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
