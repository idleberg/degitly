# degitly

> `degit` clone build upon `gitly`, downloads Git repositories without cloning them.

[![License](https://img.shields.io/github/license/idleberg/degitly?color=blue&style=for-the-badge)](https://github.com/idleberg/degitly/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/degitly?style=for-the-badge)](https://www.npmjs.org/package/degitly)
![GitHub branch check runs](https://img.shields.io/github/check-runs/idleberg/degitly/main?style=for-the-badge)

## Installation 💿

```shell
npm install degitly
```

## Usage 🚀

**Examples**

```shell
npx degitly sveltejs/template

# these commands are equivalent
npx degitly github:sveltejs/template
npx degitly git@github.com:sveltejs/template
npx degitly https://github.com/sveltejs/template

# specific branch or tag
npx degitly https://github.com/sveltejs/template#master
npx degitly https://github.com/sveltejs/template#v1.0.0

# optional output directory
npx degitly sveltejs/template svelte-app
```

See `degitly --help` for all available options.

## Related 👫

If this project is not for you, maybe these alternatives suit you better:

- [degit](https://www.npmjs.com/package/degit)

## License ©️

This work is licensed under [The MIT License](LICENSE).
