import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer ,createApp, createNavigationContainer} from 'react-navigation';


/* サンプルデータ */
const mathematics = [
  { key: 'geo', title: 'Geometry', detail: '幾何学（きかがく）は、図形や空間の性質について研究する数学の分野である。イエズス会マテオ・リッチによるgeometriaの中国語訳である。以前はgeometria の冒頭のgeo-を音訳したものであるという説が広く流布していたが、近年の研究により否定されている。 もともと測量の必要上からエジプトで生まれたものだが、人間に認識できる図形に関する様々な性質を研究する数学の分野としてとくに古代ギリシャにて独自に発達し、これらのおもな成果はB.C.300年ごろユークリッドによってユークリッド原論にまとめられた。その後中世以降のヨーロッパにてユークリッド幾何学を発端とする様々な幾何学が登場することとなる。' },
  { key: 'ana', title: 'Analysis', detail: '解析学（かいせきがく）とは、極限や収束といった概念を扱う数学の分野である。代数学、幾何学と合わせ数学の三大分野をなす。数学用語としての解析学は要素還元主義とは異なっており、初等的には微積分や級数などを用いて関数の変化量などの性質を調べる分野と言われることが多い。これは解析学がもともとテイラー級数やフーリエ級数などを用いて関数の性質を研究していたことに由来する。' },
  { key: 'alg', title: 'Algebra', detail: '代数学（だいすうがく）は数学の一分野で、「代数」 の名の通り数の代わりに文字を用いて方程式の解法を研究する学問として始まった。しかし19世紀以降の現代数学においては、ヒルベルトの公理主義やブルバキスタイルに見られるように、代数学はその範囲を大きく広げているため、「数の代わりに文字を用いる数学」や「方程式の解法の学問」という理解の仕方は必ずしも適当ではない。現代数学においては、方程式の研究は方程式論（代数方程式論）という代数学の古典的一分野として捉えられている。現在は代数学と言えば以下の抽象代数学をさすのが普通である。' },
];

/* スタイル */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    color: 'rgba(14, 13, 13, .38)',
  },
  paragraph: {
    fontSize: 18,
    color: '#737373',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(14, 13, 13, .38)',
    marginVertical: 12,
  },
});

/*
 * データのタイトルをリスト表示するコンポーネント
 * ナビゲーターで描画すると引数(props)に`navigation`が渡される
 */
const ListScreen = ({ navigation }) => (
  <FlatList
    data={mathematics}
    renderItem={({ item }) => (
      <TouchableOpacity
        key={item.key}
        style={styles.listItem}
        /* タイトルが押されたら詳細画面にナビゲート、`item`を引数として渡している */
        onPress={() => navigation.navigate('Detail', item)}
      >
    <Text style={styles.heading}>{item.title}</Text>
    </TouchableOpacity>
    )}
  contentContainerStyle={styles.container}
  />
);

/* ナビゲーションの見た目や挙動に関する設定 */
ListScreen.navigationOptions = () => ({
  /* 画面ヘッダーに表示するタイトルを'Mathematics'にする */
  title: 'Mathematics',
});

// データの詳細を表示するコンポーネント
const DetailScreen = ({ navigation }) => (
  <View style={styles.container}>
      {/* `navigation.state.params`からリストで渡した`item`の中身が取れる */}
      <Text style={[styles.heading, { marginBottom: 24 }]}>{navigation.state.params.title}</Text>
      <Text style={styles.paragraph}>{navigation.state.params.detail}</Text>
    </View>
);

/*
 * StackNavigatorを作成
 * 第一引数は登録する画面(Screen)情報を設定
 * 第二引数はオプション、初期表示画面を設定
//  */
const RootStack = createStackNavigator({
  Detail: { screen: DetailScreen },
  List: { screen: ListScreen },
  // DetailScreen: DetailScreen,
  // ListScreen:ListScreen
}, {
  initialRouteName: 'List',
});
// export default App;

const AppNavigator = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppNavigator/>;
  }
}

