import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/router/AppRouter";
import ScrollToTop from "./app/router/ScrollToTop";

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen">
                <AppRouter />
            </div>
        </BrowserRouter>
    );
};

export default App;
