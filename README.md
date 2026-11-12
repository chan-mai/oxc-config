# `@chan-mai/oxc-config`

oxlintとoxfmtの共通設定です。Vue/NuxtとReact/Next.js向けのrule設定はfeatureを明示的に指定した場合に限り追加されます。

## インストール

```bash
pnpm add -D @chan-mai/oxc-config oxlint oxlint-tsgolint oxfmt
```

`oxlint-tsgolint`はtype-aware lintに使用します。`features.typeAware`を`false`にする場合は不要です。

## oxlint

プロジェクトのルートに`oxlint.config.ts`を作成します。

```ts
import { defineOxlintConfig } from '@chan-mai/oxc-config';

export default defineOxlintConfig({
	features: {
		nuxt: true,
	},
	overrides: {
		ignorePatterns: ['.nuxt/**', '.output/**'],
	},
});
```

| feature     | 既定値  | 内容                                                                                                      |
| ----------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `js`        | `true`  | `js, jsx, mjs, cjs`にJavaScript用ruleを適用                                                               |
| `ts`        | `true`  | `ts, tsx, mts, cts`にJavaScript用とTypeScript用のruleを適用                                               |
| `typeAware` | `true`  | type-aware lintを有効化                                                                                   |
| `vue`       | `false` | `vue`pluginを有効化し、`.vue`にruleを適用                                                                 |
| `nuxt`      | `false` | `vue`を有効化し、Nuxtがdefault exportを読み込むディレクトリで`import/no-default-export`を無効化           |
| `react`     | `false` | `react`, `jsx-a11y`pluginとhooks関連のruleを有効化                                                        |
| `next`      | `false` | `react`と`nextjs`pluginを有効化し、App RouterとPages Routerのファイルで`import/no-default-export`を無効化 |

`overrides`に指定した値は、生成される設定のトップレベルへ追加されます。`overrides.overrides`に指定したファイル単位の設定は、本パッケージの設定より後に適用されます。

### Vueファイルの制約

- oxlintは`.vue`ファイルの`<script>`部分だけをlintします。templateはlintされません。
- `.vue`ファイルでは`no-unused-vars`を無効にしています。oxlintはtemplate内の変数参照を解析しないため、templateでだけ使う変数を未使用として報告するためです。未使用変数は`vue-tsc`の`noUnusedLocals`で検出してください。
- type-aware ruleは`.vue`ファイルに適用されません。oxlintがtsgolintへ送るファイルは、拡張子が`js, mjs, cjs, jsx, ts, mts, cts, tsx`のファイルに限定されます。

### type-aware lintの前提条件

tsgolintはTypeScript 7の型検査器を内蔵しているため、プロジェクトのTypeScriptのバージョンは問いません。ただし、tsconfigでTypeScript 7で削除されたオプション(`baseUrl`, `moduleResolution: "node"`等)を使っている場合は、tsconfigを修正するか`features.typeAware`を`false`にしてください。

## oxfmt

プロジェクトのルートに`oxfmt.config.ts`を作成します。

```ts
import { defineOxfmtConfig } from '@chan-mai/oxc-config';

export default defineOxfmtConfig({
	overrides: {
		ignorePatterns: ['.nuxt/**', '.output/**'],
	},
});
```

既定の設定は次のとおりです。`overrides`に指定した値で上書きできます。

- タブインデント, シングルクォート, セミコロンあり, 1行140文字
- アロー関数の引数が1つの場合は括弧を省略する(`x => x`)
- import文を builtin, external, internal, parent, sibling, index, style の順に並べ、型インポートを空行の後にまとめる
- `~/`, `~~/`, `@/`, `@@/`, `#`で始まるimportをinternalとして扱う
- `package.json`のフィールドを並べ替える(oxfmtの既定動作)
