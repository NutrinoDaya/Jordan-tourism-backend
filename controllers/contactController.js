import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
    const { name, email, phone, message } = req.body;
  
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "Name, email, phone, and message are required fields" });
    }
  
    try {
      // Create a new contact
      const newContact = new Contact({
        name,
        email,
        phone,
        message,
      });
  
      // Save the new contact
      await newContact.save();
  
      res.status(201).json({ message: "Contact created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create contact" });
    }
  };
  // Get all contacts (users with their phone numbers from bookings)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await User.aggregate([
      {
        // Start with all users
        $match: {} 
      },
      {
        // Perform a left outer join to the bookings collection
        $lookup: {
          from: 'bookings', // The collection to join with
          localField: 'email', // Field from the users collection
          foreignField: 'userEmail', // Field from the bookings collection
          as: 'bookingDetails' // The new array field added to each user
        }
      },
      {
        // Reshape the output documents
        $project: {
          _id: 1, // Include the original user ID
          username: 1, // Include the username
          email: 1, // Include the email
          // Get the phone from the first booking, or set to an empty string if no bookings exist
          phone: { 
            $ifNull: [{ $arrayElemAt: ['$bookingDetails.phone', 0] }, 'Not Available'] 
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: contacts.length,
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get contacts" });
  }
};

  // Get single contact
  export const getSingleContact = async (req, res) => {
    const id = req.params.id;
    try {
      const contact = await Contact.findById(id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Contact retrieved successfully",
        data: contact,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to get the contact" });
    }
  };
  