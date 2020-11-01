/**
 * Get the post object from action input
 */
function parsePost(postInput) {
  let type = "json";
  let post = postInput;

  if (!post) {
    throw new Error("Missing post input");
  }

  // Convert json string to object
  if (typeof post === "string") {
    post = JSON.parse(post);
  }

  // Looks like a form encoded post
  if (!post.properties || post.h) {
    type = "form";
    if (!post.h) {
      post.h = "entry";
    }
  }

  // Make sure properties and type are an array
  if (post.properties && typeof post.properties === "object") {
    // Loop properties and make them arrays
    for (const key in post.properties) {
      if (post.properties.hasOwnProperty(key)) {
        const value = post.properties[key];
        if (!Array.isArray(value)) {
          post.properties[key] = [value];
        }
      }
    }

    // Either add type or make sure it is an array
    if (!post.type) {
      post.type = ["h-entry"];
    } else if (!Array.isArray(post.type)) {
      post.type = [post.type];
    }
  }

  return { post, type };
}

module.exports = parsePost;
