import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/homepage";
import LearnMorePage from "./pages/learnmorepage";
import DashboardPage from "./pages/dashboardpage";
import SettingsPage from "./components/temp/settings";
import TrackProjectsPage from "./components/temp/trackprojects";
import { WatchListPage } from "./components/temp/watchlistpage";

export default function App() {
  return (
    
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learnmore" element={<LearnMorePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/track" element={<TrackProjectsPage />} />
          <Route path="/wishlist" element={<WatchListPage />} />
        </Routes>
      </Router>
    </RecoilRoot>  
  )
}
