type LoggerType = 'log' | 'group' | 'groupCollapsed';

enum c {
  black = 'rgb(0, 0, 0)',
  blue = 'rgb(71, 218, 255)',
  darkblue = 'rgb(16, 48, 255)',
  red = 'rgb(245, 0, 0)',
  green = 'rgb(95, 252, 0)',
  mint = 'rgb(82, 255, 126)',
  orange = 'rgb(248, 159, 0)',
  yellow = 'rgb(254, 252, 0)',
  violet = 'rgb(247, 119, 248)',
  purple = 'rgb(154, 58, 246)',
  pink = 'rgb(239, 24, 155)',
  hotpink = 'rgb(239, 24, 155)',
  gray = 'rgb(211, 211, 211)',
  tan = 'rgb(207, 179, 137)',
  white = 'rgb(255, 255, 255)',
}

const jogger = createJogger('log');

function createJogger(loggerType: LoggerType = 'log') {
  return {
    blue: createColorLogger({ fgColor: c.blue }),
    darkblue: createColorLogger({
      fgColor: c.darkblue,
      bgColor: c.white,
    }),
    red: createColorLogger({ fgColor: c.red }),
    green: createColorLogger({ fgColor: c.green }),
    mint: createColorLogger({ fgColor: c.mint }),
    orange: createColorLogger({ fgColor: c.orange }),
    yellow: createColorLogger({ fgColor: c.yellow }),
    pink: createColorLogger({ fgColor: c.pink }),
    violet: createColorLogger({ fgColor: c.violet }),
    purple: createColorLogger({ fgColor: c.purple }),
    white: createColorLogger({ fgColor: c.white }),
    gray: createColorLogger({ fgColor: c.gray }),
    tan: createColorLogger({ fgColor: c.tan }),
    purplePink: createColorLogger({ fgColor: `purple`, bgColor: `#FF70F4` }),
    whitePurple: createColorLogger({ fgColor: `white`, bgColor: `purple` }),
    redGold: createColorLogger({ fgColor: `darkred`, bgColor: `gold` }),
    blueWhite: createColorLogger({ fgColor: `blue`, bgColor: `white` }),
    whiteBlue: createColorLogger({ fgColor: `white`, bgColor: `blue` }),
  };
}

/**
 * @method createColorLogger()
 * Generates a logger that prints to react-native-debugger and
 * default Chrome RN debugger using the foreground and background
 * colors specified in the arguments.
 */
type CreateColorLogger = {
  loggerType?: LoggerType;
  fgColor?: string;
  bgColor?: string;
  fontWeight?: string;
  extraStyles?: string;
};

function createColorLogger({
  loggerType = 'log',
  fgColor = 'white',
  bgColor = 'black',
  fontWeight = '900',
  extraStyles,
}: CreateColorLogger) {
  return (...args: any) => {
    args.forEach((arg: any) => {
      if (loggerType === 'log' && typeof arg === 'object') {
        console.log(
          `%c  ${JSON.stringify(arg, undefined, 2)}  `,
          `color: ${fgColor}; background-color: ${bgColor}; font-weight: ${fontWeight}; ${extraStyles}`,
        );
      } else if (loggerType !== 'log') {
        // @ts-ignore
        console[loggerType](
          `%c ${arg} `,
          `color: ${fgColor}; background-color: ${bgColor};; font-weight: ${fontWeight}; ${extraStyles}`,
        );
      } else {
        console[loggerType](
          `%c  ${arg}  `,
          `color: ${fgColor}; background-color: ${bgColor};; font-weight: ${fontWeight}; ${extraStyles}`,
        );
      }
    });
  };
}

export { createJogger, jogger };
