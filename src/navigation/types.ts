import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

type DrawerParamList = {
  Directory: { id?: string } | undefined;
  Note: { id?: string } | undefined;
};

type StackParamList = {
  Directory: { id?: string } | undefined;
  Note: { id?: string } | undefined;
};

type DrawerNavScreenProps<T extends keyof DrawerParamList> = DrawerScreenProps<
  DrawerParamList,
  T
>;

type DirectoryScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'Directory'>,
  DrawerNavScreenProps<'Directory'>
>;

type NoteScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'Note'>,
  DrawerNavScreenProps<'Note'>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends DrawerParamList {}
  }
}

export type {
  DrawerParamList,
  StackParamList,
  DrawerNavScreenProps,
  DirectoryScreenProps,
  NoteScreenProps,
};
