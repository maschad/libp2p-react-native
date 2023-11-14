/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {createNode} from './libp2p';
import {Libp2p} from 'libp2p';
import {multiaddr} from '@multiformats/multiaddr';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [connections, setConnections] = React.useState(0);
  const [libp2pNode, setNode] = React.useState<Libp2p>();
  const [maToDial, setMaToDial] = React.useState('');

  React.useEffect(() => {
    createNode().then(node => {
      node.addEventListener('peer:connect', () => {
        setConnections(c => c + 1);
      });
      node.addEventListener('peer:disconnect', () => {
        setConnections(c => c - 1);
      });
      setNode(node);
    });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const dialNode = async () => {
    if (!libp2pNode) {
      console.log('no node');
      return;
    }
    const connection = await libp2pNode.dial(multiaddr(maToDial));

    console.log('connection is:', connection);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Connections">
            <Text style={styles.highlight}>{connections}</Text>
          </Section>
          <Section title="Dial a multiaddr">
            <View>
              <TextInput
                style={styles.textInput}
                onChangeText={setMaToDial}
                value={maToDial}
                placeholder="multiaddr to dial"
              />
              <Button title="Dial" onPress={dialNode} />
            </View>
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  textInput: {
    height: 40,
    width: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
