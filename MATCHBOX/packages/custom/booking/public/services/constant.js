
angular.module('mean.booking').constant('BOOKING', {
    URL_PATH: {
        BOOKINGS:'/room/:roomId/bookings',
        ADMINBOOKINGLIST:'/admin/bookings',
        PARTNERBOOKINGLIST:'/partner/bookings',
        BOOKINGSUCCESS:'/booking/success',
        BOOKINGFAILED:'/booking/failed',
        BOOKING_TRAINING_ROOM: '/training/room/:roomId/bookings',
        USER_MYBOOKINGS: '/bookings/mybookings',
        BOOKING_HOT_DESK: '/hot-desk/room/:roomId/bookings',
        VIEWATTENDEES: '/booking/:bookingId',
        VIEWBOOKINGDETAILS: '/booking/mybookings/:bookingId',
        BOOKINGREVIEW: '/booking/review/:bookingId',
        BOOKINGRSUCCESSTRAININGROOM: '/booking/success/trainingRoom',
        VIEWBOOKINGDETAILSHOTDESK : '/booking/mybookings/hot-desk/:bookingId',
    },
    
    FILE_PATH: {
    	BOOKINGS:'booking/views/booking.html',
    	 ADMINBOOKINGLIST:'booking/views/admin_booking_list.html',
         PARTNERBOOKINGLIST:'booking/views/partner_booking_list.html',
         BOOKINGSUCCESS:'booking/views/booking_success.html',
         BOOKINGFAILED:'booking/views/booking_fail.html',
         BOOKING_TRAINING_ROOM: 'booking/views/booking_training_room.html',
         USER_MYBOOKINGS: 'booking/views/user_mybookings.html',
         BOOKING_HOT_DESK: 'booking/views/booking_hot_desk.html',
         VIEWATTENDEES: 'booking/views/viewAttendees.html',
         VIEWBOOKINGDETAILS: 'booking/views/user_booking_details.html',
         BOOKINGREVIEW: 'booking/views/booking_review.html',
         BOOKINGRSUCCESSTRAININGROOM: 'booking/views/booking_success_training_room.html',
         VIEWBOOKINGDETAILSHOTDESK : 'booking/views/user_booking_details_hotDesk.html',
    },

    STATE: {
        BOOKINGS:'booking list',
        ADMINBOOKINGLIST:'Admin booking list',
        PARTNERBOOKINGLIST:'Partner booking list',
        BOOKINGSUCCESS:'booking success',
        BOOKINGFAILED:'booking failed',
        BOOKING_TRAINING_ROOM:'Booking Training Room',
        USER_MYBOOKINGS: 'user mybookings',
        BOOKING_HOT_DESK: 'Booking Hot Desk',
        VIEWATTENDEES: 'view attendee',
        VIEWBOOKINGDETAILS: 'booking details',
        BOOKINGREVIEW: 'booking review',
        BOOKINGRSUCCESSTRAININGROOM: 'booking success training room',
        VIEWBOOKINGDETAILSHOTDESK : 'booking hot desk details',
    }
});