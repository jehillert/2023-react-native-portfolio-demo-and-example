import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EntityEnum, ScreenEnum } from '../constants';
import { EntityId } from '@reduxjs/toolkit';

type CommonNavParams = { projectId?: EntityId } | undefined;

type RootStackParamList = {
  [ScreenEnum.DIRECTORY]: CommonNavParams;
  [ScreenEnum.EDITOR]:
    | { projectId?: EntityId; targetEntity: EntityEnum }
    | undefined;
  [ScreenEnum.MARKUP]:
    | { projectId?: EntityId; targetEntity: EntityEnum }
    | undefined;
  [ScreenEnum.PRIVACY_POLICY]: undefined;
  [ScreenEnum.TERMS_OF_SERVICE]: undefined;
};

type DirectoryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenEnum.DIRECTORY
>;

type EditorScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenEnum.EDITOR
>;

type MarkupScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenEnum.MARKUP
>;

type PrivacyPolicyScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenEnum.PRIVACY_POLICY
>;

type TermsOfServiceScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenEnum.TERMS_OF_SERVICE
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type {
  DirectoryScreenProps,
  MarkupScreenProps,
  EditorScreenProps,
  PrivacyPolicyScreenProps,
  RootStackParamList,
  TermsOfServiceScreenProps,
};

export { ScreenEnum };
