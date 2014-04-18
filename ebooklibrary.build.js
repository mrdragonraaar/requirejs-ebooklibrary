({
	appDir: "./",
	baseUrl: "js",
	mainConfigFile: "js/ebooklibrary.js",
	modules: [
		{
			name: "ebooklibrary"
		}
	],
	dir: "build",
	keepBuildDir: false,
	optimizeCss: "standard",
	removeCombined: true,
	fileExclusionRegExp: /^.git$|^.+\.build\.js$|xcf|originals/
})
