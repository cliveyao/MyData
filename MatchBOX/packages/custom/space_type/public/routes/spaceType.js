
'use strict';

angular.module('mean.space_type').config(['$stateProvider' , 'SPACE_TYPE',
    function ($stateProvider, SPACE_TYPE) {
		$stateProvider.state(SPACE_TYPE.STATE.SPACE_TYPE_LIST, {
			url : SPACE_TYPE.URL_PATH.SPACE_TYPE_LIST,
			templateUrl : SPACE_TYPE.FILE_PATH.SPACE_TYPE_LIST
		})
		.state(SPACE_TYPE.STATE.SPACE_TYPE_CREATE, {
			url : SPACE_TYPE.URL_PATH.SPACE_TYPE_CREATE,
			templateUrl : SPACE_TYPE.FILE_PATH.SPACE_TYPE_CREATE
		})
		.state(SPACE_TYPE.STATE.SPACE_TYPE_UPDATE, {
			url : SPACE_TYPE.URL_PATH.SPACE_TYPE_UPDATE,
			templateUrl : SPACE_TYPE.FILE_PATH.SPACE_TYPE_UPDATE
		})
		.state(SPACE_TYPE.STATE.SPACE_TYPE_DELETE, {
			url : SPACE_TYPE.URL_PATH.SPACE_TYPE_DELETE,
			templateUrl : SPACE_TYPE.FILE_PATH.SPACE_TYPE_DELETE
		});
	}
]);
