module.exports = function(size) {
	var cache = {};

	var _exists = function(key) {
		return cache[key] !== undefined;
	};

	return {
		get: function(key) {
			return cache[key];
		},
		add: function(key, value) {

			if (_exists(key)) {
				delete cache[key];
				cache[key] = value;
			}

			var keys = Object.keys(cache);
			if (keys.length < size) {
				cache[key] = value;
			} else {
				delete cache[keys[size - 1]];
				cache[key] = value;
			}
		}
	};
};
