import { StyleSheet } from 'react-native'
import React from 'react'
import { Button, TextInput, HelperText, BottomNavigation} from 'react-native-paper';
import DrawerNav from "../DrawerNav"

const HomeRoute = () => <Text>Home Screen</Text>;
const SettingsRoute = () => <Text>Settings Screen</Text>;
const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'settings', title: 'Settings', icon: 'settings' },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    settings: SettingsRoute,
  });
  return (
    <View style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
      <DrawerNav/>
    </View>
  );
};

const styles = StyleSheet.create({
  
});
export default HomeScreen