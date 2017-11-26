module.exports = function(grunt) {

	grunt.initConfig({
		execute: {
			options: {
			},
			ts: {
				src: ["node_modules/typescript/lib/tsc.js"]
			},
			scss: {
				options: {
					args: ["scss-compile.ts"]
				},
				src: ["node_modules/ts-node/dist/bin.js"]
			}
		},
		watch: {
			options: {
				spawn: false,
				event: ["changed"]
			},
			vars: {
				files: "src/js/vars.ts",
				tasks: ["execute:ts", "execute:scss"],
				options: {
					atBegin: true
				}
			},
			ts: {
				files: ["src/js/*.ts", "!src/js/vars.ts"],
				tasks: ["execute:ts"]
			},
			scss: {
				files: "src/css/*.scss",
				tasks: ["execute:scss"]
			}
		}
	});

	grunt.loadNpmTasks("grunt-execute");
	grunt.loadNpmTasks("grunt-webpack");
	grunt.loadNpmTasks("grunt-contrib-watch");
};