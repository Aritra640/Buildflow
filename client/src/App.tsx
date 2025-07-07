import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/homepage";
import { WatchListPage } from "./components/temp/watchlistpage";
import { LearnMorePage } from "./pages/learnmorepage";
import { DashboardPage } from "./pages/dashboardpage";
import { SettingsPage } from "./components/temp/settings";
import { TrackProjectsPage } from "./components/temp/trackprojects";
import { UserFormPage } from "./components/temp/getstartedpage";

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
          <Route path="/getstarted" element={<UserFormPage />} />
        </Routes>
      </Router>
    </RecoilRoot>  
  )
}
