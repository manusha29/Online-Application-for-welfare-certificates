const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const twilio = require("twilio");

const app = express();
const port = 3027;

// Twilio credentials - replace with your actual values
const accountSid = 'ACce675c0be7188b43b3fd2cbd54f87add';
const authToken = '39f9292ec44487dac0adc881331ad753';
const client = twilio(accountSid, authToken);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect("mongodb://127.0.0.1:27017/Government", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  applicantName: { type: String, required: true, trim: true },
  fatherName: { type: String, trim: true },
  VILLAGE: { type: String },
  MANDAL: { type: String },
  DISTRICT: { type: String },
  CASTE: { type: String },
  DATEOFBIRTH: { type: Date },
  INCOME: { type: Number },
  PHONENUMBER: { type: String, required: true, trim: true }
});

const Users = mongoose.model("Users", userSchema, "users");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

app.post("/post", async (req, res) => {
  console.log("Received form data:", req.body);

  const { Uname, Fname, vill, man, dis, caste, dob, income, phone } = req.body;

  if (!phone) {
    return res.status(400).send("Phone number is required");
  }

  try {
    const user = new Users({
      applicantName: Uname,
      fatherName: Fname,
      VILLAGE: vill,
      MANDAL: man,
      DISTRICT: dis,
      CASTE: caste,
      DATEOFBIRTH: dob,
      INCOME: income,
      PHONENUMBER: phone
    });

    await user.save();
    console.log("User  saved to database");
    const phoneNumber = user.PHONENUMBER;
    await sendSmsNotification(phoneNumber);

    res.redirect("/success");
  } catch (error) {
    console.error("Error saving user or sending SMS:", error);
    res.status(500).send("An error occurred: " + error.message);
  }
});
async function sendSmsNotification(phoneNumber) {
  const countryCode = "+91"; // Country code for India
  const formattedPhoneNumber = `${countryCode}${phoneNumber}`; // Add the country code to the phone number

  const messageBody = `your application form has been received.you will receive INCOME CERTIFICATE ON 29-05-2025.`;

  try {
    const message = await client.messages.create({
      body: messageBody,
      from: "+19207969087",
      to: formattedPhoneNumber // Send the notification to the formatted phone number
    });
    console.log("SMS sent with SID:", message.sid);
  } catch (err) {
    console.error("Error sending SMS:", err);
    throw err;
  }
}
app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "submit.html"));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
