import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "Smart working",
      "Studio",
      "Riunioni",
      "Conferenze",
      "Presentazioni",
    ],
    required: true,
  },
  city: { type: String, required: true },
  openingHours: { type: String, required: true },
  closingHours: { type: String, required: true },
  cost: { type: Number, required: true },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: Number,
    },
  ],
  averageRating: { type: Number, default: 0 },

  facilities: [{ type: String }],
  images: [{ type: String }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Con questo metodo calcoliamo la media dei voti di ogni posto
placeSchema.pre("save", function (next) {
  const place = this;
  if (place.ratings.length > 0) {
    let sum = 0;
    place.ratings.forEach((rating) => {
      sum += rating.rating;
    });
    place.averageRating = sum / place.ratings.length;
  }
  next();
});

export default mongoose.model("Place", placeSchema);
