# static site boilerplate by VuePress

## use

### init
require yarn

```
yarn install
```

### dev

```
yarn dev
```

### build

```
yarn build
```

### directory

```
app/
├── .vuepress
│   ├── components
│   │   ├── home.vue                // homeページ用のルートコンポーネント
│   │   └── test.vue                // testページ用のルートコンポーネント
│   ├── config-files
│   │   ├── data-common.js          // vue componentで使うglobal変数(common)
│   │   ├── data-en.js              // vue componentで使うglobal変数(ja)
│   │   ├── data-ja.js              // vue componentで使うglobal変数(en)
│   │   └── locales.js              // configのlocale
│   │   └── webpack.config.js       // configのchainwebpack
│   ├── config.js
│   ├── enhance-files
│   │   ├── custom-data-mixin.js    // config/files以下のdata.jsを流し込むやつ
│   │   ├── header-mixin.js         // titleタグを上書きするやつ
│   │   └── path-func.js            // path関連の関数を追加するやつ
│   ├── enhanceApp.js
│   ├── public
│   │   └── img
│   │       └── icon.jpg
│   ├── styles
│   │   └── variables.styl          // ページ全体で使いたいstylusの変数とか関数を定義したファイル
│   └── theme
│       ├── Layout.vue
│       ├── NotFound.vue
│       ├── Page.vue
│       ├── styles
│       │   ├── common.styl
│       │   └── reset.styl
│       └── util.js
│                                   // 以下はページディレクトリ構成のmdファイル 
├── en
│   ├── index.md
│   └── test
│       └── index.md
├── index.md
└── test
    └── index.md
build/                              // buildファイル
```

## 開発メモ

gulp + webpackの疲れからvuepressをやっていくことにした。
いろいろ初めてなのであとで振り返る用or記事にまとめる用？にメモ
Getting Startをみてstartしていみたはいいものの何がどうなってるかわからないので
defaultのテンプレートをさわっていくことにした。

### テンプレートダイエット方式 
https://vuepress.vuejs.org/guide/custom-themes.html#app-level-enhancements
の１番下、`vuepress eject [targetDir]`より、`vuewpress eject ./`.vuepress/theme以下に
ズラーっとファイルが入ってくる。エントリーポイントはLayout.vueなのでそこを起点にダイエットする。
vue.jsの知見が全くない状態でやっているのでvueの書き方の参考になりそうなコードが多くあるが目をつぶってひたすら消す。
最終的にはLayout,NotFound,Page, utilsだけになった。stylesは全部消して自分がいつも使ってるreset.stylを入れておいた。 

### webページをつくる
どうやら.vuepress/以外のディレクトリをつくってそこに.mdファイルを置けば勝手にページが出来ていくらしい。
とりあえずこんな構成のサイトってことにした。

├── en
│   ├── index.md
│   └── test
│       └── index.md
├── index.md
└── test
    └── index.md 

### ダイエットしすぎてハマる
https://vuepress.vuejs.org/config/#head
ここ見ながらconfigをさわっていたらビルドしたときだけtitle, description, langが
変わらないという現象に見舞われ2時間弱くらいついに原因を突き詰めた。
Layout.vueの

```Layout.vue
created () {
  if (this.$ssrContext) {
    this.$ssrContext.title = this.$title
    this.$ssrContext.lang = this.$lang
    this.$ssrContext.description = this.$page.description || this.$description
  }
},
```

ここ超大事だったぽい。これ復活させたらできた。
ちなみにタイトルとかディスクリプションとかconfigでもできるし、
configの中のlocaleでもディレクトリごとでもできるし
マークダウン側でFrontMatterで指定もできるらしい
config, locale, frontmatterの順で上書きされていく気がする。
ちゃんと調べていない。

