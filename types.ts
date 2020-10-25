export type Response = {
  data: {
    viewer: {
      contributionsCollection: {
        pullRequestContributionsByRepository: Array<{
          repository: {
            name: string;
            isPrivate: boolean;
            url: string;
          };
          contributions: {
            totalCount: number;
            nodes: Array<{
              pullRequest: {
                title: string;
                permalink: string;
              };
            }>;
          };
        }>;
      };
    };
  };
};

export type Config = {
  token: string;
};
