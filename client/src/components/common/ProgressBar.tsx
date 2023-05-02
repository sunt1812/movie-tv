import { FC } from 'react';

interface IProps {
  size?: number;
  progress: number | undefined;
  trackWidth?: number;
  trackColor?: string;
  indicatorWidth?: number;
  indicatorColor?: string;
  indicatorCap?: 'round' | 'inherit' | 'butt' | 'square' | undefined;
  label?: string;
  labelColor?: string;
  spinnerMode?: boolean;
  spinnerSpeed?: number;
}
const ProgressBar: FC<IProps> = (props) => {
  let {
    size = 55,
    progress = 0,
    trackWidth = 4,
    trackColor = `transparent`,
    indicatorWidth = 4,
    indicatorColor = `#66BB6A`,
    indicatorCap = `round`,
    spinnerMode = false,
    labelColor = '#ffffff',
  } = props;

  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((10 - progress) / 10);

  return (
    <>
      <div
        className="svg-pi-wrapper relative"
        style={{ width: size, height: size }}
      >
        <svg className="svg-pi" style={{ width: size, height: size }}>
          <circle
            className="svg-pi-track"
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className={`svg-pi-indicator ${
              spinnerMode ? 'svg-pi-indicator--spinner' : ''
            }`}
            // style={{ animationDuration: spinnerSpeed * 1000 }}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </svg>

        <span
          className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 text-white dark:${labelColor} text-xs`}
        >
          {`${progress > 10 ? 10 : progress.toFixed(1)}`}
        </span>
      </div>
    </>
  );
};

export default ProgressBar;
