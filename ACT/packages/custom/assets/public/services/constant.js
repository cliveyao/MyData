
angular.module('mean.assets').constant('ASSETS', {
    PATH: {
        GUARDLIST: '/site/:buildingId/guards',
        GUARDCREATE: '/site/:buildingId/guard/add',
        GUARDEDIT:  '/site/:buildingId/guard/:guardId/edit',
        CAMERA_LIST: '/site/:buildingId/camera',
        CAMERA_ADD: '/site/:buildingId/camera/create',
        CAMERA_EDIT: '/site/:buildingId/camera/:cameraId/edit',
        BURGLARALARM_LIST: '/site/:buildingId/burglaralarm',
        BURGLARALARM_ADD: '/site/:buildingId/burglaralarm/create',
        BURGLARALARM_EDIT: '/site/:buildingId/burglaralarm/:burglarAlarmId/edit',
        ASSETS_ACCESSCONTROL_LIST: '/site/:buildingId/accesscontrol',
    	ASSETS_ACCESSCONTROL_CREATE: '/site/:buildingId/accesscontrol/add',
    	ASSETS_ACCESSCONTROL_EDIT: '/site/:buildingId/accesscontrol/:accesscontrolId/edit',
    	CAMERA_CLONE: '/site/:buildingId/camera/:cameraId/clone',
    	ASSETS_ACCESSCONTROL_CLONE: '/site/:buildingId/accesscontrol/:accesscontrolId/clone',
    	BURGLARALARM_CLONE: '/site/:buildingId/burglaralarm/:burglarAlarmId/clone',
    	GUARDCLONE:  '/site/:buildingId/guard/:guardId/clone'
    },
    FILE_PATH: {
        GUARDLIST : 'assets/views/guard_list.html',
        GUARDCREATE: 'assets/views/guard_create.html',
        GUARDEDIT: 'assets/views/guard_edit.html',
        CAMERA_LIST: 'assets/views/camera-list.html',
        CAMERA_ADD: 'assets/views/camera-create.html',
        CAMERA_EDIT: 'assets/views/camera-edit.html',
        BURGLARALARM_LIST: 'assets/views/burglarAlarm-list.html',
        BURGLARALARM_ADD: 'assets/views/burglarAlarm-add.html',
        BURGLARALARM_EDIT: 'assets/views/burglarAlarm-edit.html',
        ASSETS_ACCESSCONTROL_LIST: 'assets/views/accesscontrollist.html',
    	ASSETS_ACCESSCONTROL_CREATE: 'assets/views/accesscontrolcreate.html',
    	ASSETS_ACCESSCONTROL_EDIT: 'assets/views/accesscontroledit.html',
    	CAMERA_CLONE: 'assets/views/camera-clone.html',
    	ASSETS_ACCESSCONTROL_CLONE:'assets/views/accesscontrolclone.html',
    	BURGLARALARM_CLONE:'assets/views/burglarAlarm-clone.html',
    	GUARDCLONE:'assets/views/guard_clone.html'
    },
    STATE: {
        GUARDLIST:  'Assets_all guarding',
        GUARDCREATE: 'Assets_create guarding',
        GUARDEDIT: 'Assets_update guarding',
        CAMERA_LIST: 'Assets_all camera system',
        CAMERA_ADD: 'Assets_create camera system',
        CAMERA_EDIT: 'Assets_update camera system',
        BURGLARALARM_LIST: 'Assets_all burglar alarm',
        BURGLARALARM_ADD: 'Assets_create burglar alarm',
        BURGLARALARM_EDIT: 'Assets update burglar alarm',
        ASSETS_ACCESSCONTROL_LIST: 'Assets_all access control',
    	ASSETS_ACCESSCONTROL_CREATE: 'Assets_create access control',
    	ASSETS_ACCESSCONTROL_EDIT: 'Assets_edit access control',
    	CAMERA_CLONE: 'Assets_clone camera system',
    	ASSETS_ACCESSCONTROL_CLONE:'Assets_clone access control',
    	BURGLARALARM_CLONE:'Assets clone burglar alarm',
    	GUARDCLONE:'Assets_clone guarding'
    }
});