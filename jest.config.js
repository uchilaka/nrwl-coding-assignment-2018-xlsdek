module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  testRegex: ["((\\|/).*)*(\\|/)?.*(spec|test).(jsx|tsx?)$"],
  // transform: {
  //   "^.+\\.(ts|html)$": "ts-jest"
  // },
  resolver: "@nrwl/builders/plugins/jest/resolver",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
}