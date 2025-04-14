import { Menu } from '@mui/icons-material';

const MainHeader = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <header className="layout__header">
    <div className="layout__logo">Logo</div>
    <Menu className="layout__hamburger" onClick={onMenuClick} />
  </header>
);

export default MainHeader;
