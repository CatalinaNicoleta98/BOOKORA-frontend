import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/router/AppRouter";

const App = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                <AppRouter />
            </div>
        </BrowserRouter>
    );
};

export default App;