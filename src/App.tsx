import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SofaStateProvider } from "./contexts/SofaStateContext";
import { UserStateProvider } from "./contexts/UserStateContext";
import Routes from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SofaStateProvider>
          <UserStateProvider>
            <Routes />
          </UserStateProvider>
        </SofaStateProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}