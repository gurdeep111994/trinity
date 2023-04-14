import {
	bookingApi,
	bookingApiPass,
	bookingApiUser,
	getEnv
} from 'lib/settings';

const Header = new Headers({
	Authorization:
		'Basic ' + btoa(`${getEnv(bookingApiUser)}:${getEnv(bookingApiPass)}`),
	'Content-Type': 'application/json'
});

const API = getEnv(bookingApi);

const FetchServices = () => {
	return fetch(`${API}/services`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const CreateService = data => {
	return fetch(`${API}/services`, {
		method: 'POST',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const FetchLocations = query => {
	return fetch(
		`${API}/locations${query !== undefined ? '?serviceId=' + query : ''}`,
		{
			method: 'GET',
			headers: Header
		}
	)
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const UpdateService = data => {
	return fetch(`${API}/services/${data.id}`, {
		method: 'PATCH',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const DeleteService = data => {
	return fetch(`${API}/services/${data}`, {
		method: 'DELETE',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const CreateLocation = data => {
	return fetch(`${API}/locations`, {
		method: 'POST',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const DeleteLocation = location => {
	return fetch(`${API}/locations/${location}`, {
		method: 'DELETE',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const UpdateLocation = data => {
	return fetch(`${API}/locations/${data.id}`, {
		method: 'PATCH',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

// API's for ServicesExtra module
const FetchServicesExtra = () => {
	return fetch(`${API}/services-extra`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const CreateServiceExtras = data => {
	return fetch(`${API}/services-extra`, {
		method: 'POST',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const UpdateServiceExtras = data => {
	return fetch(`${API}/services-extra/${data.id}`, {
		method: 'PATCH',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

// API's for Availability module
const FetchAvailability = () => {
	return fetch(`${API}/time-slots`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const CreateAvailability = data => {
	return fetch(`${API}/time-slots`, {
		method: 'POST',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const DeleteServiceExtras = id => {
	return fetch(`${API}/services-extra/${id}`, {
		method: 'DELETE',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

// New Bookings
const FetchRestaurants = () => {
	return fetch(`${API}/restraunts`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const CreateRestaurant = data => {
	return fetch(`${API}/restraunts`, {
		method: 'POST',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const UpdateRestaurant = data => {
	return fetch(`${API}/restraunts/${data.id}`, {
		method: 'PATCH',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const DeleteRestaurant = data => {
	return fetch(`${API}/restraunts/${data}`, {
		method: 'DELETE',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const FetchTables = () => {
	return fetch(`${API}/tables`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const CreateTable = data => {
	return fetch(`${API}/tables`, {
		method: 'POST',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const UpdateTable = data => {
	return fetch(`${API}/tables/${data.id}`, {
		method: 'PATCH',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const DeleteTable = data => {
	return fetch(`${API}/tables/${data}`, {
		method: 'DELETE',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const FetchTimeSlots = () => {
	return fetch(`${API}/slots`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const CreateTimeSlot = data => {
	return fetch(`${API}/slots`, {
		method: 'POST',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const UpdateTimeSlot = data => {
	return fetch(`${API}/slots/${data.id}`, {
		method: 'PATCH',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const DeleteTimeSlot = data => {
	return fetch(`${API}/slots/${data}`, {
		method: 'DELETE',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
//Bookings
const FetchBookings = () => {
	return fetch(`${API}/bookings`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const CreateBooking = data => {
	return fetch(`${API}/bookings`, {
		method: 'POST',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const UpdateBooking = data => {
	// console.log(data)
	return fetch(`${API}/bookings/${data.id}`, {
		method: 'PATCH',
		headers: Header,
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};
const DeleteBooking = data => {
	return fetch(`${API}/bookings/${data}`, {
		method: 'DELETE',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

const FetchBookingsByStatus = () => {
	return fetch(`${API}/bookings?status=canceled&status=confirmed`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

//Requests
const FetchRequestsByStatus = () => {
	return fetch(`${API}/bookings?status=pending`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => res)
		.catch(err => {
			throw err;
		});
};

// Classes
const FetchClasses = () => {
	return fetch(`${API}/classes?urlType=classes`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => {
			return res;
		})
		.catch(err => {
			throw err;
		});
};

// SPA
const FetchAppointment = () => {
	return fetch(
		`${API}/sites?urlType=programs&scheduleType=Appointment&location=SPA`,
		{
			method: 'GET',
			headers: Header
		}
	)
		.then(res => res.json())
		.then(res => {
			console.log('res appointment', res);
			return res;
		})
		.catch(err => {
			throw err;
		});
};

const FetchAppointmentsData = () => {
	return fetch(
		`${API}/appointments?urlType=staffappointments&startDate=2018-02-03T06:20:00&endDate=2020-02-03T06:20:00`,
		{
			method: 'GET',
			headers: Header
		}
	)
		.then(res => res.json())
		.then(res => {
			console.log('res appointment data', res);
			return res;
		})
		.catch(err => {
			throw err;
		});
};

const FetchTreatmentCategories = () => {
	return fetch(
		`${API}/sites?urlType=programs&scheduleType=Appointment&location=SPA`,
		{
			method: 'GET',
			headers: Header
		}
	)
		.then(res => res.json())
		.then(res => {
			console.log('res appointment data', res);
			return res;
		})
		.catch(err => {
			throw err;
		});
};

const FetchTreatmentData = () => {
	return fetch(`${API}/sites?urlType=sessionTypes`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => {
			console.log('res appointment data', res);
			return res;
		})
		.catch(err => {
			throw err;
		});
};

const FetchTreatmentsOfCategory = programId => {
	return fetch(`${API}/sites?urlType=sessionTypes&programIds=${programId}`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => {
			console.log('res appointment data', res);
			return res;
		})
		.catch(err => {
			throw err;
		});
};

const FetchSpaBookingsLocal = programId => {
	return fetch(`${API}/spa-booking`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => {
			console.log('res spa local bookings data', res);
			return res;
		})
		.catch(err => {
			throw err;
		});
};

const FetchActiveBookingsLocal = programId => {
	return fetch(`${API}/active-booking`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => {
			// console.log('res active local bookings data', res);
			return res;
		})
		.catch(err => {
			throw err;
		});
};

// Personal Trainer Bookings
const FetchPersonalTrainerBookings = () => {
	return fetch(`${API}/personal-trainer-booking`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => {
			return res;
		})
		.catch(err => {
			throw err;
		});
};

// Personal Trainer
const FetchPersonalTrainer = () => {
	return fetch(`${API}/personal-trainer`, {
		method: 'GET',
		headers: Header
	})
		.then(res => res.json())
		.then(res => {
			return res;
		})
		.catch(err => {
			throw err;
		});
};

export default {
	// Services
	FetchServices,
	CreateService,
	UpdateService,
	DeleteService,

	// Locations
	FetchLocations,
	CreateLocation,
	DeleteLocation,
	UpdateLocation,

	// Availability
	FetchAvailability,
	CreateAvailability,

	// ServicesExtra
	FetchServicesExtra,
	DeleteServiceExtras,
	CreateServiceExtras,
	UpdateServiceExtras,

	// New Bookings
	FetchRestaurants,
	CreateRestaurant,
	UpdateRestaurant,
	DeleteRestaurant,

	FetchTables,
	CreateTable,
	UpdateTable,
	DeleteTable,

	FetchTimeSlots,
	CreateTimeSlot,
	UpdateTimeSlot,
	DeleteTimeSlot,

	FetchBookings,
	FetchBookingsByStatus,
	CreateBooking,
	UpdateBooking,
	DeleteBooking,

	//Requests
	FetchRequestsByStatus,

	// Active /Classes
	FetchClasses,

	// Spa /Bookings
	FetchAppointment,
	FetchAppointmentsData,

	// Spa /Treatment
	FetchTreatmentCategories,
	FetchTreatmentData,
	FetchTreatmentsOfCategory,

	// Local Data For SPA and Active
	FetchSpaBookingsLocal,
	FetchActiveBookingsLocal,

	//	Personal Trainers Booking
	FetchPersonalTrainerBookings,

	//	Personal Trainers
	FetchPersonalTrainer
};
