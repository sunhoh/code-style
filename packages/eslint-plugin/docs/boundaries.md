# `@adcream/boundaries`

> 💡 플러그인은 eslint-plugin-boundaries를 기반으로 동작합니다.
> [eslint-plugin-boundaries ](https://github.com/javierbrea/eslint-plugin-boundaries)

## Main rules overview

### Allowed element types

> FSD 아키텍처에 기반해서 설정한 룰
> [feature-sliced.design docs](https://feature-sliced.design/docs/get-started/overview)

app > pages > widgets > features > entities > shared 순으로 importing 제한

```
├── 📂 app/
|    ├── 📂 routes
|    ├── 📁 analytics
├── 📂 pages/
|    ├── 📂 home
|    ├── 📂 article-reader
|    ├────── 📁 ui
|    ├────── 📁 api
├── 📂 widgets/
├── 📂 features/
|    ├── 📁 assets
|    ├── 📁 helpers
├── 📂 entities/
|    ├── 📁 api
├── 📂 shared/
|    ├── 📁 ui
```
