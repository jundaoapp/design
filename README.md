<div align="center">
  <a href="https://design.jundao.app/#gh-dark-mode-only" target="_blank"><img width="400" src="https://github.com/jundaoapp/design/blob/main/.storybook/banner-light.svg?raw=true" alt="Jundao Design banner"></a>
  <a href="https://design.jundao.app/#gh-light-mode-only" target="_blank"><img width="400" src="https://github.com/jundaoapp/design/blob/main/.storybook/banner-dark.svg?raw=true" alt="Jundao Design banner"></a>
</div>

<h1 align="center">Jundao Design</h1>

<div align="center">

A simple, fast and modern [SolidJS](https://www.solidjs.com) UI library.

[![license](https://img.shields.io/badge/license-MIT-1890ff.svg)](https://github.com/jundaoapp/design/blob/main/LICENSE)
[![checks](https://img.shields.io/github/checks-status/jundaoapp/design/main)](https://github.com/jundaoapp/design/actions)
[![npm](https://img.shields.io/npm/v/@jundao/design)](https://www.npmjs.com/package/@jundao/design)

</div>

> **Warning** 
> Jundao Design is in early stage and **not ready** for production.<br/>
> Unstable API, see [Versioning](#versioning)

# Features
* Fast - Built on [SolidJS](https://www.solidjs.com).
* Type Safe - Entirely coded in [Typescript](https://www.typescriptlang.org/).
* Modern - Uses the latest available ES & CSS features.
* Accessible - [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) compliant.
* Mobile Friendly - All components tested for desktop & touch.
* Fun - Amazing and friendly DX.
* Consistant - Style and behaviour tested across all modern browsers.
* Responsive - Designed for all screen sizes.
* Fresh UI - Light & Dark mode with professional looking design.

# Usage
Install `@jundao/design` and peer dependency fonts:
```bash
npm install @jundao/design@alpha @fontsource-variable/inter @fontsource-variable/jetbrains-mono
# or
yarn add @jundao/design@alpha @fontsource-variable/inter @fontsource-variable/jetbrains-mono
# or
pnpm add @jundao/design@alpha @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

Import in entrypoint:
```ts
import "@jundao/design/index.css";

// Fonts
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
```

Import components:
```ts
import { Button } from "@jundao/design";

<Button>Click Me</Button>
```
:sparkles: All done!

# Components
Currently implemented & planned components:
- [ ] Accordion
- [x] Alert
- [x] Avatar
- [x] Badge
- [x] Breadcrumb
- [x] Button
- [x] Card
- [ ] Chart
- [x] Checkbox
- [ ] CodeBlock
- [x] ContextMenu
- [ ] DataGrid
- [ ] DatePicker
- [x] Divider
- [x] Drawer
- [ ] Dropdown
- [x] DropdownMenu
- [ ] Editor
- [ ] Form
- [ ] Grid
- [ ] HoverCard
- [x] Image
- [x] Input
- [x] Label
- [ ] Layout
- [x] Link
- [ ] Markdown
- [ ] Message
- [x] Modal
- [ ] Navigation
- [ ] Notification
- [ ] PaceLoader
- [ ] Pagination
- [x] Popconfirm
- [x] Progress
- [ ] QRCode
- [x] Radio
- [x] Select
- [ ] Skeleton
- [x] Slider
- [x] Space
- [x] Spinner
- [ ] Steps
- [x] Switch
- [ ] Table
- [ ] Tabs
- [x] Tag
- [x] Text
- [ ] Timeline
- [ ] TimePicker
- [x] Title
- [ ] Tooltip
- [ ] Upload

# Versioning
Versions `1.x.x` should all be considered unstabled and all minor updates may include BREAKING CHANGES even without explicit mention.
This direct [contradiction to the Semantic Versioning](https://semver.org/spec/v2.0.0.html#spec-item-4) is due to a [bad implementation and limitation in semantic-release](https://github.com/semantic-release/semantic-release/issues/1507#issuecomment-605079708).

Versions `2.x.x` and onwards will be considered stable and adhere to the [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

# Contributing
Before contributing please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

All contributions are moderated under the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md).