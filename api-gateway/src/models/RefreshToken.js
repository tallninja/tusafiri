const mongoose = require('mongoose');
const uuid4 = require('uuid').v4;

const { auth } = require('../../config');

const RefreshTokenSchema = new mongoose.Schema({
	token: { type: String, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	expiresIn: { type: Date, required: true },
});

RefreshTokenSchema.statics.createToken = async function (userId) {
	try {
		const existingUserToken = await this.findOne({ user: userId }).exec();

		if (existingUserToken) {
			return existingUserToken.token;
		}

		let _expiresIn = new Date();
		_expiresIn.setSeconds(_expiresIn.getSeconds() + auth.jwtRefreshExpire);

		let _token = uuid4();

		let _object = new this({
			token: _token,
			user: userId,
			expiresIn: _expiresIn,
		});

		const refreshToken = await _object.save();

		return refreshToken.token;
	} catch (err) {
		throw err;
	}
};

RefreshTokenSchema.statics.verifyTokenExpiration = (token) => {
	return token.expiresIn.getTime() > new Date().getTime();
};

module.exports = mongoose.model('refresh-tokens', RefreshTokenSchema);
