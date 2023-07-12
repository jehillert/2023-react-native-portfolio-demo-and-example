import { DefaultTheme } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';

const useCustomNavTheme = () => {
  const { colors } = useTheme();

  return {
    ...DefaultTheme,
    colors: {
      primary: colors.primaryMain,
      background: colors.backgroundDefault,
      card: colors.backgroundPaper,
      text: colors.textPrimary,
      border: colors.textPrimary,
      notification: colors.errorMain,
    },
  };
};

export { useCustomNavTheme };
