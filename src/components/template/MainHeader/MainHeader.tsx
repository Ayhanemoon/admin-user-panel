import { Menu } from '@mui/icons-material';

const MainHeader = ({ mobileMode, onMenuClick }: { mobileMode: boolean; onMenuClick: () => void }) => (
  <header className="layout__header">
    {mobileMode && <Menu className="layout__hamburger" onClick={onMenuClick} />}
    <div className="layout__logo">هویتا</div>
  </header>
);

export default MainHeader;
