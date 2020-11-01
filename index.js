const core = require("@actions/core");
const Micropub = require("micropub-helper");
const parsePost = require("./parse-post");

async function run() {
  try {
    const token = core.getInput("token");
    const postInput = core.getInput("post");
    const endpoint = core.getInput("endpoint");
    const micropub = new Micropub({
      token,
      clientId: "https://github.com/grantcodes/micropub-action",
      micropubEndpoint: endpoint,
    });
    const { post, type } = parsePost(postInput);

    console.log(`Creating ${type} encoded micropub post on ${endpoint}`);
    console.log(post);

    const url = await micropub.create(post, type);

    console.log(`Successfully posted to ${url}`);
    core.setOutput("url", url);
  } catch (err) {
    console.error("Error creating micropub post");
    console.error(err);
    core.setFailed(err && err.message ? err.message : err);
  }
}

run();
