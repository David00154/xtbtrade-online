module.exports = {
	content: ["./views/**/*.ejs"],
	theme: {
		extend: {
			fontFamily: {
				"tf-medium": ["TTFirsNeue-Medium"],
				"tf-bold": ["TTFirsNeue-Bold"],
				"tf-demi-bold": ["TTFirsNeue-DemiBold"],
				"tf-regular": ["TTFirsNeue-Regular"],
			},
			colors: {
				"custom-blue": "#0052ff",
				"custom-green": "#098551",
				"custom-black": "#0A0B0D",
				"color-primary": "#7380ec",
				"color-danger": "#ff7782",
				"color-success": "#42f1b6",
				"color-warning": "#ffbb55",
				"color-white": "#fff",
				"color-info-dark": "#7d8da1",
				"color-info-light": "#dce1eb",
				"color-dark": "#363949",
				"color-light": "rgba(132, 139, 200, 0.18)",
				"color-primary-variant": "#111e88",
				"color-dark-variant": "#677483",
				"color-background": "#f6f6f9",

				"card-border-radius": "2rem",
				"border-radius-1": "0.4rem",
				"border-radius-2": "0.8rem",
				"border-radius-3": "1.2rem",

				"card-padding": "1.8rem",
				"padding-1": "1.2rem",

				"box-shadow":
					"0 2rem 3rem rgba(132, 139, 200, 0.18)",
			},
		},
	},
	plugins: [],
};