※後日記 dataMixin.jsの中に優先順位書いてある
https://github.com/vuejs/vuepress/blob/236224df4cb8424c7e75892c4bea49b2a6cb7cf4/lib/app/dataMixin.js
気に入らない場合は以下の[タイトルいじる](#タイトルいじる)
みたいな感じで自分でmixinを書いてラップすればいける気がする。試してない。


ただ、便利な分バラバラになりがちなので自分ルールで

- マークダウン(yaml)には何も書かない
- configに共通のものを書く
- localeに個別で変えないといけなくなったものだけ書く
- config肥大化しそうなので分けたほうが便利そうなものは分ける(config-files/以下)

ということにする。
どうしてもマークダウンになにか設定的なを書かないといけなくなったときはまた考える。

### タイトルいじる
タイトルがデフォルトでは"Title | SubPage Title"みたいな感じになるので修正したい。

https://qiita.com/gollowars/items/845baa30ceb7cc035919#%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%82%92%E5%A4%89%E6%9B%B4%E3%81%99%E3%82%8B

### pugにする
静的サイトをつくるのにタグ書くなんてしんどすぎる

https://qiita.com/gollowars/items/845baa30ceb7cc035919#pug%E3%82%92%E4%BD%BF%E3%81%86

### styleについて考える
cssはstylus派
基本はjs in css各コンポーネントごとにstyleを書いていく方針にする。

#### グローバル変数
しかし色とかmixinとかそういうのはグローバルに変数を持ちたい。
というわけでこれはVuePressというよりはVueの知見だが以下を参考にしていろいろやった。
https://badacadabra.github.io/Using-global-style-rules-in-a-Vue-js-app/

VuePressのwebpackconfigはwebpack-chainというやつで記述しないといけく、
そっちの記法に合わせていかないといけないので若干時間かかった

こんなディレクトリ構成だとして

.vuepress/
├── config.js
├── styles
│   └── variables.styl

```variables.styl
$red = #ff0000
$green = #00ff00
$blue = #0000ff
```

```config.js
module.exports = {
    config.plugin('loader-option')
      .use(webpack.LoaderOptionsPlugin, [
        {
          options: {
            stylus: {
              import: [path.resolve(__dirname, './styles/variables.styl')]
            }
          }
        }
      ])
  }
}
```

これでどのファイルでもvariables.stylで定義した変数がつかえるようになった。

#### sourceMap
何もしないとソースマップが出ないので
vuepress/lib/webpack/createBaseConfig.js
のcss-loaderの部分をいじるとできるんだが
一行なおしてpull request送ったが果たして取り込まれるかどうか。。。

->取り込まれたやったー！(https://github.com/vuejs/vuepress/commit/d3025e559f3ab675f254c8f7038a188f4e99307d)

### jsについて考える

トランスパイラはBubleってやつらしい。なのでBabelにする。
https://qiita.com/gollowars/items/845baa30ceb7cc035919#babel%E3%82%92%E4%BD%BF%E3%81%86


特に問題なくできた。
async/awaitも使えました。

### 固定データの流し込みについて考える

業界の底辺にいるドカタ現場あるあるで外部サイト本番で使うURLがいつまでも来なかったり
納品前に頻繁に文言修正がはいったりが常です。なので文言とかURLとかjsonで管理して
マークアップに流し込むってことをよくやっています。VuePress環境でもそれがしたい！
今回は仮にja/enの多言語サイトってことにしているのでja.json/en.json/common.json
みたいなしくみが目標

.vuepress/config-files/以下に
data-common.js, data-en.js, data-ja.jsを作成
以下のようなファイル。

```data-en.js
module.exports = {
  title: "title title",
  text: "text text text text text text text",
  google: 'https://www.google.co.com/',
}
```

これをconfigのlocateでそれぞれ渡す。
一部省略していたりするがこんな感じで

```config.js
module.exports = {
  locales: {
    '/': {
      langData: require('./data-ja'),
      commonData: require('./data-common'),
    },
    '/en/': {
      langData: require('./data-en'),
    }
  }
}
```

すればとりあえずVueComponent(Layout.vue)とかで
`this.$localeConfig`configのlocaleに定義された変数が受け取れるので
`this.$localeConfig.langData.text`で使うことができる。 

ちなみに.の数が多くて大変すぎるので[タイトルいじる](#タイトルいじる)
で言及したようにenhanceApp.jsつかって受け渡す変数カスタムした。
詳細はgithubのコードをみてもらえると。


自分はこの方法で実現したが実はconfig.jsのthemeConfigにもlocaleがかけたり
マークダウンのfrontmatterでも変数渡せるのでそっちでもいいかもしれない。

### 画像パスどうするか考える

vueコンポーネントで画像を<img/>とかで配置したい時にどのページにいてもパスが合うようにしたい。
.vuepress/publicフォルダにいれた画像はビルド後のルート直下にコピーされる。 
結論から言うとthis.$site.baseでルートのパス拾えるのでそのpath+'img/hoge.png'とかすれば
いいと思う。

しかし前々からの習慣でなぜか相対パスで指定したほうが事故が少ないみたいな思想
(クライアントサーバーに納品したときに自分のディレクトリ内で完結させたい)があったので
相対パスでどうにか指定できないか頑張った記録が以下。
絶対パスでいいじゃんっていうのは実装終わったあとに気づいた。

#### 考えた方法① webpackエイリアス
https://github.com/vuejs/vuepress/blob/master/docs/guide/assets.md
ここに書いてあるようにwebpackでエイリアスを指定する。

```config.js
chainWebpack: config => {
  config.resolve.alias.set("@img", path.resolve(__dirname, './public/img/'))
}
```

こうすればVueComponent内で(src="~@img/hoge.png")みたいに使える。
この方法、画像がバイナリに変換されてhtmlに直接入るので
ステレオタイプなことをしないといけないとか納品したあとに先方の担当者がhtml触るみたいな事態に
なったときに若干不都合が生じるため別の方法考える。

#### 考えた方法② パイプライン拡張
さきほどからちょくちょくでてきているenhanceApp.jsつかって相対パスが出てくるような変数or関数を定義する。
VuePressには標準で$withBase()という関数が用意されていてこれはどうやらbaseからのパスを返してくれるらしい。
lib/app.jsに定義されている。
これみたいな感じで相対パスで返してくれるような関数をつくればいいんじゃないか？
ということでnode.jsのpathモジュールに搭載されているrelative関数を参考に作ってみた。
若干良くないコードな気がするが必要に応じて直せばいいやということで。。

```path-func.js
const trimPath = (p)=>{
  p = p.replace(/^\.\//, '');
  p = p.charAt(0) === '/' ? p.slice(1) : p;
  p = p.charAt(p.length-1) === '/' ? p.slice(0, p.length-1) : p;
  return p;
}

const isDirectory = (p)=>{
  p = p.split('/')
  const f = p[p.length-1];
  return (f.split('.').length === 1)
}

const relativeFilePath = function(path){
  path = trimPath(path);
  const toPath = trimPath(this.$site.base + path).split('/').filter(v => v !== "");
  const fromPath = trimPath(location.pathname).split('/').filter(v => v !== "");
  const length = Math.min(fromPath.length, toPath.length);
  
  let samePartsLength = length;
  for (let i = 0; i < length; i++) {
    if (fromPath[i] !== toPath[i]) {
      samePartsLength = i;
      break;
    }
  }
  let outPath = [];
  for (let i = samePartsLength; i < fromPath.length; i++) {
    outPath.push('..');
  }
  const suffix = toPath.slice(samePartsLength).filter(v => v !== "");
  outPath = outPath.concat(suffix);
  outPath = outPath.join('/');


  if(isDirectory(path) == true){
    outPath += '/'
  }
  return outPath;

}
export default relativeFilePath;
``` 

これをenhanceApp.jsでimportして、

```enhanceApp.js
import PathFunc from './enhance-files/path-func'
export default ({Vue, options, router, siteData}) => {
  Vue.prototype.$withRelative = PathFunc;
}
```

VuePress、ないものはつくればなんでもできる気がしてきた。

### リンクについて考える

リンクには<router-link>と<a>がありrouter-linkはその名の通りルーティングされ
SPAなサイトになる。aタグをそのまま使うと普通のリンクとして扱うことができる。
router-linkに相対パス指定しても絶対パスに変換される模様。  
aタグはそのまま。
なので諸般の事情であたかもルーティングのないwebサイトに見せたい場合は
全部aタグでかけば擬態できると思う。

```.js
nav
      router-link( class="nav-link" :to="$withRelative('/')") ja home /
      router-link( class="nav-link" :to="$withRelative('test/')") ja test /
      router-link( class="nav-link" :to="$withRelative('en/')") en home /
      router-link( class="nav-link" :to="$withRelative('en/test')") en test /
    nav
      a( class="nav-link" :href="$withRelative('/')") ja home /
      a( class="nav-link" :href="$withRelative('test/')") ja test /
      a( class="nav-link" :href="$withRelative('en/')") en home /
      a( class="nav-link" :href="$withRelative('en/test')") en test /
```

### 404の扱いについて考える

.vuepress/theme/NotFound.vue
にページが存在しない場合の404がある。デフォルトでは404ページになっているがトップにリダイレクトする仕様のほうが
自分がつくるサイトには合ってそうなのでそうすることにした。
ホントはmetaでリダイレクトさせようと思ったが調べるの面倒だったのでjsで簡易版な感じで。
gaのリファラーが〜とかそういう大人の事情がある場合はこれ参考にする。
https://qiita.com/sa-k0/items/2a58ddb04a2c78fac277

```NotFound.vue
<template lang="pug">
</template>

<script>

export default {
  mounted() {
    location.href=this.$site.base    
  }
}
</script>
```



