# my-weekly-contributions
Fetch weelky contributions on GitHub from GraphQL API.

The motivation for it is that I want to write my weekly report more easily and efficiently.

# Usage

Before running, make sure that GitHub API Token is set in `.env` file because this script uses GitHub GraphQL API.

Run by Deno, specifying a date from which contribution activities are collected throughout 7 days.

For example, if `20201018` is specified, the script will collect contributions made between `2020/10/18 00:00:00 (Oct. 18, 2020)` and `2020/10/25 00:00:00 (Oct. 25, 2020)`.

```sh
$ deno run --allow-read --allow-net main.ts 20201018
```


### Output example

```markdown
# [denoland/deno_lint](https://github.com/denoland/deno_lint)

- [feat(example): add all-rules subcommand](https://github.com/denoland/deno_lint/pull/444)
  - <ADD DESCRIPTION!>
- [refactor(for-direction): switch to `assert_lint_err!` macro](https://github.com/denoland/deno_lint/pull/437)
  - <ADD DESCRIPTION!>
- [refactor(ban-untagged-ignore): switch to `assert_lint_err!` macro](https://github.com/denoland/deno_lint/pull/436)
  - <ADD DESCRIPTION!>
- [refactor(ban-types): switch to `assert_lint_err!` macro](https://github.com/denoland/deno_lint/pull/435)
  - <ADD DESCRIPTION!>
- [refactor(constructor-super): switch to `assert_lint_err!` macro](https://github.com/denoland/deno_lint/pull/434)
  - <ADD DESCRIPTION!>
- [refactor: use `once_cell` instead of `lazy_static`](https://github.com/denoland/deno_lint/pull/433)
  - <ADD DESCRIPTION!>
- [test(no-constant-condition): add tests to make sure else-if is handled](https://github.com/denoland/deno_lint/pull/418)
  - <ADD DESCRIPTION!>
- [refactor(tests): use macro to have messages & hints be asserted](https://github.com/denoland/deno_lint/pull/410)
  - <ADD DESCRIPTION!>
- [fix typo](https://github.com/denoland/deno_lint/pull/407)
  - <ADD DESCRIPTION!>
- [fix(no-dupe-keys): handle nested objects & getter and setter with the same name](https://github.com/denoland/deno_lint/pull/406)
  - <ADD DESCRIPTION!>


# [denoland/deno](https://github.com/denoland/deno)

- [refactor(watch): create single watcher for whole process](https://github.com/denoland/deno/pull/8083)
  - <ADD DESCRIPTION!>
```
