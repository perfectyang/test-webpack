const babel = require("@babel/core")

function transformCode (code) {
  const res = babel.transform(code, {
    "presets": [
      [
          "@babel/preset-env",
          {
              "modules": 'commonjs',
              "targets": {
                  "browsers": [
                      "> 1%",
                      "iOS >= 7",
                      "Android >= 4.0",
                      "not ie <= 8",
                      "Firefox > 20"
                  ]
              },
              "useBuiltIns": "usage",
              "corejs": 2
          }
      ]
    ]
  })
  // console.log(res.code)
  return res.code
}
module.exports = transformCode
