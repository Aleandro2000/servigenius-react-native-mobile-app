import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const reset = (name) => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{
        name,
      }],
    });
  }
};

export const push = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
};
