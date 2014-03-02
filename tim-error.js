function c() {
	b();
};

function b() {
	a();
};

function a() {
	setTimeout (function () {
		throw new Error('Here is a()');
	}, 10);
};

c();