import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {StockOverviewPage} from "./pages/StockOverviewPage";
import {StockDetailPage} from "./pages/StockDetailPage";
import {WatchlistContextProvider} from "./context/WatchlistContext";
import {Header} from "./components/Header";

function App() {
  return (
    <main className="container">
        <Header />
        <WatchlistContextProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<StockOverviewPage/>}/>
                  <Route path="/details/:symbol" element={<StockDetailPage/>}/>
              </Routes>
          </BrowserRouter>
        </WatchlistContextProvider>
    </main>
  );
}

export default App;
