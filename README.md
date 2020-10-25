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

TODO
