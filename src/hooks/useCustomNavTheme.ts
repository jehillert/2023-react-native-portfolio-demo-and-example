import { DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

const useCustomNavTheme = () => {
  const { colors } = useTheme() ?? {};

  return {
    ...DefaultTheme,
    colors: {
      primary: colors,
      background: "rgb(242, 242, 242)",
      card: "rgb(255, 255, 255)",
      text: "rgb(28, 28, 30)",
      border: "rgb(216, 216, 216)",
      notification: "rgb(255, 59, 48)"
  }
}

export { useCustomNavTheme };