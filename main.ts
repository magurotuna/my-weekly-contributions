import { config as dotenvConfig } from "https://deno.land/x/dotenv/mod.ts";
import {
  startOfToday,
  addDays,
  formatISO,
} from "https://deno.land/x/date_fns/index.js";

type Config = {
  token: string;
};

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
query {
  viewer {
    contributionsCollection(from: "${start}", to: "${end}") {
      pullRequestContributionsByRepository {
        repository {
          name,
          isPrivate
        },
        contributions(first: 255) {
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
}`;
}

async function main() {
  const config = load_config();
  const query = buildQuery(startOfToday());
  console.log(query);
}

await main();
