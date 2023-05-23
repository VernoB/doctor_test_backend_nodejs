const fs = require( 'fs' )
const { checkForError } = require( '../utils/spec' );

const Appointment = require('../models/appointment.model');
const Slot = require( '../models/slots.model' );
const Doctor = require( '../models/doctor.model' );

// Function to log messages to a .log file
const logMessage = (message) => {
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}] ${message}\n`;
  fs.appendFile('notification.log', log, (err) => {
    if (err) {
      console.error('Error writing to notification.log:', err);
    }
  });
};

exports.createAppointment = async (req, res, next) => {
  try {
      const { user, doctor, slot } = req.body;
      
      if ( !slot || !doctor || !user ) return res.status( 400 ).json( { error: 'Invalid parameter' } )
        // Check if the slot is already booked by another appointment
        const isSlotBooked = await Appointment.exists({ slot });

        if (isSlotBooked) {
        return res.status(400).json({ message: 'This slot is already booked' });
        }

        // Check if the slot exists and the doctor is available during the slot time
    const isValidSlot = await Slot.exists( { _id: slot } );
    
      if (!isValidSlot) {
        return res.status(400).json({ error: 'Invalid slot' });
      }

      const isDoctorAvailable = await Doctor.exists({ _id: doctor, slots: slot, available: true });

        if (!isDoctorAvailable) {
        return res.status(400).json({ error: 'Doctor is not available during this time' });
          }
    

        // Create a new appointment instance
        const appointment = new Appointment({ user, doctor, slot });

        // Save the appointment to the database
        await appointment.save();

        // Log notification messages
      const appointmentDate = new Date(slot.date);
      const oneDayBefore = new Date(appointmentDate.getTime() - 24 * 60 * 60 * 1000);
      const twoHoursBefore = new Date(appointmentDate.getTime() - 2 * 60 * 60 * 1000);

      logMessage(`Привет ${user}! Напоминаем что вы записаны к ${doctor} завтра в ${oneDayBefore}`);
      logMessage(`Привет ${user} ! Вам через 2 часа к ${doctor} в ${twoHoursBefore}`);

      return res.status(201).json({ data: appointment });
  } catch (error) {
    // Handle any errors that occur during the process
        checkForError( error, req, res, next );
    }
};
