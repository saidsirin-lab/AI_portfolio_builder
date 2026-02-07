import { Octokit } from "@octokit/rest";

interface PublishParams {
  token: string;
  username: string;
  html: string;
  repoName?: string;
}

export async function publishToGitHub(params: PublishParams) {
  const { token, username, html, repoName = "portfolio" } = params;
  const octokit = new Octokit({ auth: token });

  // Create or get repo
  let repoExists = false;
  try {
    await octokit.repos.get({ owner: username, repo: repoName });
    repoExists = true;
  } catch {
    // Repo doesn't exist
  }

  if (!repoExists) {
    await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: "My portfolio website — built with Portfolio Builder",
      homepage: `https://${username}.github.io/${repoName}`,
      auto_init: true,
    });
    // Wait briefly for repo initialization
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  // Push index.html via Contents API
  let existingSha: string | undefined;
  try {
    const { data } = await octokit.repos.getContent({
      owner: username,
      repo: repoName,
      path: "index.html",
    });
    if (!Array.isArray(data) && data.type === "file") {
      existingSha = data.sha;
    }
  } catch {
    // File doesn't exist yet
  }

  await octokit.repos.createOrUpdateFileContents({
    owner: username,
    repo: repoName,
    path: "index.html",
    message: existingSha
      ? "Update portfolio"
      : "Add portfolio website",
    content: Buffer.from(html).toString("base64"),
    ...(existingSha && { sha: existingSha }),
  });

  // Enable GitHub Pages
  try {
    await octokit.repos.createPagesSite({
      owner: username,
      repo: repoName,
      source: { branch: "main", path: "/" },
    });
  } catch {
    // Pages might already be enabled — try updating
    try {
      await octokit.repos.updateInformationAboutPagesSite({
        owner: username,
        repo: repoName,
        source: { branch: "main", path: "/" },
      });
    } catch {
      // Pages already configured correctly
    }
  }

  return {
    pagesUrl: `https://${username}.github.io/${repoName}`,
    repoUrl: `https://github.com/${username}/${repoName}`,
  };
}
