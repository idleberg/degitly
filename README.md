# degitly

> `degit` clone build upon `gitly`, downloads Git repositories without cloning them.

[![License](https://img.shields.io/github/license/idleberg/gitly-cli?color=blue&style=for-the-badge)](https://github.com/idleberg/gitly-cli/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/gitly-cli?style=for-the-badge)](https://www.npmjs.org/package/gitly-cli)
![GitHub branch check runs](https://img.shields.io/github/check-runs/idleberg/gitly-cli/main?style=for-the-badge)

## Installation 💿

```shell
npm install degitly
```

## Usage 🚀

**Examples**

```shell
dg sveltejs/template

# these commands are equivalent
dg github:sveltejs/template
dg git@github.com:sveltejs/template
dg https://github.com/sveltejs/template

# specific branch or tag
dg https://github.com/sveltejs/template#master
dg https://github.com/sveltejs/template#v1.0.0

# optional output directory
dg sveltejs/template svelte-app
```

See `dg --help` for all available options.

## Related 👫

If this project is not for you, maybe these alternatives suit you better:

- [degit](https://www.npmjs.com/package/degit)

## License ©️

This work is licensed under [The MIT License](LICENSE).
