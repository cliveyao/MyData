'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var deepPopulate = require('mongoose-deep-populate')(mongoose);
/**
 * ConfigType Schema.
 */
var FeatureroleSchema = new Schema({
    isRead: {
    	type: Boolean,
        trim: true,
        default: false
    },
    isWrite: {
    	 type: Boolean,
    	 trim: true,
    	default: false
    },
    isUpdate: {
        type: Boolean,
        trim: true,
        default: false
    },
    isDelete: {
    	type: Boolean,
        trim: true,
    	default: false
    },
    feature: {
        type: Schema.ObjectId, ref: 'Feature',
        required:true
    },
    role: {
        type: Schema.ObjectId, ref: 'Role',
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

FeatureroleSchema.plugin(deepPopulate, {
    whitelist: [
        'feature',
        'feature.featureCategory'
    ]
});

FeatureroleSchema.statics.load = function (id, callback) {
    this.findOne({
        _id: id
    }).populate('feature').deepPopulate('feature.featureCategory').populate('role', 'name').exec(callback);
};

FeatureroleSchema.statics.loadfeatureRoleByRole = function (id, callback) {
    this.find(
    		{
        role: id
    	}
    		).populate('feature', 'name url icon color isComponent width').sort({ name: 'asc' }).populate('role', 'name').exec(callback);
};

FeatureroleSchema.statics.loadfeatureRoleByRoles = function (ids, callback) {
     this.find({
        role: { 
            $in : ids 
        } 
    }).populate('feature', 'name url icon color isComponent width').sort({ name: 'asc' }).deepPopulate('feature.featureCategory').populate('role', 'name').exec(callback);
};

FeatureroleSchema.statics.loadfeatureRole = function (featurerole, callback) {
    this.findOne({
        $and: [{
            role: featurerole.role
        },
        {
            feature: featurerole.feature
        }, 
        {
            iswrite: featurerole.iswrite
        },
        {
            isread: featurerole.isread
        },
        {
            isdelete: featurerole.isdelete
        },
        {
            isComponent: featurerole.isComponent
        },
        {
            width: featurerole.width
        },
        {
          _id: {
            $ne: this._id
          }
        }]
    })
};

mongoose.model('Featurerole', FeatureroleSchema);