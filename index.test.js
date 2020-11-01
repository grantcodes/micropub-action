const process = require("process");
const cp = require("child_process");
const path = require("path");
const parsePost = require("./parse-post");

test("string to post", () => {
  const postInput = {
    type: ["h-entry"],
    properties: { content: ["note content"] },
  };
  const { post, type } = parsePost(JSON.stringify(postInput));
  expect(type).toEqual("json");
  expect(post).toEqual(postInput);
});

test("form encoded missing type", () => {
  const { post, type } = parsePost({ content: "note content" });
  expect(type).toEqual("form");
  expect(post).toEqual({ h: "entry", content: "note content" });
});

test("make properties arrays", () => {
  const { post, type } = parsePost({
    properties: { content: "note content", category: ["foo", "bar"] },
  });
  expect(type).toEqual("json");
  expect(post).toEqual({
    type: ["h-entry"],
    properties: {
      content: ["note content"],
      category: ["foo", "bar"],
    },
  });
});

test("test runs", () => {
  process.env["INPUT_POST"] = `{ "content": "test node" }`;
  process.env["INPUT_ENDPOINT"] = "https://grant.codes/micropub";
  process.env["INPUT_TOKEN"] = "fake token";

  const ip = path.join(__dirname, "index.js");
  expect(() => cp.execSync(`node ${ip}`, { env: process.env })).toThrow();
});
