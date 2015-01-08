({
	appDir: "./",
	baseUrl: "library/js",
	mainConfigFile: "library/js/ebooklibrary.js",
	modules: [
		{
			name: "ebooklibrary"
		}
	],
	dir: "build",
	keepBuildDir: false,
	optimizeCss: "standard",
	removeCombined: true,
	fileExclusionRegExp: /^README.md$|^.git$|^.+\.less$|^.+\.build\.js$|xcf|originals/
})
