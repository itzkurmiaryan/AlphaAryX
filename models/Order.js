import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: String,
    items: Array,
    total: Number,
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "SHIPPED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);