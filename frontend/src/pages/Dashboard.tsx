import SettingsSquare from "../components/IconSquare/SettingsSquare";
import NotificationSquare from "../components/IconSquare/NoificationSquare";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="header">
        <div className="settings-icon"><SettingsSquare /></div>
        <div className="home-text">Home</div>
        <div className="alarm-icon"><NotificationSquare /></div>
      </div>
    </div>
  );
}

