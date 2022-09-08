module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.vue$": "@vue/vue3-jest"
      }
}