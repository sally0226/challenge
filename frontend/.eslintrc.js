module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": [
		"plugin:react/recommended",
		"airbnb"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"eslint-plugin-import",
		"eslint-plugin-jsx-a11y",
		"eslint-plugin-react",
		"eslint-plugin-react-hooks"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		], // indent는 tab으로 통일
		"import/extensions": 0, // 확장자 없이 기재 가능하게
		"react/jsx-indent": [
			2,
			"tab"
		], // jsx에서도 indent tab으로 통일
		"react/jsx-filename-extension": [
			1,
			{
				"extensions": [
					".js",
					".jsx",
				]
			}
		], // 확장자 설정
		"linebreak-style": [
			"error",
			"unix"
		], // LF
		"no-unused-vars": "warn", // 정의 후 사용하지 않은 변수는 경고만 하기
		"no-use-before-define": 1, // 정의 전에 사용 금지
		"no-console": 0, // console 사용하기
		"no-nested-ternary": 0, // 삼항 연산자좀 쓰자
		"camelcase": [
			"error",
			{
				"properties": "always"
			}
		], // 속성에 camelcase 사용
		"no-tabs": 0, // tab 사용 안되는 rule
		"operator-linebreak": 0, // 연산자는 라인 앞쪽에 위치해야하는 rule
		"no-param-reassign": 0, // 파라미터는 지역변수로 받아서 쓰라는 rule
		"import/prefer-default-export": [
			"off"
		], // export const 문을 쓸때 에러를 내는 rule 해제
		"react/jsx-wrap-multilines": 0, // jsx에서 여러 줄에 걸쳐서 정의할 때 복잡한 rule 해제
		"no-restricted-syntax": [
			"warn",
			"FunctionExpression",
			"WithStatement",
			"BinaryExpression"
		], // for in 사용
		"react/jsx-props-no-spreading": [
			"warn"
		], // props로 받은 것 바로 props로 넘기기 허용
		"max-len": [
			"warn"
		], // 길이 100이 넘어가도 warning 만 하기
		"react/jsx-boolean-value": 0, // boolean 못넘기게 하는 룰 없애기
		"react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
		"comma-dangle": 0, // 마지막에 콤마 안붙여도 되게 하기
		"object-curly-newline": 0, // {}에서 새로운 line에 매개변수 쓰지 않아도 되게
		"quotes": 0, // string에 doublequotes 가능
		"react/jsx-indent-props": [
			2,
			"tab"
		], // jsx props tab으로 들여쓰기
		"no-underscore-dangle": 0, // _ 쓰기
		"no-shadow" : ["warn"], // 변수 가리기 경고만 하기
		"jsx-a11y/click-events-have-key-events" : 0 // onClick쓰려면 다른 event handler도 등록해야하는 옵션 끄기
	},
	"settings": {
		"import/resolver": {
			"node": {
				"extensions": [
					".js",
					".jsx",
					".ts",
					".tsx"
				]
			}
		}
	}
};
