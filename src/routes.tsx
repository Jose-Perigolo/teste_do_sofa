import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Sofas from "./pages/Sofas";
import Reports from "./pages/Reports";

import { getToken } from "./services/auth.service";
import Inspectors from "./pages/Inspectors";

function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = getToken();

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/sofas" element={<RequireAuth><Sofas /></RequireAuth>
            } />
            <Route path="/reports" element={<RequireAuth><Reports /></RequireAuth>} />
            <Route path="/inspectors" element={<RequireAuth><Inspectors /></RequireAuth>} />

        </Routes>
    )
}