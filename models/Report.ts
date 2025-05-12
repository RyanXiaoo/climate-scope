import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface describing the structure of our report data
export interface IReport extends Document {
  user: mongoose.Schema.Types.ObjectId; // Reference to the User who created it
  locationName: string;         // User-friendly location name (e.g., "Whitby, Canada" from geocoding)
  searchCity: string;           // City input by user
  searchCountry?: string;         // Country input by user (optional)
  geoCoordinates: {             // Coordinates used for the Open-Meteo API call (from geocoding)
    lat: number;
    lng: number;
  };
  requestedStartDate: Date;     // Start date of the report period
  requestedEndDate: Date;       // End date of the report period

  // Metadata from Open-Meteo API response
  apiLatitude: number;
  apiLongitude: number;
  elevation?: number;
  generationtime_ms?: number;
  timezone?: string;
  timezone_abbreviation?: string;
  utc_offset_seconds?: number;

  // Weather data and units from Open-Meteo
  // Using Schema.Types.Mixed to allow for varying weather variables
  daily_units: mongoose.Schema.Types.Mixed; // e.g., { time: "iso8601", temperature_2m_mean: "°C" }
  daily_data: mongoose.Schema.Types.Mixed;  // e.g., { time: ["2023-01-01", ...], temperature_2m_mean: [10, 12, ...] }

  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose Schema for Report
const ReportSchema = new Schema<IReport>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  locationName: { type: String, required: true },
  searchCity: { type: String, required: true },
  searchCountry: { type: String },
  geoCoordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  requestedStartDate: { type: Date, required: true },
  requestedEndDate: { type: Date, required: true },

  apiLatitude: { type: Number, required: true },
  apiLongitude: { type: Number, required: true },
  elevation: { type: Number },
  generationtime_ms: { type: Number },
  timezone: { type: String },
  timezone_abbreviation: { type: String },
  utc_offset_seconds: { type: Number },

  daily_units: { type: Schema.Types.Mixed, required: true },
  daily_data: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true }); // Automatically add createdAt and updatedAt

// Create and export the Mongoose model
// This pattern prevents redefining the model during hot-reloads in development
const ReportModel = (mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema)) as Model<IReport>;

export default ReportModel;