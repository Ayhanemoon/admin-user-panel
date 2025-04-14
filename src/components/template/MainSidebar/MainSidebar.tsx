import clsx from 'clsx';

const Sidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <aside className={clsx('layout__sidebar', { 'layout__sidebar--open': open })}>
    <nav>
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/settings">Settings</a></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
