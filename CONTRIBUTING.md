<!-- Adapted from https://github.com/rome/tools/blob/main/CONTRIBUTING.md -->

# Contributing

We can use help in a bunch of areas and any help is appreciated. Our [GitHub issues](https://github.com/jundaoapp/design/issues) serve as a place for any discussion, whether it's bug reports, questions, project direction etc. As the project grows this policy may change.

Our [Discord server](https://discord.gg/uUw8Hj4AzE) is open for help and more adhoc discussion. All activity on the Discord is still moderated and will be strictly enforced under the project's [Code of Conduct](./CODE_OF_CONDUCT.md).

## Getting Started

Building this project requires Node.js [`v19.1.0`](./.nvmrc), which can be installed using [nvm](https://github.com/nvm-sh/nvm) (recommended) or [Node.js](https://nodejs.org/).
We use pnpm `7.17.0` as a package manager, which can be installed following [pnpm Installation](https://pnpm.io/installation).

Clone the repository and navigate to the `design` directory:
```bash
git clone https://github.com/jundaoapp/design
cd design
```
Install all packages and dependencies:
```bash
pnpm install
```
Running Storybook:
```bash
pnpm storybook
```

## Components
All Jundao Design components should accept their underlying component's props by extending its [intrinsic element attributes](https://github.com/solidjs/solid/blob/04fdd3088c978bfe6e6cb98e61473ce9543327de/packages/solid/src/render/component.ts#L78).
They should also combine provided props with their own (see [here](https://github.com/solidjs-community/solid-primitives/tree/main/packages/props#combineprops)). 

The visual design is based off a mix of the [Atlassian Design System](https://atlassian.design/) and [Ant Design](https://ant.design/) and Android UI.

Component style should be made in SCSS and all components should be made accessible using [Kobalte](https://kobalte.dev) (when available, else see below).

Each component should also follow the [Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)](https://www.w3.org/WAI/standards-guidelines/aria/). A storybook tab is accessible in the component addons panel.

## User files

If files specific to your local development environment should be ignored, please add these files to a global git ignore file rather than to a git ignore file within Jundao Design.

You can find more information on this process [here](https://help.github.com/en/github/using-git/ignoring-files#configuring-ignored-files-for-all-repositories-on-your-computer).

## Checks

- `pnpm format` is script that runs [Rome](https://rome.tools/) under the hood;
- `pnpm check` also runs Rome.
- `pnpm check-typescript` is script that runs the [Typescript](https://www.typescriptlang.org/) compiler;

> **Tip:** use `pnpm ca` to run all of them.

## Commit messages

Internally, the Jundao Design adheres as closely as possible to the [conventional commit specification](https://www.conventionalcommits.org/en/v1.0.0-beta.4/).
The following this convention encourages commit best-practices and facilitates commit-powered features like change log generation.

The following commit prefixes are supported:

- `feat:`, a new feature
- `fix:`, a bugfix
- `docs:`, a documentation update
- `test:`, a test update
- `chore:`, project housekeeping
- `perf:`, project performance
- `refactor:`, refactor of the code without change in functionality
- `style:`, changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `ci:`, changes to CI configuration files and scripts

To skip automatic releases include `[skip release]` in the commit message.

Below are examples of well-formatted commits:

```
feat(button): handle click event
fix: fix font size on Safari
docs: fix link to website page
test(input): add more cases to handle keyboard events
```

Feature `feat:` prefixes should not be scoped for new components.

## Creating pull requests

When creating a new pull request, it's preferable to use a conventional commit-formatted title, as this title will be used as the default commit message on the squashed commit after merging.

### Versioning

We follow the [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

New releases are automatically managed by [semantic-release](https://semantic-release.gitbook.io/semantic-release/).