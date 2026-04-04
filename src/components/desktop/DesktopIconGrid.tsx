import DesktopIcon from './DesktopIcon';
import { desktopIcons } from '../../data/desktopIcons';

export default function DesktopIconGrid() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 16,
        bottom: 64,
        display: 'grid',
        gridTemplateRows: 'repeat(auto-fill, 80px)',
        gridAutoFlow: 'column',
        gridAutoColumns: '80px',
        gap: 16,
        zIndex: 5,
      }}
    >
      {desktopIcons.map(ic => (
        <DesktopIcon key={ic.id} icon={ic.icon} label={ic.label} appId={ic.appId} />
      ))}
    </div>
  );
}
