module.exports = {
	apps: [
		{
			name: "http://localhost:",
			script: "npm",
			args: "start",
			env: {
				NODE_ENV: "production",
				PORT: 8080,
			},
		},
	],
};
