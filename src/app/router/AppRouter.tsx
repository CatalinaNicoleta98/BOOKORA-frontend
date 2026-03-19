

import { Navigate, Route, Routes } from "react-router-dom";

const HomePage = () => {
    return <div className="p-6">Welcome to Bookora</div>;
};

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;