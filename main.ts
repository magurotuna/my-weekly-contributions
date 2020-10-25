import { config as dotenvConfig } from "https://deno.land/x/dotenv/mod.ts";
import {
  startOfToday,
  addDays,
  subDays,
  formatISO,
  parse,
} from "https://deno.land/x/date_fns/index.js";
import type { Response, Config } from "./types.ts";

function readDate(): Date {
  return Deno.args.length > 0
    ? parse(Deno.args[0], "yyyyMMdd", startOfToday())
    : subDays(startOfToday(), 7);
}

function load_config(): Config {
  const env = dotenvConfig();
  if ("TOKEN" in env) {
    return {
      token: env.TOKEN,
    };
  }
  throw new Error("TOKEN is not set");
}

function buildQuery(startDate: Date, checkDays: number = 7): string {
  const start = formatISO(startDate);
  const end = formatISO(addDays(startDate, checkDays));
  return `
{
  "query": "query {
    viewer {
      contributionsCollection(from: \\"${start}\\", to: \\"${end}\\") {
        pullRequestContributionsByRepository {
          repository {
            name,
            isPrivate,
            url
          },
          contributions(first: 100) {
            totalCount,
            nodes {
              pullRequest {
                title,
                permalink
              }
            }
          }
        }
      }
    }
  }"
}
  `.replace(/\n/g, " ");
}

async function fetchGitHub(query: string, config: Config): Promise<Response> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      authorization: `bearer ${config.token}`,
    },
    body: query,
  }).then((res) => res.json());
  return response as Response;
}

function print(resp: Response) {
  const contributions = resp.data.viewer.contributionsCollection.pullRequestContributionsByRepository.filter(
    (c) => !c.repository.isPrivate && c.repository.name !== "maguro.dev"
  );
  contributions.sort(
    (a, b) => b.contributions.totalCount - a.contributions.totalCount
  );

  for (const con of contributions) {
    console.log(`# [${con.repository.name}](${con.repository.url})\n`);

    for (const { pullRequest } of con.contributions.nodes) {
      console.log(`- [${pullRequest.title}](${pullRequest.permalink})`);
      console.log("  - <ADD DESCRIPTION!>");
    }
    console.log("\n");
  }
}

async function main() {
  const startDate = readDate();
  const config = load_config();
  const query = buildQuery(startDate);
  const resp = await fetchGitHub(query, config);
  print(resp);
}

await main();
