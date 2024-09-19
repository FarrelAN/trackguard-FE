module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src", // Assuming your main code is inside a 'src' folder
          },
        },
      ],
    ],
  };
};
