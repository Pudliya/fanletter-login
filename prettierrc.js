//prettierrc.js
// 설정을 작성하고 그 설정을 외부(prettier프로그램) 에서 불러다 쓸수 있도록 export한다.

/** @type {import("prettier").Config} */
const config = {
  tabWidth: 2, // 들여쓰기 넓이를 조절
  semi: false,
  singleQuote: true,
};

module.exports = config;
