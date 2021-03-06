'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	_ = require('lodash'),
	softremove = require('mongoose-soft-remove');

/**
 * Validations
 */
var validatePresenceOf = function(value) {
	// If you are authenticating by any of the oauth strategies, don't validate.
	return (this.provider && this.provider !== 'local') || (value && value.length);
};

var validateUniqueEmail = function(value, callback) {
	var User = mongoose.model('User');
	User.find({
		$and: [{
			email: value
		}, {
			_id: {
				$ne: this._id
			}
		}, {
			isRemoved: true
		}]
	}, function(err, user) {
		callback(err || user.length === 0);
	});
};
var validateUniqueName = function(value, callback) {
	var User = mongoose.model('User');
	User.find({
		$and: [{
			first_name: {
				$regex: new RegExp(value, "i")
			}
		}, {
			_id: {
				$ne: this._id
			}
		}, {
			isRemoved: true
		}]
	}, function(err, user) {
		callback(err || user.length === 0);
	});
};

/**
 * Getter
 */
var escapeProperty = function(value) {
	return _.escape(value);
};

/**
 * User Schema
 */

var UserSchema = new Schema({
	first_name: {
		type: String,
		get: escapeProperty
	},
	last_name: {
		type: String,
		get: escapeProperty
	},
	phone: {
		type: Number
	},
	address1: {
		type: String,
		default: ""
	},
	address2: {
		type: String,
		default: ""
	},
	city: {
		type: String,
		default: ""
	},
	locality: {
		type: String,
		default: ""
	},
	state: {
		type: String,
		default: ""
	},
	country: {
		type: String,
		default: "India"
	},
	pinCode: {
		type: Number,
		default: ""
	},
	active: {
		type: Number,
		min: 0,
		max: 1,
		required: true,
		default: 0
	},
	created: {
		type: Date,
		default: Date.now
	},
	modified: {
		type: Date,
		default: Date.now
	},
	Spaces: [{ // Only for a partner admin
		type: Schema.ObjectId,
		ref: 'Space'
	}],
	avatar: {
		type: String
	},
	email: {
		type: String,
		required: true,
		unique: true,
		// Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
		match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
		validate: [validateUniqueEmail, 'E-mail address is already in-use']
	},
	roles: {
		type: Array,
		default: ['authenticated', 'anonymous']
	},
	role: {
		type: [{
			type: Schema.ObjectId,
			ref: 'Role'
		}]
	},
	hashed_password: {
		type: String,
		validate: [validatePresenceOf, 'Password cannot be blank']
	},
	provider: {
		type: String,
		default: 'local'
	},
	profileUpdated: {
		type: Boolean,
		default: false
	},
	isPasswordUpdate: {
		type: Boolean,
		default: false
	},
	resetPassword: {
		type: Boolean,
		default: true
	},
	isUserConfirmed: {
		type: Boolean,
		default: false
	},
	salt: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	profile: {},
	facebook: {},
	twitter: {},
	github: {},
	google: {},
	linkedin: {},
	socialAccounts: [],
	commissionPercentage: [{
		name: String,
		commission: Number,
	}],
	isGuest: {
		type: Boolean,
		default: false,
	},
	confirmationToken: String,
	confirmationExpires: Date,
	confirmedAt: Date,
	contactName :String,
	contactPhoneNo :Number
});

/**
 * Enabling soft delete
 */
UserSchema.plugin(softremove);

UserSchema.statics.load = function(id, callback) {
	this.findOne({
		_id: id
	}).populate("role").exec(callback);
};

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
	this._password = password;
	this.salt = this.makeSalt();
	this.hashed_password = this.hashPassword(password);
}).get(function() {
	return this._password;
});
UserSchema.statics.loadUserByToken = function(token, callback) {
		this.findOne({
			confirmationToken: token
		}).exec(callback);
	}
	/**
	 * Pre-save hook
	 */
UserSchema.pre('save', function(next) {
	if (this.isNew && this.provider === 'local' && this.password && !this.password.length)
		return next(new Error('Username/Password does not match correctly. Please try again'));
	next();
});

/**
 * Methods
 */

/**
 * HasRole - check if the user has required role
 *
 * @param {String} plainText
 * @return {Boolean}
 * @api public
 */
UserSchema.methods.hasRole = function(role) {
	var roles = this.roles;
	return roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1;
};

/**
 * IsAdmin - check if the user is an administrator
 *
 * @return {Boolean}
 * @api public
 */
UserSchema.methods.isAdmin = function() {
	return this.roles.indexOf('admin') !== -1;
};

/**
 * Authenticate - check if the passwords are the same
 *
 * @param {String} plainText
 * @return {Boolean}
 * @api public
 */
UserSchema.methods.authenticate = function(plainText) {
	return this.hashPassword(plainText) === this.hashed_password;
};

/**
 * Make salt
 *
 * @return {String}
 * @api public
 */
UserSchema.methods.makeSalt = function() {
	return crypto.randomBytes(16).toString('base64');
};

/**
 * Hash password
 *
 * @param {String} password
 * @return {String}
 * @api public
 */
UserSchema.methods.hashPassword = function(password) {
	if (!password || !this.salt) return '';
	var salt = new Buffer(this.salt, 'base64');
	return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
};

/**
 * Hide security sensitive fields
 *
 * @returns {*|Array|Binary|Object}
 */
UserSchema.methods.toJSON = function() {
	var obj = this.toObject();
	delete obj.hashed_password;
	delete obj.salt;
	return obj;
};

mongoose.model('User', UserSchema);